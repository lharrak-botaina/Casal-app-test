const express = require('express');
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const checkCsrfToken = require('../middleware/csrf');
const { Notification } = require('../models/notification');
const { Association } = require('../models/association');

const router = express.Router();

/* ================== HELPERS ================== */

const getPagination = (req) => ({
    page: Math.max(parseInt(req.query.pageNumber) || 0, 0),
    limit: Math.min(parseInt(req.query.pageSize) || 20, 100)
});

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

const buildViewedFilter = (filter, field, id) => {
    if (filter === 'unread') return { [field]: { $nin: [id] } };
    if (filter === 'read') return { [field]: { $in: [id] } };
    return {};
};

const fetchNotifications = async ({
    filterQuery,
    page,
    limit,
    isAdmin = false
}) => {
    const query = Notification.find(filterQuery)
        .populate('company', 'name')
        .populate('jobId', 'title reference')
        .sort('-date')
        .skip(page * limit)
        .limit(limit)
        .lean();

    if (isAdmin) {
        query.populate('sharedWith', 'raisonSocial');
    }

    return query;
};

const findAssociationByUserId = (userId) =>
    Association.findOne({ userId }).lean();

const markViewed = (query, field, id) =>
    Notification.updateMany(query, { $addToSet: { [field]: id } });

const addViewedFlag = (notifications, field, id) =>
    notifications.map(n => ({
        ...n,
        viewed: Array.isArray(n[field]) && n[field].some(v => v.toString() === id.toString())
    }));

/* ================== ADMIN ROUTES ================== */

// Get admin notifications (exclude own notifications)
router.get('/admin', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const adminId = toObjectId(req.user.sub);
        const { page, limit } = getPagination(req);
        const viewedFilter = buildViewedFilter(req.query.filter, 'viewedByAdmin', adminId);

        // Exclude notifications created by the current user
        const filterQuery = {
            ...viewedFilter,
            createdBy: { $ne: adminId }
        };

        const [notifications, totalCount] = await Promise.all([
            fetchNotifications({ filterQuery, page, limit, isAdmin: true }),
            Notification.countDocuments(filterQuery)
        ]);

        res.status(200).send({
            notifications: addViewedFlag(notifications, 'viewedByAdmin', adminId),
            totalCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Admin unread count (exclude own notifications)
router.get('/admin/unread-count', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const adminId = toObjectId(req.user.sub);
        const count = await Notification.countDocuments({
            viewedByAdmin: { $nin: [adminId] },
            createdBy: { $ne: adminId }
        });

        res.status(200).send({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Mark all admin notifications as read
router.put('/admin', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const adminId = toObjectId(req.user.sub);
        await markViewed({}, 'viewedByAdmin', adminId);
        res.status(200).send({ message: 'Updated' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Mark single admin notification as read
router.put('/admin/:id/read', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const adminId = toObjectId(req.user.sub);
        const result = await markViewed(
            { _id: req.params.id },
            'viewedByAdmin',
            adminId
        );

        if (!result.matchedCount)
            return res.status(404).send({ message: 'Notification not found' });

        res.status(200).send({ message: 'Marked as read' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Delete notification (admin)
router.delete('/admin/:id', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const { deletedCount } = await Notification.deleteOne({ _id: req.params.id });
        if (!deletedCount)
            return res.status(404).send({ message: 'Notification not found' });

        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

/* ================== ASSOCIATION ROUTES ================== */

// Get association notifications (exclude own notifications)
router.get('/', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req.user.sub);
        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        const userId = toObjectId(req.user.sub);
        const { page, limit } = getPagination(req);
        const viewedFilter = buildViewedFilter(
            req.query.filter,
            'viewedBy',
            association._id
        );

        // Exclude notifications created by the current user
        const filterQuery = {
            ...viewedFilter,
            createdBy: { $ne: userId }
        };

        const [notifications, totalCount] = await Promise.all([
            fetchNotifications({ filterQuery, page, limit }),
            Notification.countDocuments(filterQuery)
        ]);

        res.status(200).send({
            notifications: addViewedFlag(notifications, 'viewedBy', association._id),
            totalCount
        });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Association unread count (exclude own notifications)
router.get('/unread-count', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req.user.sub);
        if (!association) return res.status(200).send({ count: 0 });

        const userId = toObjectId(req.user.sub);
        const count = await Notification.countDocuments({
            viewedBy: { $nin: [association._id] },
            createdBy: { $ne: userId }
        });

        res.status(200).send({ count });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Mark all as read (association)
router.put('/', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req.user.sub);
        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        await markViewed({}, 'viewedBy', association._id);
        res.status(200).send({ message: 'Updated' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Mark single as read / delete (soft)
router.put('/:id/read', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req.user.sub);
        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        const result = await markViewed(
            { _id: req.params.id },
            'viewedBy',
            association._id
        );

        if (!result.matchedCount)
            return res.status(404).send({ message: 'Notification not found' });

        res.status(200).send({ message: 'Marked as read' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

router.delete('/:id', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req.user.sub);
        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        await markViewed(
            { _id: req.params.id },
            'viewedBy',
            association._id
        );

        res.status(200).send({ message: 'Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
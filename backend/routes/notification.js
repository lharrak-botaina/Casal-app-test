const auth = require('../middleware/auth');
const checkCsrfToken = require('../middleware/csrf');
const { Notification } = require("../models/notification");
const { Association } = require("../models/association");
const express = require('express');
const router = express.Router();


router.get('/', [auth, checkCsrfToken], async (req, res) => {
    try {     
        const association = await findAssociationByUserId(req.user.sub);
        let filter = { sharedWith: { $in: [association._id] }};

        let notifications = await find(filter);

        notifications = isViewed(notifications, association._id);

        return res.status(200).send(notifications);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.put('/', [auth, checkCsrfToken], async (req, res) => {
    try {
        const association = await findAssociationByUserId(req.user.sub);

        if (!association)
            return res.status(404).send({ message: 'Association not found' });

        const result = await updateViewedBy(association?._id);
        if (result.n <= 0)
            return res.status(404).send({ message: `Job not found.` });

        return res.status(204).send({ message: 'Updated' });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


async function find(filterQuery) {
    const notifs = await Notification.find(filterQuery).populate('company', 'name')
                                     .skip(0).limit(15).sort('-date');

    return notifs
}

async function findAssociationByUserId(id) {
    return await Association.findOne({userId : id});
}

async function updateViewedBy(id) {
    return await Notification.updateMany({"sharedWith": { $in: [id] }, "viewedBy" : { $nin: [id] } },
        {
            $push: { viewedBy: id } 
        },
        { new: true });
}

function isViewed(notifications, id){
    return notifications.map(notification => 
            { return { 
                viewed : notification.viewedBy.includes(id), 
                ...notification.toObject()
            }})
}


module.exports = router;
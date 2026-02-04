const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const checkCsrfToken = require('../middleware/csrf');
const validateObjectId = require('../middleware/validateObjectId');
const exportService = require('../services/export');
const express = require('express');
const router = express.Router();
const { Association } = require("../models/association");

/**
 * GET /api/export/all
 * Export all youth data grouped by association as a ZIP file
 * Admin only - exports all associations
 *
 * Query params:
 * - format: 'styled' (default, Excel with colored headers) or 'plain' (standard CSV)
 */
router.get('/all', [auth, checkCsrfToken, admin], async (req, res) => {
    try {
        const format = req.query.format === 'plain' ? 'plain' : 'styled';
        await exportService.exportAllYouthByAssociation(res, format);
    } catch (error) {
        console.error('Export all error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erreur lors de l\'export', details: error.message });
        }
    }
});

/**
 * GET /api/export/association/:id
 * Export youth data for a specific association
 * Admin can export any association, association users can only export their own
 *
 * Query params:
 * - format: 'styled' (default, Excel with colored headers) or 'plain' (standard CSV)
 */
router.get('/association/:id', [auth, checkCsrfToken, validateObjectId], async (req, res) => {
    try {
        const format = req.query.format === 'plain' ? 'plain' : 'styled';
        const requestedAssociationId = req.params.id;

        // If not admin, verify the user owns this association
        if (req.user.role !== 'admin') {
            const userAssociation = await findAssociationByUserId(req.user?.sub);

            if (!userAssociation) {
                return res.status(403).json({ error: 'Association non trouvée pour cet utilisateur' });
            }

            if (userAssociation._id.toString() !== requestedAssociationId) {
                return res.status(403).json({ error: 'Accès non autorisé à cette association' });
            }
        }

        await exportService.exportYouthByAssociationId(res, requestedAssociationId, format);
    } catch (error) {
        console.error('Export association error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erreur lors de l\'export', details: error.message });
        }
    }
});

/**
 * GET /api/export/my-association
 * Export youth data for the current user's association
 * For association users to export their own data easily
 *
 * Query params:
 * - format: 'styled' (default, Excel with colored headers) or 'plain' (standard CSV)
 */
router.get('/my-association', [auth, checkCsrfToken], async (req, res) => {
    try {
        const format = req.query.format === 'plain' ? 'plain' : 'styled';

        // Find association by user ID
        const association = await findAssociationByUserId(req.user?.sub);

        if (!association) {
            return res.status(404).json({ error: 'Association non trouvée pour cet utilisateur' });
        }

        await exportService.exportYouthByAssociationId(res, association._id.toString(), format);
    } catch (error) {
        console.error('Export my association error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erreur lors de l\'export', details: error.message });
        }
    }
});

/**
 * Helper function to find association by user ID
 */
async function findAssociationByUserId(userId) {
    return await Association.findOne({ userId: userId });
}

module.exports = router;

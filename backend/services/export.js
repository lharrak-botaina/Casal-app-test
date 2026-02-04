const { Young } = require("../models/young");
const { Association } = require("../models/association");
const { Passwork } = require("../models/passwork");
const archiver = require('archiver');

/**
 * CSV Header styling note:
 * Standard CSV files don't support styling. To achieve colored headers,
 * we generate files with .csv extension that Excel can open, using a
 * simple HTML table format that Excel interprets correctly with styling.
 */

// Field definitions for CSV export - maps nested fields to readable headers
const CSV_FIELDS = [
    // Personal Info
    { key: 'personal_info.identifier', header: 'Identifiant' },
    { key: 'personal_info.fullname', header: 'Nom Complet' },
    { key: 'personal_info.gendre', header: 'Genre' },
    { key: 'personal_info.birth_date', header: 'Date de Naissance', type: 'date' },
    { key: 'personal_info.phone', header: 'Téléphone' },
    { key: 'personal_info.address', header: 'Adresse' },
    { key: 'personal_info.city', header: 'Ville' },
    { key: 'personal_info.cin_id', header: 'CIN' },
    { key: 'personal_info.cnss_id', header: 'CNSS' },
    { key: 'personal_info.civil_status', header: 'Statut Civil' },
    { key: 'personal_info.kids_nbr', header: 'Nombre d\'Enfants' },
    { key: 'personal_info.housing', header: 'Logement' },
    { key: 'personal_info.nationality', header: 'Nationalité' },
    { key: 'personal_info.current_function', header: 'Fonction Actuelle' },
    { key: 'personal_info.inscription_date', header: 'Date d\'Inscription', type: 'date' },
    { key: 'personal_info.connectedBy', header: 'Connecté Par' },
    { key: 'personal_info.isPriority', header: 'Prioritaire', type: 'boolean' },
    { key: 'personal_info.hobbies', header: 'Loisirs', type: 'array' },

    // Physical State
    { key: 'personal_info.physical_state.addiction.status', header: 'Addiction', type: 'boolean' },
    { key: 'personal_info.physical_state.addiction.description', header: 'Description Addiction' },
    { key: 'personal_info.physical_state.handicap.status', header: 'Handicap', type: 'boolean' },
    { key: 'personal_info.physical_state.handicap.description', header: 'Description Handicap' },
    { key: 'personal_info.physical_state.health_issue.status', header: 'Problème de Santé', type: 'boolean' },
    { key: 'personal_info.physical_state.health_issue.chronic_illness', header: 'Maladie Chronique' },
    { key: 'personal_info.physical_state.health_issue.ongoing_treatment', header: 'Traitement en Cours' },

    // Skills Assessment
    { key: 'skills_assessment.level_of_study.level', header: 'Niveau d\'Études' },
    { key: 'skills_assessment.level_of_study.description', header: 'Description Niveau' },
    { key: 'skills_assessment.languages', header: 'Langues', type: 'array' },
    { key: 'skills_assessment.languages_comment', header: 'Commentaire Langues' },
    { key: 'skills_assessment.skills.hard_skills', header: 'Compétences Techniques', type: 'array' },
    { key: 'skills_assessment.skills.soft_skills', header: 'Compétences Relationnelles', type: 'array' },
    { key: 'skills_assessment.skills.life_skills', header: 'Compétences de Vie', type: 'array' },
    { key: 'skills_assessment.tip_interview.date', header: 'Date Entretien TIP', type: 'date' },
    { key: 'skills_assessment.tip_interview.comment', header: 'Commentaire Entretien TIP' },

    // Professional Training (first entry flattened)
    { key: 'skills_assessment.professional_training', header: 'Formations Professionnelles', type: 'training_array' },

    // Professional Experience (first entry flattened)
    { key: 'skills_assessment.professional_experience', header: 'Expériences Professionnelles', type: 'experience_array' },

    // Capacity Building
    { key: 'capacity_building.training', header: 'Formations Renforcement', type: 'capacity_array' },
    { key: 'capacity_building.comment', header: 'Commentaire Renforcement' },

    // Passwork
    { key: 'passwork.trainings', header: 'Formations Passwork', type: 'passwork_array' },

    // Insertion (latest)
    { key: 'insertion.list', header: 'Insertions', type: 'insertion_array' },

    // Rates
    // { key: 'personal_info.rate', header: 'Taux Info Personnelle (%)' },
    // { key: 'skills_assessment.rate', header: 'Taux Compétences (%)' },
    // { key: 'capacity_building.rate', header: 'Taux Renforcement (%)' },
    // { key: 'passwork.rate', header: 'Taux Passwork (%)' },
    // { key: 'insertion.rate', header: 'Taux Insertion (%)' },

    // Metadata
    { key: 'status', header: 'Statut Complet', type: 'boolean' },
    { key: 'createdAt', header: 'Date de Création', type: 'date' },
    { key: 'updatedAt', header: 'Date de Modification', type: 'date' },
];

/**
 * Get nested value from object using dot notation
 */
function getNestedValue(obj, path) {
    if (!obj || !path) return '';

    const keys = path.split('.');
    let value = obj;

    for (const key of keys) {
        if (value === null || value === undefined) return '';
        value = value[key];
    }

    return value;
}

/**
 * Format value based on type for CSV export
 */
function formatValue(value, type, passworkMap = {}) {
    if (value === null || value === undefined) return '';

    switch (type) {
        case 'date':
            if (!value) return '';
            const date = new Date(value);
            if (isNaN(date.getTime())) return '';
            return date.toLocaleDateString('fr-FR');

        case 'boolean':
            return value ? 'Oui' : 'Non';

        case 'array':
            if (Array.isArray(value)) {
                return value.filter(v => v).join(', ');
            }
            return '';

        case 'training_array':
            if (!Array.isArray(value) || value.length === 0) return '';
            return value.map(t => {
                const parts = [];
                if (t.type_formation) parts.push(t.type_formation);
                if (t.specialty) parts.push(t.specialty);
                if (t.institution) parts.push(`@ ${t.institution}`);
                return parts.join(' - ');
            }).join(' | ');

        case 'experience_array':
            if (!Array.isArray(value) || value.length === 0) return '';
            return value.map(e => {
                const parts = [];
                if (e.function) parts.push(e.function);
                if (e.institution) parts.push(`@ ${e.institution}`);
                if (e.duration) parts.push(`(${e.duration})`);
                return parts.join(' - ');
            }).join(' | ');

        case 'capacity_array':
            if (!Array.isArray(value) || value.length === 0) return '';
            return value.map(c => {
                const parts = [];
                if (c.title) parts.push(c.title);
                if (c.status) parts.push(`[${c.status}]`);
                return parts.join(' ');
            }).join(' | ');

        case 'passwork_array':
            if (!Array.isArray(value) || value.length === 0) return '';
            return value.map(p => {
                const training = passworkMap[p.passwork_training?.toString()];
                return training ? training.title : 'Formation Passwork';
            }).filter(t => t).join(' | ');

        case 'insertion_array':
            if (!Array.isArray(value) || value.length === 0) return '';
            return value.map(ins => {
                const after = ins.tracking_after;
                if (!after) return '';
                const parts = [];
                if (after.companyName) parts.push(after.companyName);
                if (after.function) parts.push(after.function);
                if (after.contract_type) parts.push(`[${after.contract_type}]`);
                if (after.category) parts.push(`(${after.category})`);
                return parts.join(' - ');
            }).filter(i => i).join(' | ');

        default:
            // Escape special characters for CSV
            const str = String(value);
            if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes(';')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
    }
}

/**
 * Escape HTML entities for Excel HTML format
 */
function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * Generate CSV content with styled header (Excel-compatible HTML table)
 * This creates an HTML file that Excel opens correctly with colored headers
 */
function generateStyledCsv(youths, passworkMap) {
    // HTML header with Excel compatibility
    let html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    table {
        border-collapse: collapse;
        width: 100%;
        border: 1px solid black;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
        font-family: Arial, sans-serif;
        font-size: 12px;
    }
    th {
        background-color: #03644e;
        color: white;
        font-weight: bold;
    }
</style>
</head>
<body>
<table>
<thead>
<tr>`;

    // Add headers
    for (const field of CSV_FIELDS) {
        html += `<th>${escapeHtml(field.header)}</th>`;
    }
    html += `</tr>
</thead>
<tbody>`;

    // Add data rows
    for (const youth of youths) {
        html += '<tr>';
        for (const field of CSV_FIELDS) {
            const rawValue = getNestedValue(youth, field.key);
            const formattedValue = formatValue(rawValue, field.type, passworkMap);
            html += `<td>${escapeHtml(formattedValue)}</td>`;
        }
        html += '</tr>';
    }

    html += `</tbody>
</table>
</body>
</html>`;

    return html;
}

/**
 * Generate plain CSV content (for compatibility with other tools)
 */
function generatePlainCsv(youths, passworkMap) {
    const lines = [];

    // Header row
    const headers = CSV_FIELDS.map(f => `"${f.header}"`);
    lines.push(headers.join(';'));

    // Data rows
    for (const youth of youths) {
        const row = [];
        for (const field of CSV_FIELDS) {
            const rawValue = getNestedValue(youth, field.key);
            let formattedValue = formatValue(rawValue, field.type, passworkMap);
            // Ensure proper CSV escaping
            if (typeof formattedValue === 'string' && !formattedValue.startsWith('"')) {
                formattedValue = `"${formattedValue.replace(/"/g, '""')}"`;
            }
            row.push(formattedValue);
        }
        lines.push(row.join(';'));
    }

    // Add BOM for Excel UTF-8 compatibility
    return '\uFEFF' + lines.join('\r\n');
}

/**
 * Fetch all passwork trainings and create a lookup map
 */
async function getPassworkMap() {
    const passworks = await Passwork.find({}, { _id: 1, title: 1 }).lean();
    const map = {};
    for (const p of passworks) {
        map[p._id.toString()] = p;
    }
    return map;
}

/**
 * Get all associations
 */
async function getAllAssociations() {
    return Association.find({}, { _id: 1, name: 1, raisonSocial: 1 }).lean();
}

/**
 * Get youths by association ID using cursor for memory efficiency
 */
async function getYouthsByAssociation(associationId) {
    return Young.find({ createdBy: associationId.toString() })
        .lean()
        .allowDiskUse(true);
}

/**
 * Sanitize filename for ZIP archive
 */
function sanitizeFilename(name) {
    return name
        .replace(/[<>:"/\\|?*]/g, '_')
        .replace(/\s+/g, '_')
        .substring(0, 100);
}

/**
 * Export all youth data grouped by association as a ZIP file
 * Streams the ZIP directly to the response for memory efficiency
 *
 * @param {Object} res - Express response object
 * @param {string} format - 'styled' for Excel HTML or 'plain' for standard CSV
 */
async function exportAllYouthByAssociation(res, format = 'styled') {
    // Set response headers for ZIP download
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `export_jeunes_${timestamp}.zip`;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Create ZIP archive with compression
    const archive = archiver('zip', {
        zlib: { level: 6 } // Moderate compression for balance of speed/size
    });

    // Handle archive errors
    archive.on('error', (err) => {
        console.error('Archive error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erreur lors de la création de l\'archive' });
        }
    });

    // Pipe archive to response
    archive.pipe(res);

    try {
        // Get passwork lookup map
        const passworkMap = await getPassworkMap();

        // Get all associations
        const associations = await getAllAssociations();

        if (associations.length === 0) {
            // Create empty archive with a readme
            archive.append('Aucune association trouvée.', { name: 'README.txt' });
            await archive.finalize();
            return;
        }

        let totalYouths = 0;
        let processedAssociations = 0;

        // Process each association
        for (const association of associations) {
            const youths = await getYouthsByAssociation(association._id);

            // Skip associations with no youths
            if (!youths || youths.length === 0) {
                processedAssociations++;
                continue;
            }

            totalYouths += youths.length;

            // Generate CSV content
            const csvContent = format === 'styled'
                ? generateStyledCsv(youths, passworkMap)
                : generatePlainCsv(youths, passworkMap);

            // Create filename from association raison social
            const associationName = association.raisonSocial || association.name || `association_${association._id}`;
            const safeFilename = sanitizeFilename(associationName);
            const extension = format === 'styled' ? 'xls' : 'csv';
            const filepath = `${safeFilename}.${extension}`;

            // Add to archive
            archive.append(csvContent, { name: filepath });

            processedAssociations++;
        }

        // Add summary file
        const summary = `Export des Jeunes par Association
================================
Date d'export: ${new Date().toLocaleString('fr-FR')}
Nombre d'associations: ${processedAssociations}
Nombre total de jeunes: ${totalYouths}
Format: ${format === 'styled' ? 'Excel (avec en-têtes colorés)' : 'CSV standard'}
`;
        archive.append(summary, { name: 'RESUME.txt' });

        // Finalize archive
        await archive.finalize();

    } catch (error) {
        console.error('Export error:', error);
        archive.abort();
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erreur lors de l\'export', details: error.message });
        }
    }
}

/**
 * Export youth data for a single association
 *
 * @param {Object} res - Express response object
 * @param {string} associationId - Association ID
 * @param {string} format - 'styled' for Excel HTML or 'plain' for standard CSV
 */
async function exportYouthByAssociationId(res, associationId, format = 'styled') {
    try {
        // Get association details
        const association = await Association.findById(associationId, { name: 1, raisonSocial: 1 }).lean();

        if (!association) {
            return res.status(404).json({ error: 'Association non trouvée' });
        }

        // Get passwork lookup map
        const passworkMap = await getPassworkMap();

        // Get youths for this association
        const youths = await getYouthsByAssociation(associationId);

        if (!youths || youths.length === 0) {
            return res.status(404).json({ error: 'Aucun jeune trouvé pour cette association' });
        }

        // Generate CSV content
        const csvContent = format === 'styled'
            ? generateStyledCsv(youths, passworkMap)
            : generatePlainCsv(youths, passworkMap);

        // Set response headers
        const associationName = association.raisonSocial || association.name;
        const safeFilename = sanitizeFilename(associationName);
        const extension = format === 'styled' ? 'xls' : 'csv';
        const contentType = format === 'styled' ? 'application/vnd.ms-excel' : 'text/csv';

        res.setHeader('Content-Type', `${contentType}; charset=utf-8`);
        res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}.${extension}"`);

        res.send(csvContent);

    } catch (error) {
        console.error('Export error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Erreur lors de l\'export', details: error.message });
        }
    }
}

module.exports = {
    exportAllYouthByAssociation,
    exportYouthByAssociationId
};

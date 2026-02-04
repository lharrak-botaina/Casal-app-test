function generateFilterQuery(query) {
    let filterQuery = { $and: [] };
    if (query.filter) {
        filterQuery.$and.push({
            $or: [
                { raisonSocial: new RegExp(query.filter, 'i') },
                { name: new RegExp(query.filter, 'i') },
                { title : new RegExp(query.filter, 'i') },
                { "personal_info.identifier ": new RegExp(query.filter, 'i') },
                { "personal_info.fullname" : new RegExp(query.filter, 'i') },
            ]
        });
    }

    if (query.association) {
        typeof query.association === 'string'
            ? filterQuery.$and.push({ createdBy: { $in: [query.association] } })
            : filterQuery.$and.push({ createdBy: { $in: [...query.association] } });
    }

    if (query.city) {
        typeof query.city === 'string'
            ? filterQuery.$and.push({ city: { $in: [query.city] } })
            : filterQuery.$and.push({ city: { $in: [...query.city] } });
    }

    if (query.youngCity) {
        typeof query.youngCity === 'string'
            ? filterQuery.$and.push({ 'personal_info.city': { $in: [query.youngCity] } })
            : filterQuery.$and.push({ 'personal_info.city': { $in: [...query.youngCity] } });
    }

    if (query.activity_area) {
        typeof query.activity_area === 'string'
            ? filterQuery.$and.push({ activity_area: { $in: [query.activity_area] } })
            : filterQuery.$and.push({ activity_area: { $in: [...query.activity_area] } });
    }

    if(query.youngStatus){
        filterQuery.$and.push({ status :  JSON.parse(query.youngStatus) })
    }

    if (query.status) {
        filterQuery.$and.push({ status :  query.status })
    }

    if (query.level_of_study) {
        filterQuery.$and.push({ 'skills_assessment.level_of_study.level' :  query.level_of_study })
    }

    // Date range filter
    if (query.dateFrom || query.dateTo) {
        let dateFilter = {};
        if (query.dateFrom) {
            dateFilter.$gte = new Date(query.dateFrom);
        }
        if (query.dateTo) {
            dateFilter.$lte = new Date(query.dateTo);
        }
        filterQuery.$and.push({ createdAt: dateFilter });
    }

    if (filterQuery.$and.length === 0)
        return {}

    return filterQuery;
}

module.exports.generator = generateFilterQuery;
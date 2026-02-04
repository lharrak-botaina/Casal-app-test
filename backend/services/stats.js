const { Young } = require("../models/young");
const { Company } = require("../models/company");
const { Passwork } = require("../models/passwork");

async function numberOfYoungAddedStats(associationId) {
  let searchQuery = {};
  let avgAgeSearchQuery = {
    'personal_info.birth_date': {
      '$exists': true,
      '$ne': null
    }
  };
  let result = { nbrByGenre: [], avgAge: 0 };

  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  const nbrByGenre = await Young.aggregate(getGendreAggregate(searchQuery)).allowDiskUse(true);

  const avgAge = await Young.aggregate(getAverageAgeAggregate({ ...avgAgeSearchQuery, ...searchQuery })).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.nbrByGenre.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.nbrByGenre.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  if (avgAge.length > 0) {
    result.avgAge = avgAge[0]?.value;
  }

  return result
}

async function numberOfYouthHaveMoreThanThreeCapacityBuildingStats(associationId) {

  let searchQuery = { $and: [{ $expr: { $gt: [{ $size: "$capacity_building.training" }, 3] } }] };

  if (associationId) searchQuery.$and = [...searchQuery.$and, { createdBy: { $in: [associationId] } }];

  let avgAgeSearchQuery = {
    $and: [...searchQuery.$and, {
      'personal_info.birth_date': {
        '$exists': true,
        '$ne': null
      }
    }]
  };

  let result = { nbrByGenre: [], avgAge: 0 };

  const nbrByGenre = await Young.aggregate(getGendreAggregate(searchQuery)).allowDiskUse(true);

  const avgAge = await Young.aggregate(getAverageAgeAggregate(avgAgeSearchQuery)).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.nbrByGenre.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.nbrByGenre.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  if (avgAge.length > 0) {
    result.avgAge = avgAge[0]?.value;
  }

  return result
}

async function numberOfYouthHavePassworkTrainingStats(associationId) {
  let aggregateQuery = [
    {
      $unwind: {
        path: "$passwork.trainings",
        preserveNullAndEmptyArrays: false
      }
    }, {
      $match: {
        'passwork.trainings.passwork_training': {
          '$exists': true,
          '$ne': null
        }
      }
    }, {
      $group: {
        _id: "$_id",
        "passwork": {
          "$first": "$passwork"
        },
        "personal_info": {
          "$first": "$personal_info"
        },
        "createdBy": {
          "$first": "$createdBy"
        }
      }
    }
  ];

  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  let avgAgeSearchQuery = {
    ...searchQuery,
    'personal_info.birth_date': {
      '$exists': true,
      '$ne': null
    }
  };

  let result = { nbrByGenre: [], avgAge: 0 };

  const nbrByGenre = await Young.aggregate([...aggregateQuery, ...getGendreAggregate(searchQuery)]).allowDiskUse(true);

  const avgAge = await Young.aggregate([...aggregateQuery, ...getAverageAgeAggregate(avgAgeSearchQuery)]).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.nbrByGenre.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.nbrByGenre.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  if (avgAge.length > 0) {
    result.avgAge = avgAge[0]?.value;
  }

  return result
}

async function numberOfInsertionStats() {
  let result = [];
  searchQuery = [
    {
      '$unwind': {
        'path': '$insertion.list',
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$match': {
        'insertion.list.tracking_after.justification': {
          '$nin': [null, ""]
        }
      }
    }
  ];

  const nbrByGenre = await Young.aggregate([...searchQuery, ...getGendreAggregate({})]).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  return result
}

async function TopThreeOfAssociationsByInsertionStats() {
  let result = [];
  searchQuery = [
    {
      '$lookup': {
        'from': 'associations',
        'let': {
          'pid': '$createdBy'
        },
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$_id', {
                    '$toObjectId': '$$pid'
                  }
                ]
              }
            }
          }
        ],
        'as': 'association'
      }
    }, {
      '$set': {
        'association': {
          '$arrayElemAt': [
            '$association', 0
          ]
        }
      }
    }, {
      '$unwind': {
        'path': '$insertion.list',
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$match': {
        'insertion.list.tracking_after.justification': {
          '$nin': [
            null, ''
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$association',
        'value': {
          '$sum': 1
        }
      }
    }, {
      '$project': {
        'name': '$_id.raisonSocial',
        'value': 1
      }
    }, {
      '$sort': {
        'value': -1
      }
    }, {
      '$limit': 3
    }
  ];

  result = await Young.aggregate([...searchQuery]).allowDiskUse(true);

  return result
}

async function numberOfFormalInsertionStats(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  let avgAgeSearchQuery = {
    ...searchQuery,
    'personal_info.birth_date': {
      '$exists': true,
      '$ne': null
    }
  }

  let result = { nbrByGenre: [], avgAge: 0 };

  const nbrByGenre = await Young.aggregate([...getInsertionByCategory('Formelle'), ...getGendreAggregate(searchQuery)]).allowDiskUse(true);

  const avgAge = await Young.aggregate([...getInsertionByCategory('Formelle'), ...getAverageAgeAggregate(avgAgeSearchQuery)]).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.nbrByGenre.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.nbrByGenre.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  if (avgAge.length > 0) {
    result.avgAge = avgAge[0]?.value;
  }

  return result
}

async function numberOfInformalInsertionStats(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  let avgAgeSearchQuery = {
    ...searchQuery,
    'personal_info.birth_date': {
      '$exists': true,
      '$ne': null
    }
  }

  let result = { nbrByGenre: [], avgAge: 0 };

  const nbrByGenre = await Young.aggregate([...getInsertionByCategory('Informelle'), ...getGendreAggregate(searchQuery)]).allowDiskUse(true);

  const avgAge = await Young.aggregate([...getInsertionByCategory('Informelle'), ...getAverageAgeAggregate(avgAgeSearchQuery)]).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.nbrByGenre.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.nbrByGenre.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  if (avgAge.length > 0) {
    result.avgAge = avgAge[0]?.value;
  }

  return result
}

async function numberOfInsertionsByActivityAreaStats(associationId) {
  let result = [];
  let searchQuery = {}
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$insertion.list',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
          'insertion.list.tracking_after.companyName': {
            '$nin': [null, ""]
          }
        }
      }, {
        '$lookup': {
          'from': 'companies',
          'localField': 'insertion.list.tracking_after.companyId',
          'foreignField': '_id',
          'as': 'company'
        }
      }, {
        '$unwind': {
          'path': '$company',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$group': {
          '_id': '$company.activity_area',
          'value': {
            '$sum': 1
          }
        }
      }, {
        '$project': {
          'name': '$_id',
          'value': 1,
          '_id': -1
        }
      }
    ]
  ).allowDiskUse(true);

  return result
}

async function numberOfInsertionsByContractTypeStats(associationId) {
  let result = [];

  let searchQuery = {}
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$insertion.list',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
          'insertion.list.tracking_after.contract_type': {
            '$nin': [null, ""]
          }
        }
      }, {
        '$group': {
          '_id': '$insertion.list.tracking_after.contract_type',
          'value': {
            '$sum': 1
          }
        }
      }, {
        '$project': {
          'name': '$_id',
          'value': 1,
          '_id': -1
        }
      }
    ]
  ).allowDiskUse(true);

  return result
}

async function numberOfInsertionsByOneContractTypeStats(contractName, associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  let avgAgeSearchQuery = {
    ...searchQuery,
    'personal_info.birth_date': {
      '$exists': true,
      '$ne': null
    }
  };

  let result = { nbrByGenre: [], avgAge: 0 };


  const nbrByGenre = await Young.aggregate([...getInsertionByContractType(contractName), ...getGendreAggregate(searchQuery)]).allowDiskUse(true);

  const avgAge = await Young.aggregate([...getInsertionByContractType(contractName), ...getAverageAgeAggregate(avgAgeSearchQuery)]).allowDiskUse(true);

  if (nbrByGenre.length > 0) {
    result.nbrByGenre.push({ name: 'Hommes', value: nbrByGenre[0]?.Hommes });
    result.nbrByGenre.push({ name: 'Femmes', value: nbrByGenre[0]?.Femmes });
  }

  if (avgAge.length > 0) {
    result.avgAge = avgAge[0]?.value;
  }

  return result
}

async function numberOfInsertionsByContractDurationStats(associationId) {
  let result = [];
  let searchQuery = {}
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$insertion.list',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
          'insertion.list.tracking_after.duration': {
            '$nin': [null, ""]
          }
        }
      }, {
        '$group': {
          '_id': '$insertion.list.tracking_after.duration',
          'value': {
            '$sum': 1
          }
        }
      }, {
        '$project': {
          'name': '$_id',
          'value': 1,
          '_id': -1
        }
      }
    ]
  ).allowDiskUse(true);

  return result
}

async function numberOfInsertionsBySalaryStats(associationId) {
  let result = [];
  let searchQuery = {}
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  let stats = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$insertion.list',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
          'insertion.list.tracking_after.salary': {
            '$exists': true,
            '$nin': [
              null, '', 'Inférieur au SMIG'
            ]
          }
        }
      }, {
        '$group': {
          '_id': null,
          'SMIG': {
            '$sum': {
              '$cond': [
                {
                  '$eq': [
                    'SMIG', '$insertion.list.tracking_after.salary'
                  ]
                }, 1, 0
              ]
            }
          },
          'PLUSSMIG': {
            '$sum': {
              '$cond': [
                {
                  '$ne': [
                    'SMIG', '$insertion.list.tracking_after.salary'
                  ]
                }, 1, 0
              ]
            }
          }
        }
      }
    ]
  ).allowDiskUse(true);

  if (stats.length > 0) {
    result.push({ name: 'Egal au SMIG', value: stats[0]?.SMIG });
    result.push({ name: 'Supérieur au SMIG', value: stats[0]?.PLUSSMIG });
  }

  return result
}

async function PercentageInsertionByTotalYouth(associationId) {
  let totalYouth = await numberOfYouth(associationId);

  let youthThatHaveAtLeastOneInsertion = await getNumberOfYouthThatHaveAtLeastOneInsertion(associationId);

  const percentage = (youthThatHaveAtLeastOneInsertion / totalYouth) * 100;

  return percentage;
}

async function PercentageInsertionByCapacityBuilding(associationId) {
  let totalYouth = await getNumberOfYouthThatHaveAtLeastOneCB(associationId);

  let youthThatHaveAtLeastOneCBandInsertion = await getNumberOfYouthThatHaveAtLeastOneCBandOneInsertion(associationId);

  const percentage = (youthThatHaveAtLeastOneCBandInsertion / totalYouth) * 100;

  return percentage;
}

async function PercentageInsertionByPasswork(associationId) {
  let totalYouth = await getNumberOfYouthThatHaveAtLeastOnePasswork(associationId);

  let youthThatHaveAtLeastOnePassworkandInsertion = await getNumberOfYouthThatHaveAtLeastOnePassworkandOneInsertion(associationId);

  const percentage = (youthThatHaveAtLeastOnePassworkandInsertion / totalYouth) * 100;

  return percentage;
}


async function numberOfCompanies() {
  return Company.countDocuments();
}

async function numberOfInvolvedCompaniesStats(associationId) {
  let result = [];
  let searchQuery = {}
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$insertion.list',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
          'insertion.list.tracking_after.companyId': {
            '$nin': [null, ""]
          }
        }
      }, {
        '$group': {
          '_id': '$insertion.list.tracking_after.companyId',
          'value': {
            '$sum': 1
          }
        }
      }, {
        '$group': {
          '_id': null,
          'value': {
            '$sum': 1
          }
        }
      }, {
        '$project': {
          'name': 'Nombre d\'entreprises impliquées',
          'value': 1,
          '_id': -1
        }
      }
    ]
  ).allowDiskUse(true);

  return result
}

async function numberOfPassworks() {
  return Passwork.countDocuments();
}

async function numberOfAssociationPassworks(associationId) {
  if(!associationId) return numberOfPassworks();
  
  return Passwork.countDocuments({ associations: { $in: [associationId] } });
}

function getGendreAggregate(searchQuery) {
  return [{
    $match: searchQuery
  },
  {
    '$group': {
      '_id': null,
      'Hommes': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                'Homme', '$personal_info.gendre'
              ]
            }, 1, 0
          ]
        }
      },
      'Femmes': {
        '$sum': {
          '$cond': [
            {
              '$eq': [
                'Femme', '$personal_info.gendre'
              ]
            }, 1, 0
          ]
        }
      }
    }
  }]
}

function getAverageAgeAggregate(searchQuery) {
  return [{
    $match: searchQuery
  }, {
    '$project': {
      'date': '$DateOfBirth',
      'value': {
        '$divide': [
          {
            '$subtract': [
              new Date(), '$personal_info.birth_date'
            ]
          }, (365 * 24 * 60 * 60 * 1000)
        ]
      }
    }
  }, {
    '$group': {
      '_id': null,
      'value': {
        '$avg': '$value'
      }
    }
  }]
}

function getInsertionByCategory(category) {
  return [
    {
      '$unwind': {
        'path': '$insertion.list',
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$match': {
        'insertion.list.tracking_after.justification': {
          '$nin': [null, ""]
        }
      }
    }, {
      '$match': {
        'insertion.list.tracking_after.category': category
      }
    }
  ]
}

function getInsertionByContractType(contractType) {
  return [
    {
      '$unwind': {
        'path': '$insertion.list',
        'preserveNullAndEmptyArrays': false
      }
    }, {
      '$match': {
        'insertion.list.tracking_after.justification': {
          '$nin': [null, ""]
        }
      }
    }, {
      '$match': {
        'insertion.list.tracking_after.contract_type': { $regex: contractType, $options: 'i' }
      }
    }
  ]
}

async function getNumberOfYouthThatHaveAtLeastOneInsertion(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  const result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$insertion.list',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
        }
      }, {
        '$group': {
          '_id': '$_id'
        }
      }, {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1
          }
        }
      }
    ]
  )

  if (result.length > 0)
    return result[0].count;

  return 0;
}

async function getNumberOfYouthThatHaveAtLeastOneCBandOneInsertion(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  const result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$capacity_building.training',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'capacity_building.training.title': {
            '$nin': [null, ""]
          },
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
        }
      }, {
        '$group': {
          '_id': '$_id'
        }
      }, {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1
          }
        }
      }
    ]
  )

  if (result.length > 0)
    return result[0].count;

  return 0;
}

async function getNumberOfYouthThatHaveAtLeastOneCB(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  const result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$capacity_building.training',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'capacity_building.training.title': {
            '$nin': [null, ""]
          }
        }
      }, {
        '$group': {
          '_id': '$_id'
        }
      }, {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1
          }
        }
      }
    ]
  )

  if (result.length > 0)
    return result[0].count;

  return 1;
}

async function getNumberOfYouthThatHaveAtLeastOnePassworkandOneInsertion(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  const result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$passwork.trainings',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'passwork.trainings.passwork_training': {
            '$ne': null
          },
          'insertion.list.tracking_after.justification': {
            '$nin': [null, ""]
          },
        }
      }, {
        '$group': {
          '_id': '$_id'
        }
      }, {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1
          }
        }
      }
    ]
  )

  if (result.length > 0)
    return result[0].count;

  return 0;
}

async function getNumberOfYouthThatHaveAtLeastOnePasswork(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  const result = await Young.aggregate(
    [
      {
        '$unwind': {
          'path': '$passwork.trainings',
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          ...searchQuery,
          'passwork.trainings.passwork_training': {
            '$ne': null
          }
        }
      }, {
        '$group': {
          '_id': '$_id'
        }
      }, {
        '$group': {
          '_id': null,
          'count': {
            '$sum': 1
          }
        }
      }
    ]
  )

  if (result.length > 0)
    return result[0].count;

  return 1;
}

async function numberOfYouth(associationId) {
  let searchQuery = {};
  if (associationId) searchQuery = { createdBy: { $in: [associationId] } };

  return Young.countDocuments(searchQuery);
}


module.exports.numberOfYoungAddedStats = numberOfYoungAddedStats;
module.exports.numberOfYouthHaveMoreThanThreeCapacityBuildingStats = numberOfYouthHaveMoreThanThreeCapacityBuildingStats;
module.exports.numberOfYouthHavePassworkTrainingStats = numberOfYouthHavePassworkTrainingStats;
module.exports.numberOfInsertionStats = numberOfInsertionStats;
module.exports.TopThreeOfAssociationsByInsertionStats = TopThreeOfAssociationsByInsertionStats;
module.exports.numberOfFormalInsertionStats = numberOfFormalInsertionStats;
module.exports.numberOfInformalInsertionStats = numberOfInformalInsertionStats;
module.exports.numberOfInsertionsByActivityAreaStats = numberOfInsertionsByActivityAreaStats;
module.exports.numberOfInsertionsByContractTypeStats = numberOfInsertionsByContractTypeStats;
module.exports.numberOfInsertionsByContractDurationStats = numberOfInsertionsByContractDurationStats;
module.exports.numberOfInsertionsBySalaryStats = numberOfInsertionsBySalaryStats;
module.exports.numberOfCompanies = numberOfCompanies;
module.exports.numberOfInvolvedCompaniesStats = numberOfInvolvedCompaniesStats;
module.exports.numberOfPassworks = numberOfPassworks;
module.exports.numberOfAssociationPassworks = numberOfAssociationPassworks;
module.exports.numberOfInsertionsByOneContractTypeStats = numberOfInsertionsByOneContractTypeStats;
module.exports.PercentageInsertionByTotalYouth = PercentageInsertionByTotalYouth;
module.exports.PercentageInsertionByCapacityBuilding = PercentageInsertionByCapacityBuilding;
module.exports.PercentageInsertionByPasswork = PercentageInsertionByPasswork;
const { connection, papersCollection } = require('./connection');

async function queryTitles() {
  const db = await connection;

  return db.collection(papersCollection)
    .aggregate([
      { $group: { _id: '$title' } },
      { $match: { _id: { $nin: [null, ''] } } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
}

module.exports = { queryTitles };

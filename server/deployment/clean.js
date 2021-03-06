db.a5papers.aggregate([
  {
    $lookup: {
      from: 'a5papers',
      localField: 'inCitations',
      foreignField: 'id',
      as: 'inCitations',
    },
  },
  { $addFields: { inCitations: '$inCitations.id' } },
  { $out: 'a5papers' },
]);

db.a5papers.aggregate([
  {
    $lookup: {
      from: 'a5papers',
      localField: 'outCitations',
      foreignField: 'id',
      as: 'outCitations',
    },
  },
  { $addFields: { outCitations: '$outCitations.id' } },
  { $out: 'a5papers' },
]);

db.a5papers.find({}, { title: 1 }).forEach((doc) => {
  const newTitle = doc.title.trim();
  db.a5papers.update({ _id: doc._id }, { $set: { title: newTitle } });
});

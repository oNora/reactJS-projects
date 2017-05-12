const tables = {
  comments: [],
  articles: [],
};
const lastId = {};

const copyOf = obj => JSON.parse(JSON.stringify(obj));

exports.insert = function(table, row) {
  if (lastId[table] === undefined) {
    lastId[table] = 0;
  }

  tables[table].push(Object.assign({}, row, {
    id: lastId[table],
    createdAt: Number(new Date()),
  }));

  return lastId[table]++;
}

exports.find = function(table, filter = {}, { offset = 0, limit = tables[table].length } = {}) {
  let rows =  tables[table].filter((row) => {
    const filterKeys = Object.keys(filter);

    for (const filterKey of filterKeys) {
      if (row[filterKey] !== filter[filterKey]) {
        return false;
      }
    }

    return true;
  });

  rows = rows.slice(offset).slice(0, limit);

  return copyOf(rows);
}

exports.count = function(table, filter) {
  const rows = exports.find(table, filter);
  return rows.length;
}

exports.printTables = function() {
  console.log(tables);
}

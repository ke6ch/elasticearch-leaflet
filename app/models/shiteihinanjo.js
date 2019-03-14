const elasticsearch = require('elasticsearch');

const indexName = 'shiteihinanjo';

const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
});

// count documents
exports.count = (params) => {
  return client.count({
    index: indexName,
    body: params.body
  }).then((data) => {
    return data;
  }).catch((err) => {
    throw new Error(err);
  });
}

// search documents
exports.search = (params) => {
  return client.search({
    index: indexName,
    body: params.body,
    size: params.size
  }).then((data) => {
    return data;
  }).catch((err) => {
    throw new Error(err);
  });
}

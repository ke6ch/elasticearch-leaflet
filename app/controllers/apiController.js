const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  host: "localhost:9200",
  log: "debug",
});

exports.show = (req, res, next) => {
  client.search({
    index: "shiteihinanjo",
    type: "_doc",
    body: {
      query: {
        bool: {
          must: [
            {
              match_all: { }
            }
          ]
        }
      }
    }
  }).then((data) => {
    const response = data.hits.hits.map((row) => {
      return row._source;
    });
    const total = data.hits.total;
    res.json({
      response: {
        numFound: total,
        docs: response,
      }
    });
  }).catch((err) => {
    next(err);
  });
}

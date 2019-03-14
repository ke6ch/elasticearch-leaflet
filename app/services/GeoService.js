const shiteihinanjo = require('../models/shiteihinanjo');

exports.search = async (req) => {
  // const request = req.body;

  // build query
  let params = {
    body: {
      query: {
        bool: {
          must: {
            match_all: {}
          }
        }
      }
    }
  };

  // count documents
  const count = await shiteihinanjo.count(params);
  if (count.count == 0) { return [];
  };

  // build query
  params.body.query.bool.filter = {
    geo_distance: {
      distance: '200km',
      location: {
        lat: 35.000000,
        lon: 135.000000,
      }
    }
  };
  params.size = count.count;

  // search documents
  const response = await shiteihinanjo.search(params);
  if (response.hits.total == 0) {
    return [];
  }

  const source = response.hits.hits.map((row) => {
    return row._source;
  });

  return source;
}

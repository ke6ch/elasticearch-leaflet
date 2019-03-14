const geoService = require('../services/geoService');

exports.show = (req, res, next) => {
  geoService.search({
    body: 'BBB'
  }).then((data) => {
    if (data.length == 0) {
      res.status(404)
         .json({
           message: 'Not Found',
           type: 'Not Found'
         });
    } else {
      res.status(200)
         .render('./gis.ejs', { data });
    };
  }).catch((err) => {
    next(err);
  });
}

exports.store = (req, res, next) => {
  res.json({
    message: 'AAAA',
  });
}

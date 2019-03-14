const geoService = require('../services/geoService');

exports.show = (req, res, next) => {
  geoService.search({
    body: 'BBB'
  }).then((data) => {
    if (data.length == 0) {
      res.status(404);
      res.json({
        message: 'Not Found',
        type: 'Not Found'
      });
    } else {
      res.render('./gis.ejs', { data });
      res.status(200);
      res.json({
        docs: data,
      });
    };
  }).catch((err) => {
    next(err);
  });
}

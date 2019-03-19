const geoService = require('../services/geoService');
exports.show = (req, res, next) => {
  geoService.search()
    .then((data) => {
      if (data.length == 0) {
        res.status(404)
           .json({
             message: 'Not Found',
             type: 'Not Found'
           });
      } else {
        res.status(200)
           .json({ docs: data });
      };
    }).catch((err) => {
      next(err);
    });
}

exports.store = (req, res, next) => {
  geoService.route(req)
    .then((data) => {
      if (data.length == 0) {
        res.status(404)
           .json({
             message: 'Not Found',
             type: 'Not Found'
           });
      } else {
        res.status(200)
           .json({ docs: data });
      };
    }).catch((err) => {
      next(err);
    });
    
}

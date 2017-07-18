module.exports = {
  unless : (pathArr, middleware) => {
    return function(req, res, next) {
      console.log('===========================================================================');
      if (0 <= pathArr.indexOf(req.path)) {
        return next();
      } else {
        return middleware(req, res, next);
      }
    };
  }
};
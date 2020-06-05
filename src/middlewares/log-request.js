module.exports = () => {
  return (req, res, next) => {
    console.log(req.method, req.url, res.statusCode);
    next();
  };
};

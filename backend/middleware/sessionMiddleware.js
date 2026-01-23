exports.regenSession = (req, res, next) => {
  req.session.regenerate((err) => {
    if(err) {
      req.status(500).send('Error regenerating session')
    }
    next();
  });
}
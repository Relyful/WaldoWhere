exports.postTimerStop = (req, res) => {
  const start = req.session.timerStart;
  const end = Date.now();
  req.session.timerStart = null;
  const finalTime = end - start;
  req.session.finalTime = finalTime;
  console.log(`Final Time ${finalTime}`)
  res.status(200).end();
}

exports.postTimerStart = (req, res) => {
  req.session.timerStart = Date.now();
  return res.status(200).end();
}
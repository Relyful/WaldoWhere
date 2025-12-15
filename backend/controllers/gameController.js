const { PrismaClient } = require('../generated/prisma/client.ts');

const prisma = new PrismaClient();

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

exports.saveToLeaderBoard = async (req, res) => {
  const data = req.body;
  await prisma.leaderboard.create({
    data: {
      name: data.name,
      timer: req.session.finalTime
    }
  });
  res.status(200).end();
};
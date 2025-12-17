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
  console.log(req.session.finalTime);
  const data = req.body;
  await prisma.leaderboard.create({
    data: {
      name: data.username,
      timer: req.session.finalTime
    }
  });
  res.status(200).end();
};

exports.showLeaderboard = async (req, res) => {
  const leaderboard = await prisma.leaderboard.findMany({
    orderBy: {
      timer: 'asc'
    }
  });
  console.log(leaderboard)
  res.json(leaderboard);
}
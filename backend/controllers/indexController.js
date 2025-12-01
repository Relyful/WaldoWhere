const { PrismaClient } = require('../generated/prisma/client.ts');

const prisma = new PrismaClient();

exports.getIndex = (req, res) => {
  res.send('Hello World');
};

exports.getGuess = async (req, res) => {
  const data = req.body;
  const x = parseInt(data.x)
  const y = parseInt(data.y)
  const character = data.character;

  const correctCharacterRange = await prisma.waldoGame.findFirst({
    where: {
      name: character
    }
  });

  if (!correctCharacterRange) {
    return res.status(400).json({ error: "Unknown character" });
  }

  if ( x >= correctCharacterRange.xStart &&
    x <= correctCharacterRange.xEnd &&
    y >= correctCharacterRange.yStart &&
    y <= correctCharacterRange.yEnd ) {
      return res.json({'hit': true});
    }
    return res.json({'hit': false});
}
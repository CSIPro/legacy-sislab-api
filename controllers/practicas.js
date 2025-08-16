const practica = require("../models/practica");

const getAssignments = async (req, res) => {
  try {
    const assignments = await practica.find().exec();

    assignments.sort((a, b) => {
      const regex = /^(\d+)(.*)$/;
      const aMatch = String(a.number).match(regex);
      const bMatch = String(b.number).match(regex);

      const aNum = aMatch ? parseInt(aMatch[1], 10) : 0;
      const bNum = bMatch ? parseInt(bMatch[1], 10) : 0;

      if (aNum !== bNum) {
        return aNum - bNum;
      }

      const aSuffix = aMatch ? aMatch[2] : "";
      const bSuffix = bMatch ? bMatch[2] : "";
      return aSuffix.localeCompare(bSuffix);
    });

    res.status(200).json({
      assignments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocurrió un error al obtener las prácticas.",
    });
  }
};

module.exports = getAssignments;

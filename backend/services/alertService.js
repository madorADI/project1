const eventRepo = require("../repositories/alertRepo");
const brigadeRepo = require("../repositories/brigadeRepo");

exports.getAllEvents = async () => {
  return await eventRepo.getAllEvents();
};

exports.getEventById = async (id) => {
  return await eventRepo.getEventById(id);
};

exports.getEventAfterDate = async (date) => {
  return await eventRepo.getEventAfterDate(date);
};

exports.uploadEvent = async (newEvent) => {
  const pols = await brigadeRepo.getAllBrigades();
  const brigade = pols.find((pol) =>
    pol.polygon.coordinates.find(
      (cor) =>
        cor[0] === newEvent.coordinates[0] && cor[1] === newEvent.coordinates[1]
    )
  ).name;

  if (brigade === undefined) {
    throw new Error("the location isnt registered");
  } else {
    newEvent.brigade = brigade;
  }

  return await eventRepo.uploadEvent(newEvent);
};

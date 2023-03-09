const eventRepo = require("../repositories/alertRepo");
const brigadeRepo = require("../repositories/brigadeRepo");
const typeRepo = require("../repositories/typesRepo");
const isInPoligon = require("point-in-polygon");

exports.getAllEvents = async () => {
  return await eventRepo.getAllEvents();
};

exports.getAllPresentaitionEvents = async () => {
  const alerts = await eventRepo.getAllEvents();

  return await Promise.all(
    alerts.map(async (presAlert) => {
      presAlert.brigade = await (
        await brigadeRepo.getBrigadeById(presAlert.brigade)
      ).name;
      presAlert.event_type = (
        await typeRepo.getTypeById(presAlert.event_type)
      ).name;

      return presAlert;
    })
  );
};

exports.getEventById = async (id) => {
  return await eventRepo.getEventById(id);
};

exports.getPresentationEventById = async (id) => {
  const alert = await eventRepo.getEventById(id);
  alert.brigade = (await brigadeRepo.getBrigadeById(alert.brigade)).name;
  alert.event_type = (await typeRepo.getTypeById(alert.event_type)).name;

  return alert;
};

exports.getEventAfterDate = async (date) => {
  return await eventRepo.getEventAfterDate(date);
};

exports.uploadEvent = async (newEvent) => {
  const pols = await brigadeRepo.getAllBrigades();

  const brigade = pols.find((pol) =>
    isInPoligon(newEvent.coordinates, pol.polygon.coordinates)
  ).id;

  if (brigade === undefined) {
    throw new Error("the location isnt registered");
  } else {
    newEvent.brigade = brigade;
  }

  return await eventRepo.uploadEvent(newEvent);
};

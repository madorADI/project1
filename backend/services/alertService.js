const eventRepo = require("../repositories/alertRepo");
const brigadeRepo = require("../repositories/brigadeRepo");
const typeRepo = require("../repositories/typesRepo");
const isInPoligon = require('point-in-polygon');
const insidePoly = (point, vs) => {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

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

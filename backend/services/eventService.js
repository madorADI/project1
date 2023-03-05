const eventRepo = require("../repositories/eventRepo");

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
  return await eventRepo.uploadEvent(newEvent);
};

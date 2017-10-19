'use strict';

/**
 * Before save observer for adding `createdAt` and
 * `updatedAt` properties.
 *
 * @param {Object} context The context object for the request.
 * @param {nextCallback} next
 */
module.exports = function addAuditDates(context, next) {
  const {isNewInstance, instance, data} = context;
  const dates = {
    updatedAt: new Date(),
  };

  if (isNewInstance) {
    dates.createdAt = new Date();
  }

  if (instance) {
    Object.assign(instance, dates);
  } else if (data) {
    Object.assign(data, dates);
  }
  next();
};

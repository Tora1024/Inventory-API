'use strict';

const {addAuditDates} = require('../../../utils');
const {
  ACCESS,
  BEFORE_SAVE,
  AFTER_SAVE,
  BEFORE_DELETE,
  AFTER_DELETE,
  LOADED,
  PERSIST,
} = require('../../../constants');

/**
 * Example of an operation hook.
 * Please follow this guide
 * http://loopback.io/doc/en/lb3/Operation-hooks.html
 * {
 *   operation: <HOOK_NAME_FROM_CONSTANTS>,
 *   method: require('./remoteMethodFileName')
 * }
 */

module.exports = [
  {
    operation: BEFORE_SAVE,
    method: addAuditDates,
  },
];

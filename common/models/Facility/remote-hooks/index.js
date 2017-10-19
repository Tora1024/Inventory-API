'use strict';

const {
  BEFORE_REMOTE,
  AFTER_REMOTE,
  AFTER_REMOTE_ERROR,
} = require('../../../constants');

/**
 * Example of a remote hook, this module exports an array of
 * objects
 * {
 *   remote: <REMOTE_HOOK_FROM_CONSTANTS>,
 *   methodName: 'remoteHookName',
 *   method: require('./remoteHookName'),
 * }
 */

module.exports = [
];

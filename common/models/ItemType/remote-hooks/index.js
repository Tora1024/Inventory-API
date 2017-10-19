'use strict';

const {
  BEFORE_REMOTE,
  AFTER_REMOTE,
  AFTER_REMOTE_ERROR,
} = require('../../../constants');

module.exports = [
  {
    remote: BEFORE_REMOTE,
    methodName: 'logBefore',
    method: require('./logBefore'),
  },
  {
    remote: AFTER_REMOTE,
    methodName: 'logAfter',
    method: require('./logAfter'),
  },
  {
    remote: AFTER_REMOTE_ERROR,
    methodName: 'logAfterError',
    method: require('./logAfterError'),
  }, 
];
'use strict';

const operationHooks = require('./Location/operation-hooks');
const remoteHooks = require('./Location/remote-hooks');
const remoteMethods = require('./Location/remote-methods');

module.exports = LocationInstance => {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => LocationInstance.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => LocationInstance[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign(LocationInstance, methodObject);
      LocationInstance.remoteMethod(meta.name, meta.options);
    }
  );
};

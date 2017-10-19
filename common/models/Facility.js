'use strict';

const operationHooks = require('./Facility/operation-hooks');
const remoteHooks = require('./Facility/remote-hooks');
const remoteMethods = require('./Facility/remote-methods');

module.exports = FacilityInstance => {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => FacilityInstance.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => FacilityInstance[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign(FacilityInstance, methodObject);
      FacilityInstance.remoteMethod(meta.name, meta.options);
    }
  );
};

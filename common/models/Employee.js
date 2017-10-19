'use strict';

const operationHooks = require('./Employee/operation-hooks');
const remoteHooks = require('./Employee/remote-hooks');
const remoteMethods = require('./Employee/remote-methods');

module.exports = EmployeeInstance => {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => EmployeeInstance.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => EmployeeInstance[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign(EmployeeInstance, methodObject);
      EmployeeInstance.remoteMethod(meta.name, meta.options);
    }
  );
};

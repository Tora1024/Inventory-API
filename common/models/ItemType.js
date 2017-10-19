'use strict';

const operationHooks = require('./ItemType/operation-hooks');
const remoteHooks = require('./ItemType/remote-hooks');
const remoteMethods = require('./ItemType/remote-methods');

module.exports = ItemTypeInstance => {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => ItemTypeInstance.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => ItemTypeInstance[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign(ItemTypeInstance, methodObject);
      ItemTypeInstance.remoteMethod(meta.name, meta.options);
    }
  );
};
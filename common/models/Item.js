'use strict';

const operationHooks = require('./Item/operation-hooks');
const remoteHooks = require('./Item/remote-hooks');
const remoteMethods = require('./Item/remote-methods');

module.exports = ItemInstance => {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => ItemInstance.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => ItemInstance[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign(ItemInstance, methodObject);
      ItemInstance.remoteMethod(meta.name, meta.options);
    }
  );
};

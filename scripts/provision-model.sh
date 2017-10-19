#!/bin/bash
MODEL=$1
BASE_MODELS_FOLDER="common/models"
MODELS_FOLDER="$BASE_MODELS_FOLDER/$1"
# Infer the name of the model instance to use inside the JS code,
# from the model name in the file: book -> Book, some-model -> SomeModel
MODEL_INSTANCE="$(echo $MODEL | sed -r 's/(^|-)([a-z])/\U\2/g')"

mkdir -p\
   $MODELS_FOLDER/remote-hooks\
   $MODELS_FOLDER/operation-hooks\
   $MODELS_FOLDER/remote-methods


# Write basic imports for all hooks and methods
cat << EOF > $BASE_MODELS_FOLDER/$MODEL.js
'use strict';

const operationHooks = require('./$MODEL/operation-hooks');
const remoteHooks = require('./$MODEL/remote-hooks');
const remoteMethods = require('./$MODEL/remote-methods');

module.exports = function($MODEL_INSTANCE) {
  // Set up all operation hooks
  operationHooks.forEach(
    ({operation, method}) => $MODEL_INSTANCE.observe(operation, method)
  );

  // Set up all remote hooks
  remoteHooks.forEach(
    ({remote, methodName, method}) => $MODEL_INSTANCE[remote](methodName, method)
  );

  // Set up all remote methods
  remoteMethods.forEach(
    ({meta, methodObject}) => {
      Object.assign($MODEL_INSTANCE, methodObject);
      $MODEL_INSTANCE.remoteMethod(meta.name, meta.options);
    }
  );
};
EOF

# Create basic operation hook file.
cat << EOF > $MODELS_FOLDER/operation-hooks/index.js
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
EOF

cat << EOF > $MODELS_FOLDER/remote-methods/index.js
'use strict';

/**
 * Example of a remote method, this module exports a list of this objects.
 * Check out this page for a reference to the options object
 * http://loopback.io/doc/en/lb3/Remote-methods.html#options
 *
 * {
 *  meta: {
 *    name: 'remoteMethodName',
 *    options: {
 *      http: { verb: 'POST', path: '/remoteMethodName' },
 *      description: 'A small description for your remote method',
 *      accepts: [
 *        { arg: 'foo', type: 'string' },
 *      ],
 *      returns: { arg: 'result', type: 'object', root: true },
 *    },
 *  },
 *  methodObject: require('./remoteMethodName'),
 * }
 *
 */
module.exports = [
];
EOF

cat << EOF > $MODELS_FOLDER/remote-hooks/index.js
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
EOF
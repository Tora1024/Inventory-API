#!/bin/bash

BASE_COMMON_FOLDER="common"

echo "Creating $BASE_COMMON_FOLDER/utils/ folder..."
mkdir -p $BASE_COMMON_FOLDER/utils/

echo "Creating $BASE_COMMON_FOLDER/constants.js file..."
# Create the constants file, this will host all of
# remote hooks and operation hoooks names. Plus, a way
# for the backend developer to have constants defined
# somewhere.
cat << EOF > $BASE_COMMON_FOLDER/constants.js
'use strict';

// Operation hooks
exports.ACCESS = 'access';
exports.BEFORE_SAVE = 'before save';
exports.AFTER_SAVE = 'after save';
exports.BEFORE_DELETE = 'before delete';
exports.AFTER_DELETE = 'after delete';
exports.LOADED = 'loaded';
exports.PERSIST = 'persist';

// Remote hooks
exports.BEFORE_REMOTE = 'beforeRemote';
exports.AFTER_REMOTE = 'afterRemote';
exports.AFTER_REMOTE_ERROR = 'afterRemoteError';
EOF

echo "Creating $BASE_COMMON_FOLDER/utils/addAuditDates.js file..."
# A small utils hook function to add audit dates to each
# model that implements it.
cat << EOF > $BASE_COMMON_FOLDER/utils/addAuditDates.js
'use strict';

/**
 * Before save observer for adding \`createdAt\` and
 * \`updatedAt\` properties.
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
EOF

echo "Creating $BASE_COMMON_FOLDER/utils/index.js entry file..."
# Here you'll need to add each utils function you want to export.
cat << EOF > $BASE_COMMON_FOLDER/utils/index.js
'use strict';

module.exports = {
  addAuditDates: require('./addAuditDates'),
};
EOF

echo "Project provisioned succesfully."
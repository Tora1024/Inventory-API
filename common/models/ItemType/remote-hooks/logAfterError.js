const logAfterError = (context, modelName, next) => {
  console.log('After hook error example');
  next();
};
module.exports = logAfterError;
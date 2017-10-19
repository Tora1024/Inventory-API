const logAfter = (context, modelName, next) => {
  console.log('After hook example');
  next();
};
module.exports = logAfter;
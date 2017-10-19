const logBefore = (context, modelName, next) => {
  console.log('Before hook example');
  next();
};
module.exports = logBefore;
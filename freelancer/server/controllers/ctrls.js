exports.promiseResponse = (promise, res) => {
  promise.then((val) => {
    res.status(200).json(val);
  }).catch((err) => {
    console.log(err)
  });
};
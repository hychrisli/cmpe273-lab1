exports.promiseResponse = (promise, res) => {
  promise.then((val) => {
    res.status(200).json(val);
  }).catch((err) => {
    res.status(500).send(err)
  });
};
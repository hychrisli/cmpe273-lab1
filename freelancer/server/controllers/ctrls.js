exports.promiseResponse = (promise, res) => {
  promise.then((val) => {
    // console.log(JSON.stringify(val));
    res.status(200).send(JSON.stringify(val));
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err)
  });
};
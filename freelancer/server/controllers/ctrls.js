exports.promiseResponse = (promise, res) => {
  promise.then((val) => {
    res.set('X-Total-Count', val.length);
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.status(200).send(JSON.stringify(val));
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err)
  });
};
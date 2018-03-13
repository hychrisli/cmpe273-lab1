exports.promiseGetResponse = (promise, res, status) => {
  promise.then((val) => {
    res = addHeader(res, val);
    res.status(status).send(JSON.stringify(val));
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};

exports.promiseGetOneResponse = (promise, res, status)=>{
  promise.then((val) => {
    if ( val.length < 1 ){
      res.status(400).send("Not Found");
    }
    else{
      res = addHeader(res, val[0]);
      res.status(status).send(JSON.stringify(val[0]));
    }
  })
};

exports.promisePostResponse = (promise, req, res, status) => {
  promise.then(() => {
    res = addHeader(res, req.body);
    res.status(status).send(JSON.stringify(req.body))
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};


exports.promisePutNotice = (promise, message, res, status) => {
  promise.then(()=>{
    res = addHeader(res, message);
    res.status(status).send(JSON.stringify(message))
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  })
};


function addHeader (res, val){
  res.set('X-Total-Count', val.length);
  res.set('Access-Control-Expose-Headers', 'X-Total-Count');
  return res;
}
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  const expr = req.body.expr;
  if ( expr === undefined )
    res.status(404).send({"err":"Empty Expression"});
  else{
    try{
      let result = eval(expr);
      res.send(result.toString());
    } catch (SyntaxError) {
      res.status(404).send({"err" : "Expression Syntax Error"});
    }
  }
});

module.exports = router;
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
  const expr = req.body.expr;
  if ( expr === undefined )
    res.send("Empty Expression");
  else{
    try{
      let result = eval(expr);
      res.send(result.toString());
    } catch (SyntaxError) {
      res.send("Expression Syntax Error");
    }
  }
});

module.exports = router;
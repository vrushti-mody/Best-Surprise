var express = require('express');
var router = express.Router();
var Letter = require('../models/letter');

/* GET letter page. */
router.get('/:id', async function(req, res, next) {
  console.log('Here')
  try{
    let letterid = req.params.id
    console.log(letterid)
    let letter = await Letter.findOne({_id:letterid})
    console.log(letter)
  return res.render('letter',{letter});
}
catch(e){
  console.log(e)
}
});

module.exports = router;

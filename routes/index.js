var express = require('express');
var router = express.Router();
var Letter = require('../models/letter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* GET form page. */
router.get('/form', function(req, res, next) {
  res.render('form',{message:''});
});

router.post('/form', async function(req, res, next) {
  var letter= new Letter({
    sendername:req.body.sendername,
    recievername:req.body.recievername,
    message:req.body.message,
  });
  try{
    
    let letter1 =  await letter.save()
      console.log(letter1)
      //res.redirect(`/${letter1._id}`)
      res.render('form',{message:`Your letter was created! It is available at the following link: https://best-surprise.herokuapp.com/${letter1._id}    . Save the link. You wont see it again`})
  
  }
  catch(err){

     return res.render('form',{message:'Error creating letter'})
    //return res.status(501).json(err);
  }
})


/* GET letter page. */
router.get('/:id', async function(req, res, next) {
  let id = req.params.id
  const letter = await Letter.findOne({_id:id})
  if(letter){
    res.render('letter', { letter});
  }
  else{
    res.redirect('/')
  }
});



module.exports = router;

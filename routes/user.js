const { Router } = require('express');
const User = require('../models/user.js');
const router = Router();

router.get('/signin' , (req, res) => {
  return res.render('signin');
})

router.get('/signup' , (req, res) => {
  return res.render('signup');
})


router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try{
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie('token', token).redirect('/');
  } catch (exception){
    return res.render("signin", {
      error : "Incorrect Password"
    })
  }
})

router.post('/signup', async (req, res) => {
  const { fullName, email, password } = req.body;
  try{
    await User.create({
      fullName, 
      email,
      password,
    });
    return res.render('signin');
  }catch(err){
    return res.render('signin',{
      err,
    });
  }
})

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.redirect('/');
})

module.exports = router;
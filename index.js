require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');
const cookieSession = require('cookie-session')

require('./passport-setup')

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

//middleware
const isLoginIn = (req, res, next) =>{
  if(req.user){
    next();
  } else {
    res.sendStatus(401)
  }
}

// set view engine 
app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());

//main
app.get('/', (req, res) => {
  res.render('pages/index')
})
//user succes login
app.get('/user', isLoginIn, (req, res) =>{

    // res.send(`${req.user.displayName}`);
    res.render('pages/user.ejs', {name: req.user.displayName})
})
// user login fail
app.get('/failed', (req, res) =>{
  res.send('Login failed')
})
//logout
app.get('/logout', (req, res) =>{
  req.session=null;
  req.logout();
  res.redirect('/')
})

// login 
app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));


// handle affter login success
app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    res.redirect('/user');
  })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
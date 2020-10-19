require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const passport = require('passport');

require('./passport-setup')


// set view engine 
app.set('view engine', 'ejs')
app.use(passport.initialize());
app.use(passport.session());

//main
app.get('/', (req, res) => {
  res.render('pages/index')
})
//user succes login
app.get('/users', (req, res) =>{
    res.render('pages/user.ejs')
})
// login 
app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

// user


// hanle affter login success
app.get('/login/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users');
    
  })
  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
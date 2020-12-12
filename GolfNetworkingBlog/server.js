if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
  const mongoose = require('mongoose')
  const Validator = require('validatorjs')
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const articleRouter = require('./routes/articles')
  const Article = require("./models/article.js")
  const User = require("./models/user.js")

  var theUser = {
    name: "required",
    username: "required",
    password: "required",
    id: "required"
  }

  mongoose.connect('mongodb://localhost/golfnetworkingblog', { 
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
  })
  
  const initializePassport = require('./passport-config')
  initializePassport(
    passport,
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
  )

  
  const users = []
  
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  app.use(express.static(__dirname + '/public'))


  
  app.get('/', checkAuthenticated, async (req, res) => {
    const articles = await Article.find().sort({
      createdAt: 'desc'
    })
    res.render('articles/index.ejs', { name: req.user.name, articles: articles })
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    req.user = new User()
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    let user = req.user
    user.name = req.body.name
    user.username = req.body.username
    user.id = Date.now().toString()
    user.password = hashedPassword
        try {
            console.log("working")
            user = await user.save()
            res.redirect('/login')
        } catch(e) {
            console.log("not working")
            console.log(e)
            res.redirect('/register')
           
        }
      
    let name = req.body.name
    let username = req.body.username
    let password = hashedPassword
    let id = user.id

    let data  = {
      name: name,
      username: username,
      password: password,
      id: id
    }

    let validation = new Validator(data, theUser)
    console.log("Passed " + validation.passes() + "Failed" + validation.fails()) 

    if(validation.fails()) {
      let errorsList = {
        name: validation.errors.first("name"),
        last: validation.errors.first("last"),
        password: validation.errors.first("password"),
      }
      console.log("FAILED" + errorsList)
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword
      })
      res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }


  app.use('/articles', articleRouter)
  
  app.listen(3001)
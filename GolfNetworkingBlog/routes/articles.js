const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('articles/new.ejs')
})

router.get('/:id', async (req, res) => {
    
})

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description
    })
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch(e) {
        res.render('articles/new', { article: article})
    }
    
})

module.exports = router
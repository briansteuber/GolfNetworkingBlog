const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const sanitize = require('mongo-sanitize')
const Validator = require('validatorjs')


router.get('/new', (req, res) => {
    res.render('articles/new.ejs', { article: new Article() })
    article.title = sanitize(article.title)
    article.description = sanitize(article.description)
    article.comment = sanitize(article.comment)
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit.ejs', { article: article })
    article.title = sanitize(article.title)
    article.description = sanitize(article.description)
    article.comment = sanitize(article.comment)
})

router.get('/reply/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/reply.ejs', { article: article })
    article.title = sanitize(article.title)
    article.description = sanitize(article.description)
    article.comment = sanitize(article.comment)
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if (article == null)
        res.redirect('/')
    res.render('articles/show.ejs', { article: article})
    article.title = sanitize(article.title)
    article.description = sanitize(article.description)
    article.comment = sanitize(article.comment)
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticle('new'), saveArticle('reply'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticle('edit'), saveArticle('reply'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticle(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.comment = req.body.comment
        console.log(req.body.comment)
        try {
            console.log("working")
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
            
        } catch(e) {
            console.log("not working")
            console.log(e)
            res.render(`articles/${path}`, { article: article})
           
        }
        article.title = sanitize(article.title)
        article.description = sanitize(article.description)
        article.comment = sanitize(article.comment)
    }
}

module.exports = router
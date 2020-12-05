const mongoose = require('mongoose')
const marked = require('marked')
const slug = require('slugify')
const { default: slugify } = require('slugify')

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    comment: {
        type: String,
        required: false
    }
})

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)
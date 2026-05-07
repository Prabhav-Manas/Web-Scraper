const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Title is required'], trim: true},
    url: {type: String, trim: true, default: null},
    points: {type: Number, default: 0},
    author: {type: String, trim: true, default: 'unknown'},
    postedAt: {type: String, default: null},
    scrapedAt: {type: Date, default: Date.now},
},{ timestamps: true });

module.exports = mongoose.model('Story', storySchema);
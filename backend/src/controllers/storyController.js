const Story=require('../models/story');
const User=require('../models/users');
const scrapeHackerNews=require("../utils/scrapper");

// All Stories
exports.getAllStories=async(req, res, next)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalStories = await Story.countDocuments();
        const totalPages = Math.ceil(totalStories / limit);

        const stories = await Story.find().sort({ points: -1 }).skip(skip).limit(limit);

        // If user is logged in, mark bookmarked stories
        let bookmarkedIds = [];
        if (req.headers.authorization) {
            try {
                const jwt = require('jsonwebtoken');
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id).select('bookmarks');
                if (user) {
                    bookmarkedIds = user.bookmarks.map((id) => id.toString());
                }
            } catch (error) {
                console.log('Error:=>', error);
                // Invalid token — treat as unauthenticated
            }
        }

        const storiesWithBookmark = stories.map((story) => ({
            ...story.toObject(),
            isBookmarked: bookmarkedIds.includes(story._id.toString()),
        }));

        return res.status(200).json({
            status: 200,
            stories: storiesWithBookmark,
            pagination: {
                totalStories,
                totalPages,
                currentPage: page,
                limit,
            },
        });
    }catch(error){
        console.log('Get All Stories Error:=>', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error!',
        });
    }
}

// Fetch Single Story by id
exports.getStoryById = async (req, res, next) => {
    try {
        const story = await Story.findById(req.params.id);

        if (!story) {
            return res.status(404).json({
                status: 404,
                message: 'Story not found!',
            });
        }

        return res.status(200).json({
            status: 200,
            story,
        });
    } catch (error) {
        console.log('Get Story By ID Error:=>', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error!',
        });
    }
};

// Toggle Bookmark for a story
exports.toggleBookmark = async (req, res, next) => {
    try {
        const storyId = req.params.id;
        const userId = req.user._id;

        const story = await Story.findById(storyId);

        if (!story) {
            return res.status(404).json({
                status: 404,
                message: 'Story not found!',
            });
        }

        const user = await User.findById(userId);

        const isBookmarked = user.bookmarks.some((id) => id.toString() === storyId);

        if (isBookmarked) {
            // Remove bookmark
            user.bookmarks = user.bookmarks.filter((id) => id.toString() !== storyId);
        } else {
            // Add bookmark
            user.bookmarks.push(storyId);
        }

        await user.save();

        return res.status(200).json({
            status: 200,
            message: isBookmarked ? 'Bookmark removed successfully!' : 'Bookmark added successfully!',
            isBookmarked: !isBookmarked,
        });
    } catch (error) {
        console.log('Toggle Bookmark Error:=>', error);
        return res.status(500).json({
            status: 500,
            message: 'Internal Server Error!',
        });
    }
};

// Trigger scraper manually
exports.triggerScrape = async (req, res, next) => {
    try {
        const stories = await scrapeHackerNews();

        return res.status(200).json({
            status: 200,
            message: `Scraping successful! ${stories.length} stories saved.`,
            stories,
        });
    } catch (error) {
        console.log('Trigger Scrape Error:=>', error);

        return res.status(500).json({
            status: 500,
            message: 'Scraping failed!',
        });
    }
};
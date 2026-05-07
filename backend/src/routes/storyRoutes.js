const express=require('express');
const storyController=require("../controllers/storyController");
const { verifyToken }=require("../middlewares/authMiddleware");

const router=express.Router();

router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStoryById);
router.post('/:id/bookmark', verifyToken, storyController.toggleBookmark);

module.exports=router;
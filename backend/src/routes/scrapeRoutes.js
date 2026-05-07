const express=require('express');
const storyController=require("../controllers/storyController");

const router=express.Router();

router.post('/', storyController.triggerScrape);

module.exports=router;
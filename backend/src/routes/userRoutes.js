const express=require('express');
const userController=require("../controllers/userController");

const router=express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.signin);
router.get("/verify-email", userController.verifyEmail);

module.exports=router;
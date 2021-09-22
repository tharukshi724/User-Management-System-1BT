const router = require("express").Router();
const { request } = require("express");
let registerUser = require("../model/registration");

const userService = require("../service/userService")

router.post("/addNewUser",userService.registeraUser)
 
router.post("/login",userService.login)

router.post("/reset-password",userService.resetPassword)

router.post("/new-password",userService.createNewPassword)

module.exports = router;
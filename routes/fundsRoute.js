const express=require('express')
const { addfund, getallfunds, updatefundnav } = require('../controllers/fundsController')
const router=express.Router()
router.post("/addfund",addfund)
router.get("/funds",getallfunds)
router.put("/:id/nav",updatefundnav)
module.exports=router
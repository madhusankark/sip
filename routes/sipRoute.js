const express=require('express')
const { addsip, getsipbyid, sipprocess, getsiptranscations } = require('../controllers/sipController')
const router=express.Router()
router.post("/addsip",addsip)
router.get("/:id",getsipbyid)
router.post("/:id/process",sipprocess)
router.get("/:id/transcations",getsiptranscations)
module.exports=router
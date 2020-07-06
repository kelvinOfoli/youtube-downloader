const path = require('path');

const express = require('express');
const router = express.Router()

router.get('/about',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views_','about.html'))
});


module.exports = router
const path = require('path');

const express= require('express');
const app = express();
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('home',{layout: false});
    // res.sendFile(path.join(__dirname,'../','views','home.html'));
})

module.exports = router;
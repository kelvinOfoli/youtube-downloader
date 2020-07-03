const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/ffmpeg/ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": `${path.join(__dirname,'..', 'mp3')}`,    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});



const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));


function youtube_parser(url) {
    var regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return (url.match(regExp)[1])
}

router.use('/convert', (req, res, next) => {
    const url = req.body.url;
        
    YD.download(youtube_parser(url));

    YD.on("finished", function (err, data) {
        console.log(JSON.stringify(data));
    });

    YD.on("error", function (error) {
        console.log(error);
    });

    YD.on("progress", function(progress) {
        
        // const percentage = JSON.parse(progress).percentage.percentage;
        console.log(JSON.stringify(progress));
        
    });
    res.redirect('/');
})

module.exports = router

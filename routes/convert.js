const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const YoutubeMp3Downloader = require("youtube-mp3-downloader");

var YD = new YoutubeMp3Downloader({
    "ffmpegPath": `${ process.env.PATH || '/ffmpeg/ffmpeg'}`,        // Where is the FFmpeg binary located?
    "outputPath": `${path.join(__dirname, '..', 'mp3')}`,    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));


function youtube_parser(url) {
    var regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return (url.match(regExp)[1])
}

router.get("/convert/download",(req,res)=>{
    res.download(app.get('downloadData').file);
})

router.use("/convert", (req, res, next) => {
    const url = req.body.url;

    YD.download(youtube_parser(url));

    YD.on("finished", function (err, data) {
    console.log(`Finished : ${data.title}`);
            
        // app.set('downloadData', data);
        // const filePath = data.file;
        // res.download(filePath);
       return res.render('home',{layout: false, downloadData: data});
    });

    YD.on("error", function (error) {
        console.log(error);
    });

    YD.on("progress", function (progress) {
        // console.log(JSON.stringify(progress));
    });
})




module.exports = router

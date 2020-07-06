const alert = document.getElementById('alert');

function youtube_parser(url) {
    var regExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    return (url.match(regExp)[1])
}

function validVideoId(id) {
    var img = new Image();
    img.src = "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
    img.onload = function () {
        checkThumbnail(this.width);
    }
}

function checkThumbnail(width) {
    if (width === 120) {
        errorAlert("Video does not exist");
    }
}
function errorAlert(info){
    alert.innerHTML = `<div class="alert alert-danger" role="alert">${info}</div>`
    setTimeout(()=>{
        alert.innerHTML = ''
    },3000)
}

function inputValidator (e){
    try {
        const url = youtube_parser(document.querySelector('.form-control').value);
        validVideoId(url)
        console.log(url);
    } catch{
        e.preventDefault();
        errorAlert('Invalid YouTube URL');
    }
}

document.querySelector('.btn').addEventListener('click', inputValidator);
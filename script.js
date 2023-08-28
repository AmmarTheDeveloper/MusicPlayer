
let audios = [
    { songName: "arshad hsc imp mcq", filePath: "song/arshad.ogg", coverPath: "images/music-icon.png", duration: "0:12" },
    { songName: "Naat 1", filePath: "song/naat1.mp3", coverPath: "images/music-icon.png", duration: Math.floor(476 / 60) },
    { songName: "Naat 2", filePath: "song/naat2.mp3", coverPath: "images/music-icon.png", duration: Math.floor(508 / 60) },
    { songName: "Naat 3", filePath: "song/naat3.mp3", coverPath: "images/music-icon.png", duration: Math.floor(320 / 60) },
    { songName: "Naat 4", filePath: "song/naat1.mp3", coverPath: "images/music-icon.png", duration: Math.floor(476 / 60) },
    { songName: "Naat 5", filePath: "song/naat2.mp3", coverPath: "images/music-icon.png", duration: Math.floor(508 / 60) },
    { songName: "Naat 6", filePath: "song/naat3.mp3", coverPath: "images/music-icon.png", duration: Math.floor(320 / 60) },
    { songName: "Naat 7", filePath: "song/naat1.mp3", coverPath: "images/music-icon.png", duration: Math.floor(476 / 60) },
    { songName: "Naat 8 ", filePath: "song/naat2.mp3", coverPath: "images/music-icon.png", duration: Math.floor(508 / 60) }
];
let audioElement = new Audio();
audioElement.src = 'song/arshad.ogg';
let masterPlay = document.querySelector('.masterplay');
let progressBar = document.querySelector('.progressbar input');
let playIcon = masterPlay.querySelector('i');
let gif = document.getElementById('gif');
let forward = document.querySelector('.forward');
let backward = document.querySelector('.backward');
let songItems = document.querySelectorAll('.music');
let playBtns = document.querySelectorAll('.playbtn');
let audioName = document.querySelector('.song-title span');
let audioIndex = 0;

masterPlay.onclick = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        gif.style.opacity = '1';

    } else {
        audioElement.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        gif.style.opacity = '0';
        makeAllplays();
    }
}

audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.oninput = () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
    console.log(Math.floor(audioElement.duration));
    audioElement.play();
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    gif.style.opacity = '1';
}

songItems.forEach((song, i) => {
    song.querySelector('img').src = audios[i].coverPath;
    song.querySelector('.title span').innerText = audios[i].songName;
    // let audio = document.createElement('audio');
    //     audio.src = audios[i].filePath;
    // song.querySelector('.control .play .min').innerText = audio.duration;
    let min = song.querySelector('.min');
    if (i == 0) {
        min.innerHTML = audios[i].duration
    } else {
        min.innerHTML = audios[i].duration + " : 00";
    }
})

const makeAllplays = () => {
    playBtns.forEach(element => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        audioElement.currentTime = 0;
    })
}

playBtns.forEach((btn, i) => {
    btn.onclick = () => {
        makeAllplays();
        progressBar.value = 0;
        audioElement.pause();
        btn.classList.remove('fa-circle-play');
        btn.classList.add('fa-circle-pause');
        audioElement = new Audio();
        audioElement.src = audios[i].filePath;
        audioName.innerText = audios[i].songName;
        audioElement.play();
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        gif.style.opacity = '1';
        window.location.assign("#progressbar");
    }
})

songItems.forEach((item, i) => {
    item.id = i;
})

forward.onclick = () => {
    if (audioIndex == audios.length - 1) {
        audioIndex = audios.length;
    } else {
        audioIndex += 1;
    }
    document.getElementById(`${audioIndex}`).querySelector('i').click();


}

backward.onclick = () => {
    if (audioIndex == 0) {
        audioIndex = 0;
    } else {
        audioIndex -= 1;
    }
    document.getElementById(`${audioIndex}`).querySelector('i').click();
}
let songs = [
    {
        songName: "Billie Jean",
        filePath: "songs/billie jeans.mp3"
    },
    {
        songName: "I Thought I Saw Your Face Today",
        filePath: "songs/I though I saw your face today.m4a"
    },
    {
        songName: "Beat It",
        filePath: "songs/beat it.mp3"
    },
    {
        songName: "Chicago",
        filePath: "songs/chicago.mp3"
    },
    {
        songName: "Blinding Lights",
        filePath: "songs/blinding lghts.mp3"
    },
    {
        songName: "Shape Of You",
        filePath: "songs/shape of you.mp3"
    }
];
let songIndex = 0;
let audioElement = new Audio(songs[0].filePath);

let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("myprogressbar");
let songName = document.querySelector(".songplaying span");

songName.innerText = songs[0].songName;

masterPlay.addEventListener("click", () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {

        audioElement.play();

        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

    } else {

        audioElement.pause();

        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }
});

audioElement.addEventListener("timeupdate", () => {

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    progressBar.value = progress;
});

progressBar.addEventListener("change", () => {

    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
});

function makeAllPlays() {

    document.querySelectorAll(".songPlay").forEach((element) => {

        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");

    });
}

document.querySelectorAll(".songPlay").forEach((element) => {

    element.addEventListener("click", (e) => {

        makeAllPlays();

        songIndex = parseInt(e.target.dataset.index);

        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");

        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        songName.innerText = songs[songIndex].songName;

        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    });
});

document.getElementById("next").addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length)
        songIndex = 0;

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    songName.innerText = songs[songIndex].songName;
});

document.getElementById("previous").addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0)
        songIndex = songs.length - 1;

    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    songName.innerText = songs[songIndex].songName;
});
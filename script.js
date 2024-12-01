const songs = [
    "bensound-clapandyell.mp3",
    "bensound-dance.mp3",
    "bensound-funkyelement.mp3",
    "bensound-happiness.mp3",
    "bensound-happyrock.mp3",
    "bensound-thelounge.mp3",
];
const player = document.getElementById("player");
let playingIndex = 0

const createSongList = () => {
    const list = document.createElement("ol");
    for (let i = 0; i < songs.length; i++) {
        const item = document.createElement("li");
        item.appendChild(document.createTextNode(songs[i]));
        list.appendChild(item);
    }
    return list;
};

const songList = document.getElementById("songList");
songList.appendChild(createSongList());
const links = document.querySelectorAll("li");
for (let i = 0; i < links.length; i++) {
    const link = links[i]
    link.addEventListener("click", e => {
        playingIndex = i + 1
        setSong(e.target.innerText)
    });
}

function highlightPlayingSong(song) {
    const links = document.querySelectorAll("li");
    for (const link of links) {
        if (link.innerText === song) {
            link.classList.add("selected")
        } else {
            link.classList.remove("selected")
        }
    }
}

function nextSong() {
    playingIndex++
    if (playingIndex > 6) {
        playingIndex = 1
    }
    setSong(songs[playingIndex - 1])
}

function previousSong() {
    playingIndex--
    if (playingIndex <= 0) {
        playingIndex = 6
    }
    setSong(songs[playingIndex - 1])
}

function setSong(song) {
    document.querySelector("#headphones").classList.remove("pulse");

    const source = document.getElementById("source");
    source.src = "songs/" + song;
    document.getElementById(
        "currentSong"
    ).innerText = `Now Playing:  ${song}`;
    highlightPlayingSong(song)
    player.load();
    player.play();

    document.querySelector("#headphones").classList.add("pulse");
}

function playAudio() {
    if (player.readyState) {
        player.play();
    }
}

function pauseAudio() {
    player.pause();
}

const slider = document.getElementById("volumeSlider");
slider.oninput = function (e) {
    const volume = e.target.value;
    player.volume = volume;
};

function updateProgress() {
    if (player.currentTime > 0) {
        const progressBar = document.getElementById("progress");
        progressBar.value = (player.currentTime / player.duration) * 100;
    }
}
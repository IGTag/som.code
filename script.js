const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const cover = document.getElementById("cover");
const gif = document.getElementById("gif");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const likeButton = document.getElementById("like");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");
const volumeSlider = document.getElementById("volume");
const audio = document.getElementById("audio");
console.log("som.code");

const Oceans = {
  songName: "Oceans",
  artist: "Pearl Jam",
  file: "Oceans",
  liked: false,
};

const rappSnitchKnishes = {
  songName: "Rapp Snitch Knishes",
  artist: "MF DOOM",
  file: "Rapp_Snitch_Knishes",
  liked: false,
};

const thisCharmingMan = {
  songName: "This Charming Man",
  artist: "The Smiths",
  file: "This_Charming_Man",
  liked: false,
};

const ThemanWhoSoldTheWorld = {
  songName: "The Man Who Sold The World",
  artist: "David Bowie",
  file: "DAVIDBOWIE_THE_MAN_WHO_SOLD_THE_WORLD",
  liked: false,
};

const JDM = {
  songName: "151",
  artist: "Jedi Mind Tricks",
  file: "151",
  liked: false,
};

const Livinprayer = {
  songName: "Livin'on A Prayer",
  artist: "Bon Jovi",
  file: "Livin_On_A_Prayer",
  liked: false,
};

const Pachinko = {
  songName: "D>E>A>T>H>M>E>T>A>L",
  artist: "Pachinko",
  file: "DᐳEᐳAᐳTᐳHᐳMᐳEᐳTᐳAᐳL_",
  liked: false,
};

const shesaidiwonder = {
  songName: "She said, i wonder",
  artist: "Kudasai",
  file: "she_said_i_wonder",
  liked: false,
};
const seraparasempre = {
  songName: "O dia que será para sempre",
  artist: "Rodolfo Abrantes",
  file: "O_DIA_QUE_SERA_PARA_SEMPRE",
  liked: false,
};
const whyshouldi = {
  songName: "Why Should I",
  artist: "Bob Marley",
  file: "WHY_SHOULD_I",
  liked: false,
};
const letjabepraised = {
  songName: "Let Jah Be Praised",
  artist: "Bob Marley",
  file: "LET_JAH_BE_PRAISED",
  liked: false,
};
const couldyoubeloved = {
  songName: "Could You Be Loved",
  artist: "Bob Marley",
  file: "COULD_YOU_BE_LOVED",
  liked: false,
};
const FoolishOne = {
  songName: "Foolish One",
  artist: "Taylor Swift",
  file: "Taylor_Swift_Foolish_One",
  liked: false,
};

const youngfolks = {
  songName: "Young Folks",
  artist: "Peter Bjorn and John",
  file: "Young_Folks",
  liked: false,
};

const strangers = {
  songName: "Strangers",
  artist: "Albert Hammond Jr",
  file: "Strangers_",
  liked: false,
};

const proudofyou = {
  songName: "Proud Of You",
  artist: "Alex,Alicks",
  file: "Proud_of_You",
  liked: false,
};

const anighttogether = {
  songName: "A Night Together",
  artist: "Kudasai",
  file: "A_Night_Together",
  liked: false,
};

const neurotic = {
  songName: "Neurotic",
  artist: "Boygem",
  file: "neurotic",
  liked: false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalplaylist = JSON.parse(localStorage.getItem("playlist")) ?? [
  Oceans,
  rappSnitchKnishes,
  thisCharmingMan,
  ThemanWhoSoldTheWorld,
  JDM,
  Livinprayer,
  Pachinko,
  shesaidiwonder,
  seraparasempre,
  whyshouldi,
  letjabepraised,
  couldyoubeloved,
  FoolishOne,
  youngfolks,
  strangers,
  proudofyou,
  anighttogether,
  neurotic,
];
let sortedPlaylist = [...originalplaylist];
let index = 0;

function playSong() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  song.play();
  isPlaying = true;
}

function pauseSong() {
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  song.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseSong();
  } else {
    playSong();
  }
}
function initializeSong() {
  cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
  song.src = `songs/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  LikeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const JumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = JumpToTime;
}

function shuffleArray(preShuffleArray) {
  const size = preShuffleArray.length;
  let currentindex = size - 1;
  while (currentindex > 0) {
    let randomindex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentindex];
    preShuffleArray[currentindex] = preShuffleArray[randomindex];
    preShuffleArray[randomindex] = aux;
    currentindex -= 1;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalplaylist];
    shuffleButton.classList.remove("button-active");
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add("button-active");
  } else {
    repeatOn = false;
    repeatButton.classList.remove("button-active");
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  return `${hours.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function LikeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector(".bi").classList.remove("bi-heart");
    likeButton.querySelector(".bi").classList.add("bi-heart-fill");
    likeButton.classList.add("button-active");
  } else {
    likeButton.querySelector(".bi").classList.add("bi-heart");
    likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
    likeButton.classList.remove("button-active");
  }
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  LikeButtonRender();
  localStorage.setItem("playlist", JSON.stringify(originalplaylist));
}
function setVolume() {
  const volumeValue = volumeSlider.value / 100;
  audio.volume = volumeValue;
}

initializeSong();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
likeButton.addEventListener("click", likeButtonClicked);
volumeSlider.addEventListener("input", setVolume);

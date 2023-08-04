const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');

const Oceans = {
    songName: 'Oceans',
    artist : 'Pearl Jam',
    file : 'Oceans'
};

const rappSnitchKnishes = {
    songName: 'Rapp Snitch Knishes',
    artist : 'MF DOOM',
    file : 'Rapp_Snitch_Knishes'
};

const thisCharmingMan = {
    songName: 'This Charming Man',
    artist : 'The Smiths',
    file : 'This_Charming_Man'
};

const ThemanWhoSoldTheWorld ={
    songName: 'The Man Who Sold The World',
    artist : 'David Bowie',
    file : 'DAVIDBOWIE_THE_MAN_WHO_SOLD_THE_WORLD'
};

const JDM={
    songName: '151',
    artist: 'Jedi Mind Tricks',
    file: '151'
};

const Livinprayer ={
    songName:"Livin'on A Prayer",
    artist: 'Bon Jovi',
    file: "Livin_On_A_Prayer"
};

const Pachinko ={
    songName: "DᐳEᐳAᐳTᐳHᐳMᐳEᐳTᐳAᐳL",
    artist: 'Pachinko',
    file:   'DᐳEᐳAᐳTᐳHᐳMᐳEᐳTᐳAᐳL_',
};

const shesaidiwonder = {
    songName:'She said, i wonder',
    artist:'Kudasai',
    file: 'she_said_i_wonder'
}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalplaylist = [Oceans, rappSnitchKnishes, thisCharmingMan,ThemanWhoSoldTheWorld,JDM,Livinprayer,Pachinko,shesaidiwonder];
let sortedPlaylist = [...originalplaylist];
let index = 0;

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if(isPlaying === true){
        pauseSong();
    }
    else {
        playSong();
    }
}
function initializeSong(){
    cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
    song.src =  `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong(){
    if(index === 0){
      index =sortedPlaylist.length - 1;  
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong(){
    if(index === sortedPlaylist.length -1){
      index = 0;
    }
    else {
      index += 1;
   }
    initializeSong();
    playSong();

}

function updateProgressBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress',`${barWidth}%`);
    
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const JumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = JumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentindex = size - 1;
    while(currentindex > 0){
        let randomindex = Math.floor(Math.random()*size);
        let aux = preShuffleArray[currentindex] 
        preShuffleArray[currentindex]=preShuffleArray[randomindex]
        preShuffleArray[randomindex]= aux;
        currentindex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffled === false) {
       isShuffled = true;
       shuffleArray(sortedPlaylist);
       shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist=[...originalplaylist];
        shuffleButton.classList.remove('button-active');
          
    }
}

function repeatButtonClicked(){
    if (repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat(){
    if (repeatOn === false) {
        nextSong();
    }
    else{
        playSong();
    }
}

initializeSong();

play.addEventListener('click',playPauseDecider);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended',nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);

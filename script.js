const songs = [
{
    title:"Hanuman Chalisa",
    artist:"Gulshan Kumar",
    genre:"Bhakti",
    src:"song.mp3/song1.mp3",
    cover:"img.jpg/cover1.jpg"
},
{
    title:"Beete Lambhe",
    artist:"K.K.",
    genre:"Romantic",
    src:"song.mp3/song2.mp3",
    cover:"img.jpg/cover2.jpg"
},
{
    title:"Hazaribag Wala Ke",
    artist:"Kishan Indrjeet",
    genre:"Nagpuri",
    src:"song.mp3/song3.mp3",
    cover:"img.jpg/cover3.jpg"
},
{
    title:"One Thousand Miles",
    artist:"YoYo Honey Singh",
    genre:"Pop",
    src:"song.mp3/song4.mp3",
    cover:"img.jpg/cover4.jpg"
}
];

let currentSong = 0;

const audio = new Audio();

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const genre = document.getElementById("genre");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

const playlist = document.getElementById("playlist");
const search = document.getElementById("search");
const upload = document.getElementById("upload");

function loadSong(song){
    title.textContent = song.title;
    artist.textContent = song.artist;
    genre.textContent = song.genre;
    cover.src = song.cover;
    audio.src = song.src;
}

loadSong(songs[currentSong]);

playBtn.addEventListener("click",()=>{

    if(audio.paused){
        audio.play();
        playBtn.textContent="⏸️";
    }
    else{
        audio.pause();
        playBtn.textContent="▶️";
    }

});

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong>songs.length-1){
        currentSong=0;
    }

    loadSong(songs[currentSong]);
    audio.play();

});

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){
        currentSong=songs.length-1;
    }

    loadSong(songs[currentSong]);
    audio.play();

});

audio.addEventListener("timeupdate",()=>{

    progress.max=audio.duration;
    progress.value=audio.currentTime;

    let currentMinutes=Math.floor(audio.currentTime/60);
    let currentSeconds=Math.floor(audio.currentTime%60);

    let durationMinutes=Math.floor(audio.duration/60)||0;
    let durationSeconds=Math.floor(audio.duration%60)||0;

    if(currentSeconds<10) currentSeconds="0"+currentSeconds;
    if(durationSeconds<10) durationSeconds="0"+durationSeconds;

    currentTimeDisplay.textContent=
    `${currentMinutes}:${currentSeconds}`;

    durationDisplay.textContent=
    `${durationMinutes}:${durationSeconds}`;

});

progress.addEventListener("input",()=>{

    audio.currentTime=progress.value;

});

volume.addEventListener("input",()=>{

    audio.volume=volume.value;

});

songs.forEach((song,index)=>{

    const li=document.createElement("li");

    li.textContent=
    song.title+" - "+song.artist;

    li.addEventListener("click",()=>{

        currentSong=index;

        loadSong(song);

        audio.play();

    });

    playlist.appendChild(li);

});

search.addEventListener("input",()=>{

    const keyword=search.value.toLowerCase();

    playlist.innerHTML="";

    songs
    .filter(song=>
        song.title.toLowerCase().includes(keyword) ||
        song.artist.toLowerCase().includes(keyword) ||
        song.genre.toLowerCase().includes(keyword)
    )

    .forEach((song,index)=>{

        const li=document.createElement("li");

        li.textContent=
        song.title+" - "+song.artist;

        li.addEventListener("click",()=>{

            currentSong=index;

            loadSong(song);

            audio.play();

        });

        playlist.appendChild(li);

    });

});

upload.addEventListener("change",(e)=>{

    const file=e.target.files[0];

    if(file){

        audio.src=URL.createObjectURL(file);

        title.textContent=file.name;

        artist.textContent="Local File";

        genre.textContent="Uploaded";

        audio.play();

    }

});

audio.addEventListener("ended",()=>{

    currentSong++;

    if(currentSong>songs.length-1){
        currentSong=0;
    }

    loadSong(songs[currentSong]);

    audio.play();

});
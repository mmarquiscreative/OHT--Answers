var tone;
    tone = new Audio('Audio/BackgroundNoise.mp3');

function playTone(){    
    tone.play();
};

function stopTone(){
    tone.pause();
    tone.timeStamp = 0;
};

function updateVolume(){
    tone.volume = document.querySelector('#volumeRange').value;
}

document.querySelector('.play').addEventListener('click', playTone);
document.querySelector('.stop').addEventListener('click', stopTone);
document.querySelector('#volumeRange').addEventListener('input', updateVolume, false);
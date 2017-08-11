var pureTones = [];

    
function PureTone(fileName){
    var fileName = fileName;
    var audio = new Audio(fileName + '.wav');
    var volume = 0;
}
var fileNamesLeft = ['100-L', '5000-L', '14000-L', '14500-L', '14800-L', '15000-L', '16000-L'];

var fileNamesRight = ['100-R', '5000-R', '14000-R', '14500-R', '14800-R', '15000-R', '16000-R'];


loadPureTones(fileNamesLeft, 'left');
loadPureTones(fileNamesRight, 'right');


var tone;
    tone = (pureTones[0].fileName + '.wav');

function playTone(){    
    tone.play();
};

function stopTone(){
    tone.pause();
    tone.timeStamp = 0;
    results.volumeLevel = document.querySelector('#volumeRange').value;
    console.log(results.volumeLevel);
};

function updateVolume(){
    tone.volume = document.querySelector('#volumeRange').value;
}


function loadPureTones(fileNameArray, side){
    for (i = 0; i < fileNameArray.length; i++){
    new PureTone(fileNameArray[i]);
    pureTones.push([fileNameArray[i]]);
    console.log(pureTones);
    }
}


document.querySelector('.play').addEventListener('click', playTone);
document.querySelector('.stop').addEventListener('click', stopTone);
document.querySelector('#volumeRange').addEventListener('input', updateVolume, false);
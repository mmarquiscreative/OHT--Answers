var pureTones = [];
var curTone = 0;
var roundNumTotal = 13;    
var results = {
    volumeLevel: []
}



function PureTone(fileName){
    this.fileName = fileName;
    this.audio = new Audio('Audio/' + fileName + '.wav');
    this.volume = 0;
}

function ToneResult(toneName, volume){
    this.toneName = toneName;
    this.volume = volume;
}


var fileNamesLeft = ['100-L', '5000-L', '14000-L', '14500-L', '14800-L', '15000-L', '16000-L'];

var fileNamesRight = ['100-R', '5000-R', '14000-R', '14500-R', '14800-R', '15000-R', '16000-R'];


loadPureTones(fileNamesLeft, 'left');
loadPureTones(fileNamesRight, 'right');
console.log(pureTones[1].audio);

var tone;

function playTone(){  
    
    tone = (pureTones[curTone].audio);
    tone.play();
    tone.loop = true;
};

function recordResult(){
    pureTones[curTone].volume = document.querySelector('#volumeRange').value;
}

function pauseTone(){
    tone.pause();
    tone.timeStamp = 0;
}



function updateVolume(){
    tone.volume = document.querySelector('#volumeRange').value;
}

function removeEventListeners(){
    
    // 1. remove for play button
    document.querySelector('.play').removeEventListener('click', playTone);
    
    // 2. Remove for next tone button
    document.querySelector('.stop').removeEventListener('click', nextTone);
}

function loadPureTones(fileNameArray, side){
    for (i = 0; i < fileNameArray.length; i++){
    new PureTone(fileNameArray[i]);
    pureTones.push(new PureTone(fileNameArray[i]));
    }
    console.log(pureTones);
}

function nextTone(){
    if(curTone < roundNumTotal){
        
        // 1. Pause current tone
        pauseTone();
        
        // 2. Record the result to the array
        recordResult();
        
        // 3. Update curTone variable
        curTone++;
        
        // 4. Resume playing, now with new tone
        playTone();
        
        // 5. reset volume bar
        document.querySelector('#volumeRange').value = .5;
        
        // 6. update volume
        updateVolume();
        
    } else {
        
        // 1. Pause the tone
        pauseTone();
        
        // 2. 
        removeEventListeners();
        
        // 3. hide volume bar
        document.querySelector('#volumeRange').style.display = 'none';
    }
    
};
pureToneInit();

function pureToneInit(){
document.querySelector('.play').addEventListener('click', playTone);
document.querySelector('.stop').addEventListener('click', nextTone);
document.querySelector('#volumeRange').addEventListener('input', updateVolume, false);
    // 3. show volume bar
        document.querySelector('#volumeRange').style.display = 'block';
}
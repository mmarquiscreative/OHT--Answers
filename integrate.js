
// Data CONTROLLER
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// VARIABLES

var dataController = (function() {
    
    var testResults ={
    speech: {
        totalRight: -1,
        totalWrong: -1,
        percentRight: -1,
        percentWrong: -1
    }
}

var counters = {
    curRound: 0,
    answerCounter: 0,
    roundNum: 0,
    volumeCounter: 0
}
    
var speechQuiz={
    questions: [],
    questionsOrder: [],
    answers: [],
    results: {
        totalRight: undefined,
        totalWrong: undefined,
        percentRight: undefined,
        percentWrong: undefined
    }
};
    
// FUNCTIONS

// Answer Object Constructor

function Answer(question, id, parentId, volume){
    this.question = question;
    this.id=id;
    this.volume=volume;
    this.isCorrect = (question === id || question === parentId);
};    

function loadRandomOrder(){
    
    // Calculate 9 groups of 3 numbers
    for (i = 0; i < 9; i++){
        var num1, num2, num3, answer1, answer2, answer3;
        
        // 1. Calculate number in group of 3
        num1 = Math.round(Math.random()*8);
        num2 = Math.round(Math.random()*8);
        num3 = Math.round(Math.random()*8);
        
        // 2. prevent duplicates in groups
        while (num1 === num2 || num2 === num3 || num1 === num3){
            num2 = Math.round(Math.random()*8);
            num3 = Math.round(Math.random()*8);
        }
        
        // 3. update which answers match numbers generated
        answer1 = speechQuiz.questions[num1];
        answer2 = speechQuiz.questions[num2];
        answer3 = speechQuiz.questions[num3];
        
        // 4. add three new answers to end of order array
        speechQuiz.questionsOrder.push(answer1);
        speechQuiz.questionsOrder.push(answer2);
        speechQuiz.questionsOrder.push(answer3);
        
    }
    console.log(speechQuiz.questions);
};
    
// Calculate results of questions, add to results object
function howWell(){
    var right, wrong, percentageRight, percentageWrong, num;
    
    right = 0;
    wrong = 0;
        
    // 1. update right and wrong totals for each answer
    speechQuiz.answers.forEach(function(cur){
        
        if (cur.isCorrect) {
            right++;
        } else if (!cur.isCorrect){
            wrong++;
        } else {
            console.log('answers for each did not work here ' + cur);
        }
    });
    
    // 2. Establish the total number of answers
    num = speechQuiz.answers.length;
    
    // 3. Calculate percent right and wrong
    percentageRight = Math.round((right / num) * 100);
    percentageWrong = Math.round((wrong / num) * 100);

    // 4. Add results to result obj
    testResults.speech.totalRight = right;
    testResults.speech.totalWrong = wrong;
    testResults.speech.percentRight = percentageRight;
    testResults.speech.percentWrong = percentageWrong;
        
};

function addNewAnswer(){
// 1. add new answer obj
        speechQuiz.answers.push(new Answer(speechQuiz.questionsOrder[counters.curRound], event.target.id, event.target.parentNode.id, Math.random()));
}; 

function increaseRoundNum(){
    counters.roundNum++
    console.log('round updated');
};
    function increaseVolumeCounter(num){
    counters.volumeCounter += num;
};
function updateAnswerOptions(newArray){
    speechQuiz.questions = [];
    newArray.forEach(function(cur){
        speechQuiz.questions.push(cur);
    });
};
    
function updateAnswerCounter(num){
    counters.answerCounter = num;
}
// RETURNED PUBLIC FUNCTIONS
  return {
      counters: counters,
      speechQuiz: speechQuiz,
      increaseRoundNum: increaseRoundNum,
      updateAnswerOptions: updateAnswerOptions,
      increaseVolumeCounter: increaseVolumeCounter,
      updateAnswerCounter: updateAnswerCounter,
      loadRandomOrder: loadRandomOrder,
      addNewAnswer: addNewAnswer,
      howWell: howWell,
      addNewAnswer: addNewAnswer
  };

})();







// UI CONTROLLER
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


// VARIABLES

var UIController = (function() {

  /* var importHTML = document.querySelector('link[id="html-templates"]').import;

  var importElements = {
    stageCalib:       importHTML.querySelector('.stage-calib'),
    stageIntro:       importHTML.querySelector('.stage-intro'),
    stageQuiz:        importHTML.querySelector('.stage-quiz'),
    stageSpeechTest:  importHTML.querySelector('.stage-speech-test'),
    stageToneTest:    importHTML.querySelector('.stage-tone-test'),
    stageVolume:      importHTML.querySelector('.stage-volume')
  };
  */

var backgroundAud = new Audio('Audio/BackgroundNoise.mp3');

    
// FUNCTIONS
    
 // 2. Update html to match answers provided as arguments
function updateAnsHTML(ansArray){
    for (i = 0; i < 9; i++){
        cur = ansArray[i];
        tempNum = i + 1;
        
        // 2.1 Update HTML ids for answer divs
        document.querySelector('#ans' + tempNum).id = cur;
        
        // 2.2 Add answer text inside answer divs
        document.querySelector('#' + cur).innerHTML = '<p>' + cur + '</p>';
    }
};
    
function updateRoundProg(ansCounter){        
    
    // 4. Update Answer Progress
        if (ansCounter < 4){
            document.querySelector('#box' + (ansCounter)).classList.add('filled');
        }
};
    
// audio pathway string
function audioString(someNum, someArray){
    console.log(someNum);
    console.log(someArray);
    var tempNum = someNum;
    var curAudio1 = 'Audio/Speech_' + someArray[tempNum] + '.mp3';
    tempNum++;
        
    var curAudio2 = 'Audio/Speech_' + someArray[tempNum] + '.mp3';
    tempNum++;
        
    var curAudio3 = 'Audio/Speech_' + someArray[tempNum] + '.mp3';
    
    // return audio strings as object
    return {
        curAudio1: curAudio1,
        curAudio2: curAudio2,
        curAudio3: curAudio3
    };
};
    

    
// RETURNED PUBLIC FUNCTIONS
  return {
      audioString: audioString,
      updateAnsHTML: updateAnsHTML,
      backgroundAud: backgroundAud,
      updateRoundProg: updateRoundProg
  };

})();






// APP CONTROLLER
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var controller = (function(dataCtrl, UICtrl) {

// VARIABLES

    

// FUNCTIONS
    
function logTarget(){
    // 2. Log target
        console.log('curRound is ' + dataCtrl.counters.curRound);
       
        console.log(event.target.id);
        console.log(dataCtrl.speechQuiz.answers[dataCtrl.counters.curRound].isCorrect);
        var curAnsNum = dataCtrl.counters.answerCounter + 1;
        dataCtrl.updateAnswerCounter(curAnsNum);
        
    
        console.log(dataCtrl.counters.answerCounter);
};
    
function loadNextQuestion(){        
    // 3. nextQuestion
        if (dataCtrl.counters.answerCounter === 3){
        setTimeout(function(){
            askQuestion();
            dataCtrl.updateAnswerCounter(0);
            
            for (i = 0; i < 3; i++){
                var tempNode = document.querySelectorAll('.filled');
                tempNode.forEach(function(cur){
                    cur.classList.remove('filled');
                })
            }
        }, 600)
        }
};
    
// play the 3 audio files
function playAudio(aud1, aud2, aud3){
    aud1.play();
    aud1.onended = function(){
        aud2.play();
        };
    aud2.onended = function(){
        aud3.play();
        };
};    
  
// app        
function audioLoop(){
    UICtrl.backgroundAud.play();
    UICtrl.backgroundAud.loop = true;
    UICtrl.backgroundAud.volume = dataCtrl.counters.volumeCounter;
}

// app        
function pauseAudio(){
    UICtrl.backgroundAud.pause();
}

// app        
function updateVolume(){
    if(dataCtrl.counters.volumeCounter <= .8){
                dataCtrl.increaseVolumeCounter(.2);
                UICtrl.backgroundAud.volume = dataCtrl.counters.volumeCounter;
            }
}
 
// app        
function playRoundAudio(){
     console.log('curRound is ' + dataCtrl.counters.curNum);    
        var tempNum = dataCtrl.counters.curRound;
        
        // 1. create audio pathway strings
        var question = UICtrl.audioString(tempNum, dataCtrl.speechQuiz.questionsOrder);    
        
        // 2. load path string as new Audio object
        var audio1 = new Audio(question.curAudio1);
            // audio1.volume = (1 - dataCtrl.counters.roundNum * .05);
        var audio2 = new Audio(question.curAudio2);
            // audio2.volume = (1 - dataCtrl.counters.roundNum * .05);
        var audio3 = new Audio(question.curAudio3);
            // audio3.volume = (1 - dataCtrl.counters.roundNum * .05);
   
        // 3. play the 3 audio clips
        playAudio(audio1, audio2, audio3);
        
        // 4. update total question rounds
        dataCtrl.increaseRoundNum();
}

// app        
function answerInput(){
    
    // 1. Add new answer obj
    dataCtrl.addNewAnswer();
    
    // 2. Log Target
    logTarget();
    
    // 3. update progress meter
    UICtrl.updateRoundProg(dataCtrl.counters.answerCounter);
    
    // 4. Load next question
    loadNextQuestion();
}; 

// app        
function speechInit(ansArray){
    // 1. load speech test HTML
    console.log('init run');
    dataCtrl.updateAnswerOptions(ansArray);
    console.log(ansArray);
    console.log(dataCtrl.speechQuiz.answers);
    // 2. Update html to match answers provided as arguments
   UICtrl.updateAnsHTML(dataCtrl.speechQuiz.questions);
   
    // 2. add event listeners
    document.querySelector('.container-fluid').addEventListener('click', answerInput);
    
    audioLoop();
    
    // 4. Load Random Order
    dataCtrl.loadRandomOrder();
    
    // 5. ask question
    document.querySelector('#toneAnswer').addEventListener('click', askQuestion);
};

// app
function askQuestion(){
    dataCtrl.increaseRoundNum();
   console.log('askquestion');
    console.log('answerCounter ' + dataCtrl.counters.answerCounter);
    console.log('roundNum ' + dataCtrl.counters.roundNum);
    // Limit number of rounds
    if (dataCtrl.counters.roundNum < 4){
       playRoundAudio();
        updateVolume();
    } else {
        pauseAudio();
    };

};
    
// RETURNED PUBLIC FUNCTIONS
  return {
      speechInit: speechInit
  };

})(dataController, UIController);


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// MAKE IT GO





var speech = ['bells', 'cat', 'king', 'hand', 'cars', 'tree', 'dog', 'book', 'chair'];

var num = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

controller.speechInit(num);





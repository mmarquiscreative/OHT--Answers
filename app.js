// data
var testResults ={
    speech: {
        totalRight: -1,
        totalWrong: -1,
        percentRight: -1,
        percentWrong: -1
    }
}

// data
var counters = {
    curRound: 0,
    answerCounter: 0,
    roundNum: 0,
    volumeCounter: 0
}

function nineOptTest(ans){
    function speechTest(){

// data
var speechQuiz={
    questions: [ans[0], ans[1], ans[2], ans[3], ans[4], ans[5], ans[6], ans[7], ans[8]],
    questionsOrder: [],
    answers: [],
    results: {
        totalRight: undefined,
        totalWrong: undefined,
        percentRight: undefined,
        percentWrong: undefined
    }
}
var backgroundAud;
backgroundAud = new Audio('Audio/BackgroundNoise.mp3');
        
        
// data        
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
}

// data
// Answer Object Constructor
function Answer(question, id, parentId, volume){
    this.question = question;
    this.id=id;
    this.volume=volume;
    this.isCorrect = (question === id || question === parentId);
}

// data        
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
        
}

// UI
// 2. Update html to match answers provided as arguments
function updateAnsHTML(){
    for (i = 0; i < 9; i++){
        cur = ans[i];
        tempNum = i + 1;
        
        // 2.1 Update HTML ids for answer divs
        document.querySelector('#ans' + tempNum).id = cur;
        
        // 2.2 Add answer text inside answer divs
        document.querySelector('#' + cur).innerHTML = '<p>' + cur + '</p>';
    }
}

// data        
function addNewAnswer(){
// 1. add new answer obj
        speechQuiz.answers.push(new Answer(speechQuiz.questionsOrder[counters.curRound], event.target.id, event.target.parentNode.id, Math.random()));
};

// app        
function logTarget(){// 2. Log target
        console.log(counters.curRound);
        console.log(speechQuiz.questionsOrder[counters.curRound]);
        console.log(event.target.id);
        console.log(speechQuiz.answers[counters.curRound].isCorrect);
        counters.answerCounter++;
        counters.curRound++;
};

// UI        
function updateRoundProg(){        
    
    // 4. Update Answer Progress
        if (counters.answerCounter < 4){
            document.querySelector('#box' + (counters.answerCounter)).classList.add('filled');
        }
};

// app        
function loadNextQuestion(){        
    // 3. nextQuestion
        if (counters.answerCounter === 3){
        setTimeout(function(){
            askQuestion();
            counters.answerCounter = 0;
            
            for (i = 0; i < 3; i++){
                var tempNode = document.querySelectorAll('.filled');
                tempNode.forEach(function(cur){
                    cur.classList.remove('filled');
                })
            }
        }, 600)
        }
};

// UI        
// audio pathway string
function audioString(someNum){
    var curAudio1 = 'Audio/Speech_' + speechQuiz.questionsOrder[someNum] + '.mp3';
    someNum++;
        
    var curAudio2 = 'Audio/Speech_' + speechQuiz.questionsOrder[someNum] + '.mp3';
    someNum++;
        
    var curAudio3 = 'Audio/Speech_' + speechQuiz.questionsOrder[someNum] + '.mp3';
    
    // return audio strings as object
    return {
        curAudio1: curAudio1,
        curAudio2: curAudio2,
        curAudio3: curAudio3
    };
};

// app        
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
    backgroundAud.play();
    backgroundAud.loop = true;
    backgroundAud.volume = counters.volumeCounter;
}

// app        
function pauseAudio(){
    backgroundAud.pause();
}

// app        
function updateVolume(){
    if(counters.volumeCounter <= .8){
                counters.volumeCounter += .2;
                backgroundAud.volume = counters.volumeCounter;
            }
}
 
// app        
function playRoundAudio(){
     console.log('round num is ' + counters.roundNum);    
        var tempNum = counters.curRound;
        
        // 1. create audio pathway strings
        var question = audioString(tempNum);    
        
        // 2. load path string as new Audio object
        var audio1 = new Audio(question.curAudio1);
            audio1.volume = (1 - counters.roundNum * .05);
        var audio2 = new Audio(question.curAudio2);
            audio2.volume = (1 - counters.roundNum * .05);
        var audio3 = new Audio(question.curAudio3);
            audio3.volume = (1 - counters.roundNum * .05);
   
        // 3. play the 3 audio clips
        playAudio(audio1, audio2, audio3);
    
        // 4. update total question rounds
        counters.roundNum++;
}

// app        
function answerInput(){
    
    // 1. Add new answer obj
    addNewAnswer();
    
    // 2. Log Target
    logTarget();
    
    // 3. update progress meter
    updateRoundProg();
    
    // 4. Load next question
    loadNextQuestion();
}; 

// app        
function init(){
    // 1. load speech test HTML
    
    // 2. Update html to match answers provided as arguments
   updateAnsHTML();
   
    // 2. add event listeners
    document.querySelector('.container-fluid').addEventListener('click', answerInput);
    
    audioLoop();
};

// app
function askQuestion(){
   
    // Limit number of rounds
    if (counters.roundNum < 4){
       playRoundAudio();
        updateVolume();
    } else {
        pauseAudio();
    };

};
        
loadRandomOrder();
init();
askQuestion();
};


document.querySelector('#toneAnswer').addEventListener('click', speechTest);

};
var speech = ['bells', 'cat', 'king', 'hand', 'cars', 'tree', 'dog', 'book', 'chair'];

var num = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
nineOptTest(num);
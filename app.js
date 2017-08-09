var testResults ={
    speech: {
        totalRight: -1,
        totalWrong: -1,
        percentRight: -1,
        percentWrong: -1
    }
}


function nineOptTest(ans){
    function speechTest(){
var curRound = 0;
var answerCounter = 0;
var roundNum = 0;

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


// Answer Object Constructor
function Answer(question, id, parentId, volume){
    this.question = question;
    this.id=id;
    this.volume=volume;
    this.isCorrect = (question === id || question === parentId);
}

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

function addNewAnswer(){
// 1. add new answer obj
        speechQuiz.answers.push(new Answer(speechQuiz.questionsOrder[curRound], event.target.id, event.target.parentNode.id, Math.random()));
};
        
function logTarget(){// 2. Log target
        console.log(curRound);
        console.log(speechQuiz.questionsOrder[curRound]);
        console.log(event.target.id);
        console.log(speechQuiz.answers[curRound].isCorrect);
        answerCounter++;
        curRound++;
};

function updateRoundProg(){        // 4. Update Answer Progress
        if (answerCounter < 4){
            document.querySelector('#box' + (answerCounter)).classList.add('filled');
        }
};
       
function loadNextQuestion(){        // 3. nextQuestion
        if (answerCounter == 3){
        setTimeout(function(){
askQuestion();
        answerCounter = 0;
            for (i = 0; i < 3; i++){
                var tempNode = document.querySelectorAll('.filled');
                tempNode.forEach(function(cur){
                    cur.classList.remove('filled');
                })
            }
        }, 600)
        }
};
  
function answerInput(){
    
    // 1. Add new answer obj
    addNewAnswer();
    
    // 2. Log Target
    logTarget();
    
    // 3. update progress meter
    updateRoundProg();
    
    // 4. Load next question
    loadNextQuestion();
} 
        
function init(){
    // 1. load speech test HTML
    
    // 2. Update html to match answers provided as arguments
   updateAnsHTML();
   
    // 2. add event listeners
    document.querySelector('.container-fluid').addEventListener('click', answerInput);
} 

//
function askQuestion(){
   
    /*
    var conversation = 'Audio/BackgroundNoise.mp3';
    var backgroundAud = new Audio(conversation);
    backgroundAud.play();
    backgroundAud.onended = function(){
        backgroundAud.play();
    }
    backgroundAud.volume = (roundNum * .2 + .2);
    
    } else */
    // next question
    if (roundNum < 4){
        console.log('round num is ' + roundNum);
    var tempNum = curRound;
    // audio pathway string
    var curAudio1 = 'Audio/Speech_' + speechQuiz.questionsOrder[tempNum] + '.mp3';
        tempNum++;
    var curAudio2 = 'Audio/Speech_' + speechQuiz.questionsOrder[tempNum] + '.mp3';
        tempNum++;
    var curAudio3 = 'Audio/Speech_' + speechQuiz.questionsOrder[tempNum] + '.mp3';
    
    // load path string as new Audio object
    
        
    var audio1 = new Audio(curAudio1);
        audio1.volume = (1 - roundNum * .05);
    var audio2 = new Audio(curAudio2);
        audio2.volume = (1 - roundNum * .05);
    var audio3 = new Audio(curAudio3);
        audio3.volume = (1 - roundNum * .05);
        
   
    // play the 3 audio clips
    audio1.play();
    
    audio1.onended = function(){
        audio2.play();
    }
    
    audio2.onended = function(){
        audio3.play();
    }
    
    // update total question rounds
    roundNum++;

    }
    
    if (roundNum > 3){
        console.log('trying to pause')
        backgroundAud.loop = false;
        backgroundAud.pause();
        backgroundAud.currentTime = 0;
    }
}
loadRandomOrder();
init();
askQuestion();
}
document.querySelector('#toneAnswer').addEventListener('click', speechTest);
}
var speech = ['bells', 'cat', 'king', 'hand', 'cars', 'tree', 'dog', 'book', 'chair'];

var num = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
nineOptTest(num);
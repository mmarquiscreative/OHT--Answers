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
    
    // 1. Calculate 9 groups of 3 numbers
    for (i = 0; i < 9; i++){
        var num1, num2, num3, answer1, answer2, answer3;
        
        // 1.1 Calculate number in group of 3
        num1 = Math.round(Math.random()*8);
        num2 = Math.round(Math.random()*8);
        num3 = Math.round(Math.random()*8);
        
        // 1.2 prevent duplicates in groups
        while (num1 === num2 || num2 === num3 || num1 === num3){
            num2 = Math.round(Math.random()*8);
            num3 = Math.round(Math.random()*8);
        }
        
        answer1 = speechQuiz.questions[num1];
        answer2 = speechQuiz.questions[num2];
        answer3 = speechQuiz.questions[num3];
        
        speechQuiz.questionsOrder.push(answer1);
        speechQuiz.questionsOrder.push(answer2);
        speechQuiz.questionsOrder.push(answer3);
        
    }

    // 2. Push numbers into questions array
}



function Answer(question, id, volume){
    this.question = question;
    this.id=id;
    this.volume=volume;
    this.isCorrect = (question === id);
}

function howWell(){
    var right, wrong, percentageRight, percentageWrong, num;
    
    right = 0;
    wrong = 0;
        
    speechQuiz.answers.forEach(function(cur){
        
        if (cur.isCorrect) {
            right++;
        } else if (!cur.isCorrect){
            wrong++;
        } else {
            console.log('answers for each did not work here ' + cur);
        }
    })
    console.log(right);
    console.log(wrong);
    num = speechQuiz.answers.length;
        
        percentageRight = Math.round((right / num) * 100);
        
        percentageWrong = Math.round((wrong / num) * 100);
        
     
            testResults.speech.totalRight = right,
            testResults.speech.totalWrong = wrong,
            testResults.speech.percentRight = percentageRight,
            testResults.speech.percentWrong = percentageWrong
        
}

function init(){
    // 1. load speech test HTML
    for (i = 0; i < 9; i++){
        cur = ans[i];
        tempNum = i + 1;
        
    document.querySelector('#ans' + tempNum).id = cur;
    document.querySelector('#' + cur).innerHTML = '<p>' + cur + '</p>';
    }
   
    // 2. add event listener
    document.querySelector('.container-fluid').addEventListener('click', function(){
    
        // 1. add new answer obj
        speechQuiz.answers.push(new Answer(speechQuiz.questionsOrder[curRound],event.target.parentNode.id, Math.random()));
        
        // 2. Log target
        console.log(speechQuiz.questionsOrder[curRound]);
        console.log(event.target.id);
        console.log(speechQuiz.answers[curRound].isCorrect);
        answerCounter++;
        curRound++;
        // 3. nextQuestion
        if (answerCounter == 3){
        askQuestion();
        answerCounter = 0;
        }
        
        
});
} 

//
function askQuestion(){
    // next question
    if (roundNum <= 9){
    var tempNum = curRound;
    // audio pathway string
    var curAudio1 = 'Audio/Speech_' + speechQuiz.questionsOrder[tempNum] + '.mp3';
        tempNum++;
    var curAudio2 = 'Audio/Speech_' + speechQuiz.questionsOrder[tempNum] + '.mp3';
        tempNum++;
    var curAudio3 = 'Audio/Speech_' + speechQuiz.questionsOrder[tempNum] + '.mp3';
    
    // load path string as new Audio object
    var audio1 = new Audio(curAudio1);
    var audio2 = new Audio(curAudio2);
    var audio3 = new Audio(curAudio3);
    
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

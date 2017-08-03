var speechQuiz={
    questions: ['bells', 'cat', 'king', 'hand', 'cars', 'tree', 'dog', 'book', 'chair'],
    questionsOrder: ['bells'],
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
        if (num1 === num2 || num2 === num3){
            num2 = Math.round(Math.random()*8);
        } else if (num1 === num3) {
            num3 = Math.round(Math.random()*8)
        }
        
        console.log(num1 + ' ' + num2 + ' ' + num3);
        
        
        answer1 = speechQuiz.questions[num1];
        answer2 = speechQuiz.questions[num2];
        answer3 = speechQuiz.questions[num3];
        
        console.log(answer1 + answer2 + answer3);
        
        speechQuiz.questionsOrder.push(answer1);
        speechQuiz.questionsOrder.push(answer2);
        speechQuiz.questionsOrder.push(answer3);
        
    }

    console.log(speechQuiz.questionsOrder);
    // 2. Push numbers into questions array
}

var curRound = -1;

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
        
     
            speechQuiz.results.totalRight= right,
            speechQuiz.results.totalWrong = wrong,
            speechQuiz.results.percentRight = percentageRight,
            speechQuiz.results.percentWrong = percentageWrong
        
}

function init(){
    
    //add event listener
    document.querySelector('.container-fluid').addEventListener('click', function(){
    
        // 1. add new answer obj
        speechQuiz.answers.push(new Answer(speechQuiz.questionsOrder[curRound],event.target.id, Math.random()))
        
        // 2. Log target
        console.log(event.target.id);
        console.log(speechQuiz.answers[curRound].isCorrect);
        // 3. nextQuestion
        
        askQuestion();
        
        
});
}

function askQuestion(){
    // next question
    curRound++;
    
    // audio pathway string
    var curAudio = 'Audio/Speech_' + speechQuiz.questionsOrder[curRound] + '.mp3';
    
    // load path string as new Audio object
    var audio = new Audio(curAudio);
    
    // play the audio
    audio.play();

        document.querySelector('#question').textContent = speechQuiz.questionsOrder[curRound];

}
init();
askQuestion();
loadRandomOrder();
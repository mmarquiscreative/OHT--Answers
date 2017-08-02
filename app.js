var speechQuiz={
    questions: ['bells', 'cat', 'king', 'hand', 'cars', 'tree', 'dog', 'book', 'chair'],
    answers: [],
    results: {
        totalRight: undefined,
        totalWrong: undefined,
        percentRight: undefined,
        percentWrong: undefined
    }
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
        speechQuiz.answers.push(new Answer(speechQuiz.questions[curRound],event.target.id, Math.random()))
        
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
    

        document.querySelector('#question').textContent = speechQuiz.questions[curRound];

}
init();
askQuestion();

var answers = [];

function Answer(id, volume){
    this.id=id;
    this.volume=volume;
}

document.querySelector('.container-fluid').addEventListener('click', function(){
    answers.push(new Answer(event.target.id, Math.random()))
    console.log(event.target.id);
})


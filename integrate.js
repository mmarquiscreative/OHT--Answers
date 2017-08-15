
// Data CONTROLLER
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

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
    
// RETURNED PUBLIC FUNCTIONS
  return {

  };

})();







// UI CONTROLLER
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var UIController = (function() {

  var importHTML = document.querySelector('link[id="html-templates"]').import;

  var importElements = {
    stageCalib:       importHTML.querySelector('.stage-calib'),
    stageIntro:       importHTML.querySelector('.stage-intro'),
    stageQuiz:        importHTML.querySelector('.stage-quiz'),
    stageSpeechTest:  importHTML.querySelector('.stage-speech-test'),
    stageToneTest:    importHTML.querySelector('.stage-tone-test'),
    stageVolume:      importHTML.querySelector('.stage-volume')
  };
    
    
// RETURNED PUBLIC FUNCTIONS
  return {

  };

})();






// APP CONTROLLER
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////

var controller = (function(dataCtrl, UICtrl) {
    
    
    
// RETURNED PUBLIC FUNCTIONS
  return {

  };

})(dataController, UIController);


///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// MAKE IT GO
controller.init();

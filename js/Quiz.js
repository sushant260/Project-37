class Quiz {
    constructor(){}
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        contestant = new Contestant();
        var contestantCountRef = await database.ref('contestantCount').once("value");
        if(contestantCountRef.exists()){
          contestantCount = contestantCountRef.val();
          contestant.getCount();
        }
        question = new Question()
        question.display();
      }
    }
  
    play(){
        question.input1.hide();
        question.input2.hide();
        question.button.hide();
        question.title.hide();
      background("Yellow");
      fill(0);
      textSize(30);
      text("Result of the Quiz",170, 50);
  
  
      Contestant.getPlayerInfo();
     
      if(allContestants !== undefined){
        
        var display_Answers = 270;
        fill("Blue");
        textSize(18);
        text("*NOTE: Contestant who answered correct are highlighted in green color!",5,250);
  
        for(var plr in allContestants){
          
          var correctAns = "3";
          if (correctAns === allContestants[plr].answer)
            fill("Green")
          else
            fill("red");
  
          display_Answers+=30;
          textSize(20);
          text(allContestants[plr].name + ": " + allContestants[plr].answer, 50,display_Answers)
        }
      }
    }
  }
  
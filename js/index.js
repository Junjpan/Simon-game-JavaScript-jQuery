$(document).ready(function(){
  var level=0;
  var simonArray=[];
  var playerArray=[];
  var id;
  var array=["green","red","yellow","blue"];
  var startId;
  var matchArray;
  var winNumber=15;
  var strictMode=false;

 
  
  
     
  $("#start").on("click",function(){   
   $("#light").css("background-color","red");
   // $("#count").val("--"); 
    level++;
 simonSequence(level);  
});
  
$("#strict").click(function(){
  $("#light").css("background-color","green");
  strictMode=true;
  level=1;
  simonArray=[];
  playerArray=[];
  simonSequence(level);
  
})
  
   //peopleclick
  $(".box").click(function(){  
   var peopleId=$(this).attr("id");
   var  peopleClickId=parseInt(peopleId);
    playerArray.push(peopleClickId);
    $(this).css("opacity","1");
    $("#sound"+peopleClickId)[0].play(); 
    setTimeout(function(){
      $("#"+peopleClickId).css("opacity","0.6");
    },500);
   
   if (!compareTwoArray()&&strictMode==false){
     playerArray=[];
     displayError(); 
   }
    if (!compareTwoArray()&&strictMode==true){
     displayGameOver()
     playerArray=[];
     simonArray=[]; 
     level=1;
     simonSequence(level);  
   }
     
     if (playerArray.length==simonArray.length&&compareTwoArray()==true){   
       if(playerArray.length==winNumber){
      $("#count").val("You Win!");
      $("#sound5")[0].play(); 
      playerArray=[];
     simonArray=[];
     level=0;    
    } else {
       playerArray=[];
       level++;
       simonSequence(level);}
     } 
    
    
  }); 

 
  
//display Error
  function displayError(){  
    var counter=0;
    $("#sound4")[0].play(); 
    var myError=setInterval(function(){
     $("#count").val("Error");
      counter++;
      if(counter==3){ 
       $("#count").val(simonArray.length);
        clearInterval(myError);
        correctSimonSequence(simonArray.length);
        counter=0;
        playerArray=[];
      }
    },1000);
    
  }
  
  //display game over for the strict mode
   function displayGameOver(){  
    $("#sound4")[0].play(); 
    var counter=0;
    var gameOver=setInterval(function(){
     $("#count").val("game over");  
      counter++;
      if(counter==3){ 
        $("#count").val("1");
        clearInterval(gameOver);   
        counter=0;
      }
    },250);
    
  }
 
 //simon sequence
  function simonSequence(level){
$("#count").val(level);    
getRandomId(); 
 var i=0;   
 startId=setInterval(function(){
   id=simonArray[i];
   addSound(id);
   i++;    
if (i==simonArray.length){
  clearInterval(startId);
}
 },1000);    
};  
  
//Simon sequence when you type wrong  
 function correctSimonSequence(level){
$("#count").val(level);    
    console.log(simonArray);
 var i=0;   
 startId=setInterval(function(){
   id=simonArray[i];
   addSound(id);
   i++;    
if (i==simonArray.length){
  clearInterval(startId);
}
 },1000);    
};   
  
//player delay
  function delay(){
  setTimeout (function(){
    $("#count").val("Game over");
    $("#sound6").play();
    level=1;
    simonSequence(level); 
  },2000);
  }
    
function getRandomId(){
    id=Math.floor(Math.random()*4);
    simonArray.push(id);

  }

function addSound(id){
$("."+array[id]).css("opacity","1");
setTimeout(function(){ $("."+array[id]).css("opacity","0.6");
$("#sound"+id)[0].play();                     
},200);    
 } 

  


   function compareTwoArray(){
     for (var i=0;i<playerArray.length;i++){
       if (simonArray[i]!=playerArray[i]){
         return false;
       }   
     } 
     return true;
   };
  
    //turn off the game
  $("#off").click(function(){ 
  $("#light").css("background-color","black");
  $("#count").val('');
  level=0;
  simonArray=[];
  playerArray=[];
  clearInterval(startId);
  strictMode=false;  
});    
    
 

})
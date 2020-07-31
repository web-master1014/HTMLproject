//shaltot
function StartGame()
{
  timer = setInterval(moveChicken, 500);
  timer1 = setInterval(normalEggs, 3000);//normal
  if(localStorage.getItem('mode') == "hard")
  {   
    timer5 = setInterval(goldEggs, 5000);//gold score ++ //hard mode
    timer6 = setInterval(blackEggs, 7000);//black score--//hard mode
    timer7= setInterval(SpeedUp,8000);     
  }    
  timer2 = setInterval(moveTheEggs, 100);  
  timer3 = setInterval(Timer, 1000);  
  audio.play();
  nameLabel.innerHTML="Saver Name: "+ localStorage.getItem('username'); 
}

//move basket by mouse //shaltot
function movebymouse(e)
{
  basket.style.left = (e.clientX + offset[0]) + 'px';
}
// move basket by arrows //osama 

function MoveByArrow(e)
{
  key_code = e.keyCode;

    switch (key_code)
   {
    case 37:
      moveBasketLeft();
      break;
    case 39:
      moveBasketRight();
      break;
   }
}

/// move basket left
function moveBasketLeft()
{
    if (parseInt(basket.offsetLeft) >= 100)//??
    {
      basket.style.left = parseInt(basket.offsetLeft) - 100 + "px";
    }
}

/// move basket Right

function moveBasketRight() 
{
  if (parseInt(basket.offsetLeft) <= screen.availWidth - 120)
    {
        basket.style.left = parseInt(basket.offsetLeft) + 100 + "px";
    }
}

/// move chicken //ayman

function moveChicken() 
{
  if (flag == true) 
  {
    moveChickenRight();
  } 
  else 
  {
    moveChickenLeft();
  }
}

/// move chicken Right
function moveChickenRight() 
{
  for (var i = 0; i < chicken.length; i++) 
  {
    if (parseInt(chicken[i].offsetLeft) <= screen.availWidth - 220 && flag == true) 
    {
      chicken[i].style.left = chicken[i].offsetLeft + 15 + "px";
      flag = true;
    }
    else
    {
      flag = false;
      chicken[i].style.transform = "rotateY(180deg)";
    }
  }
}

/// move chicken left

function moveChickenLeft() 
{
  for (var i = 0; i < chicken.length; i++) 
  {
    if (parseInt(chicken[i].offsetLeft) >= 100 && flag == false) 
    {
      chicken[i].style.left = chicken[i].offsetLeft - 15 + "px";
      flag = false;
    }
    else 
    {
      flag = true;
      chicken[i].style.transform = "rotateY(360deg)";
    }
  }
}
//creat eggs in run time //osama
function Eggs()
{
  var a= Math.floor(Math.random()*3);
  egg = document.createElement("img");
  document.body.appendChild(egg);
  egg.style.width="35px";
  egg.style.height="35px";
  egg.style.setProperty('position','absolute');
  egg.style.top= parseInt(chicken[a].offsetTop) + 110 +'px';
  egg.style.left= parseInt(chicken[a].offsetLeft) + 50  +'px';
  cureentEggs.push(egg); 
}

//white eggs for easy & hard mode
function normalEggs()
{
  Eggs();
  egg.src="images/8.png";
  egg.alt="normal"; 
}
//black eggs for hard mode score increas
function blackEggs()
{ 
  Eggs();
  egg.src="images/black.png";
  egg.alt="black";    
}

//gold eggs for hard more Score decrease
function goldEggs()
{
  Eggs();
  egg.src="images/gold.png";
  egg.alt="gold";  
}
// move eggs
function moveTheEggs() //ayman
{
    for(var i in cureentEggs)
    {
        thisEgg = cureentEggs[i];
        if(thisEgg.offsetTop >= 0 && thisEgg.offsetTop < window.innerHeight  ) 
        {
          thisEgg.style.top= parseInt(thisEgg.offsetTop) + randSpeed +'px';
        
          if( thisEgg.offsetTop >= screen.availHeight * .7 )
          {
                thisEgg.src="images/11.jpg";
                audio2.play();
          }
        }
         else
         {

          thisEgg.remove();
          delete cureentEggs[i];
          if(thisEgg.alt!="black")
            LoseAttempt(thisEgg); 
         }

       } 
}

////score //heba
function updateScore() 
{
  for(var i in cureentEggs)
  {
      thisEgg = cureentEggs[i];

     if(thisEgg.offsetLeft <= basket.offsetLeft + 110 &&
     thisEgg.offsetLeft + 35 >= basket.offsetLeft && 
     thisEgg.offsetTop -35 <= basket.offsetTop 
     && thisEgg.offsetTop > basket.offsetTop - 70) {

       if(thisEgg.alt=="normal")
       {
        score++;
        // counter for white egg in hard mode
        
        Weggs++; 
        
        if(localStorage.getItem('mode') == "hard"){
           whiteEgg.value="white :" +  Weggs + "";
        }
       }
       else if (thisEgg.alt=="gold")
       {
         score=score+3;
       }
       else if(thisEgg.alt=="black" )
       {
         if(score<= 10)
         score=0;
         else
         score-=10;
       }

      scoreLabel.value = "Score : " + score + "";
      thisEgg.style.display="none"
      thisEgg.remove();
      delete cureentEggs[i];
     }  
 }
}
//////////Attempts //shaltot
function LoseAttempt(egg) 
{
  if(attempts > 0 )
  attempts--;
    {
      attemptsLabel.value = "Attempts : " + attempts + "";
    }
}
///////////pause //shaltot
function pause() 
{
    if (stopped == false) 
    { 
        clearInterval(timer);
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        if(localStorage.getItem('mode') == "hard")
        {
        clearInterval(timer5);
        clearInterval(timer6);
        clearInterval(timer7);
        }
        stopped = true;
        pauseclick.src="images/play-button.png";
        audio.pause();
        if(option == 0)
          document.onmousemove = null;
        else  
          body.onkeydown = null;

    }
    else 
    {
        StartGame();
        stopped = false;
        pauseclick.src="images/pauses.png";
        if(option == 0)
          document.onmousemove = function(event){movebymouse(event);}
        else
          body.onkeydown = function(event){MoveByArrow(event);};
    }
}

/////////////Timer //heba
function  Timer(){
    seconds --;
       if(seconds <0)
       {
            seconds=59;
            minutes --;
            
       } 
       countDown.value=""+ minutes +":"+ seconds +" ";

       if(minutes <0)
       {
        countDown.value=" Time Out ";      
       }
        
       updateScore();//
       ScoreDone();//
      
     }
         
     ///////////// match Attempts & Time & score //heba
function ScoreDone(){
    if(  minutes <= 0 && seconds <= 0 || attempts <= 0)
       { 
         loseDiv.style.display="block"; 
        pause();
        audio4.play();
        pauseclick.onclick = null;
}   
  else if(  score >= target)

    {
      winDiv.style.display="block";  
      pause(); 
      audio3.play(); 
      pauseclick.onclick = null;
    }
}

//icremental
function SpeedUp(){
  randSpeed+=.5;
}

// check name move controller && creat white egg score //ayman 

function start(){
  option = 0;
  cuurentUser = userName.value;
  attemptsLabel.value = "Attempts : " + attempts + "";
 countDown.value="  "+ minutes +" : "+ seconds +" ";
  if (cuurentUser == "")
  {
       
    alert("Plz enter your name ");
      
      return false;
  }
  else
  {   
      if(M.checked==true)
      {
        document.onmousemove = function(event){movebymouse(event);}
      }
      else if(A.checked==true)
      {
        body.onkeydown = function(event){MoveByArrow(event);}
        option = 1;
      }
      else{

        alert("Plz select move controller");
        return false;
      }
      if(localStorage.getItem('mode') == "hard"){
        whiteEgg=document.createElement("input");
        document.body.appendChild(whiteEgg);
        whiteEgg.type="button";
        whiteEgg.id="whiteCount";
      }
      document.getElementsByTagName("div")[4].style.display="none";
      localStorage.setItem('username', cuurentUser);
      StartGame();  
  }  
}//


window.onload=init;
window.addEventListener("load", init);
window.addEventListener("load",add);
function init()
{
    objImage = document.getElementById("image");
    chickens = document.getElementsByClassName("chicken");
    objImage.style.position='relative';
    objImage.style.left='500px';
    objImage.style.top='0px';
    for(var i in chickens )
        {
        chickens[i].style.position='relative';
        chickens[i].style.left='0px';
        chickens[i].style.top='0px';
        }
}

function getKeyAndMove(e){				
    var key_code=e.keyCode;

switch(key_code)
{
    case 37: 
    moveLeft();
    break;
    case 39: 
    moveRight();
    break;
}

}
function moveLeft()
{
    if(parseInt(objImage.style.left)<=340)
        parseInt(objImage.style.left)  = 340;
    else    
         objImage.style.left = parseInt(objImage.style.left) - 15 + 'px';
}
function moveRight(){
   if(parseInt(objImage.style.left)>800)
        parseInt(objImage.style.left)  =800;
    else    
    objImage.style.left = parseInt(objImage.style.left) + 15 + 'px';
}


function moveTheCheckins()
{   
    for(var i in chickens )
       {
            var speed = Math.floor(Math.random() * 100) + Math.floor(Math.random() * 100);

            if( parseInt(chickens[i].style.left) <= -100 && flag[i] == 0)
                
                flag[i] = 1;

            else if(parseInt(chickens[i].style.left) >= 100 && flag[i] == 1) 

                flag[i] = 0;

            if(flag[i] == 0 )  
                    
                chickens[i].style.left= parseInt(chickens[i].style.left) - speed + 'px';
                
            else {

                chickens[i].style.left= parseInt(chickens[i].style.left) + speed + 'px';}
            
               hens[i]= parseInt( chickens[i].style.left);
          }    
 }
 
function moveggs()
{              
    var egg = document.getElementsByClassName("egg");  
    for (i = 0; i <egg.length; i++)  
        {
         
        l= l+Math.floor(Math.random() * 30);
        egg[i].style.position="relative";
        egg[i].style.top= l + "px" ; 
        }
    
};

                        
function  add(){              
    timer =setInterval(function()
    {
      seconds --;
         if(seconds <0)
         {
              seconds=59;
              minutes --;
         } 
         document.getElementById("countdown").value="  "+ minutes +" : "+ seconds +" ";

         if(minutes <0)
         {
            document.getElementById("countdown").value=" Time Out ";

         } 
    moveTheCheckins();
    }, 1000);

    timer2 =setInterval(function()
    {
        moveggs();
    },1000)
  }

function stops()
    {
        clearInterval(timer);
        clearInterval(timer2);
    }

timer= setInterval(moveChickenLeft(),1000);
function MoveBasket(e)
{
    key_code=e.keyCode;

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
    if(parseInt(basket.style.left)<=screen.availWidth-166 && parseInt(basket.style.left)>0){
        basket.style.left = parseInt(basket.style.left) - 100 + 'px'; }
}
function moveRight()
{
    if(parseInt(basket.style.left)>=0 && parseInt(basket.style.left)<screen.availWidth-180)
    {
        basket.style.left = parseInt(basket.style.left) + 100 + 'px'; 
    }
}
// function ReadyChicken()
// {
//     for (i in chicken)
//     {
//         chicken[i].style.position='absolute';
//     }
// }
function moveChickenLeft()
{
    for (var i=0;i<chicken.length ;i++ )
    {
        if(parseInt(chicken[i].style.left)<=screen.availWidth-166 && parseInt(chicken[i].style.left)>0)
        {
            chicken[i].style.left = parseInt(chicken[i].style.left) - 100 + 'px'; 
        }
    }
}
function moveChickenRight()
{  
    for (i in chicken)
    {
        if(parseInt(chicken[i].style.left)>=0 && parseInt(chicken[i].style.left)<screen.availWidth-180)
        {
            chicken[i].style.left = parseInt(chicken[i].style.left) + 100 + 'px'; 
        }         
    }  
}

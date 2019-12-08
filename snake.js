window.onload = function() {

    let cvs = document.getElementById("canvas");
    let ctx = cvs.getContext("2d");

    let cvsW = cvs.width;
    let cvsH = cvs.height;

    let snakeW = 10;
    let snakeH = 10;

    //score var
    let score = 4;


    // default direction
    let direction = "right";

    // read users directions
    document.addEventListener("keydown", getDirection);

    function getDirection(event) {
        if(event.keyCode == 37 && direction != "right"){
            direction = "left";
        } else if(event.keyCode == 38 && direction != "down"){
            direction = "up";
        } else if(event.keyCode == 39 && direction != "left"){
            direction = "right";
        } else if(event.keyCode == 40 && direction != "up"){
            direction = "down";
        }
    }

    function drawSnake(x,y){
        ctx.fillStyle = "green";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.fillStyle = "#000";
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
    }


    // create snake object that will have 4 cells by default

    let len = 4;
    let snake = [];

    for(let i = len-1; i >= 0; i--){

        snake.push(
            {x:i,
             y:0
            }
        );
    }


    // create some food
    food = {
        x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
        y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
    }

    // draw food function 
    function drawFood(x,y){
        ctx.fillStyle = "red";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.fillStyle = "#000";
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
    }


    // check collision
    function checkCollision(x,y,array){
        for(let i = 1; i < array.length; i++){
            if (x == array[i].x && y == array[i].y){
                return true;
            }
        }
        return false;
    }

    function drawScore(x){
        ctx.fillStyle = "yellow";
        ctx.font = "15px Verdana";
        ctx.fillText("score : "+x, 5, cvsH-5); 
    }

    function draw(){
        ctx.clearRect(0, 0,cvsW,cvsH);
        for(let i = 0; i < snake.length; i++){
            let x = snake[i].x;
            let y = snake[i].y;
            drawSnake(x,y);
        }

        // drawFood
        drawFood(food.x,food.y);
        
        // draw snake head
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // create a new head, based on the previous head and the direction

        if(direction == "left") snakeX--;
        else if(direction == "up") snakeY--;
        else if(direction == "right") snakeX++;
        else if(direction == "down") snakeY++;

        // if the snake hits the wall, game over
        if(snakeX < 0 || snakeY < 0 || snakeX >= cvsW/snakeW || snakeY >= cvsH/snakeH ||
            checkCollision(snakeX,snakeY,snake)){
                location.reload();
            }

        // if our snake eats the food it grows!
        if(snakeX == food.x && snakeY == food.y){
            food = {
                x : Math.round(Math.random()*(cvsW/snakeW-1)+1),
                y : Math.round(Math.random()*(cvsH/snakeH-1)+1)
            }
            let newHead = {
                        x : snakeX,
                        y : snakeY
                    };
                    score++
        }else{
            snake.pop();
        } 
         let newHead = {
            x : snakeX,
            y : snakeY
        }; 
        
        snake.unshift(newHead);
        drawScore(score);
    }

    setInterval(draw,60);
}
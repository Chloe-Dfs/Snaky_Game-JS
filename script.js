const canvas = document.querySelector("canvas")
        const context = canvas.getContext('2d') /*indique que le jeu est en 2d*/

        let box = 20 /*définit la taille des box à 20px*/
        let snake = []; /*le serpent est un tableau*/
        snake[0] = { x: 10*box, y: 10*box}

        let score = 0 /*définition du score initial à 0*/

        let food = { /*définition de la nourriture à un endroit random*/
            x: Math.floor(Math.random() * 15+1) * box,
            y: Math.floor(Math.random() * 15+1) * box
        }

        let d /*direction du serpent*/

        document.addEventListener("keydown", direction);

        function direction(event){
            let key = event.keyCode;
            if (key ==37 && d != "RIGHT"){
                d = "LEFT";
            }
            else if (key == 38 && d !="DOWN"){
                d = "UP";
            }
            else if (key == 39 && d !="LEFT"){
                d = "RIGHT";
            }
            else if (key == 40 && d !="UP"){
                d = "DOWN";
            }
        }

        function draw(){
            context.clearRect(0, 0, 400, 400)

            for (let i=0; i<snake.length; i++){
                context.fillStyle = (i == 0) ? "red" : "green"
                context.fillRect(snake[i].x, snake[i].y, box, box) /*définition du rectangle du serpent */
                context.strokeStyle = "green"
                context.strokeRect(snake[i].x, snake[i].y, box, box); /*définition de la bordure*/
            }

            context.fillStyle = "orange"
            context.fillRect(food.x, food.y, box, box); /*définition du rectangle de la food*/

            let snakeX = snake[0].x     /*mise à jour de la pos du serpent*/
            let snakeY = snake[0].y

            if (d == "LEFT") snakeX -= box;
            if (d == "UP") snakeY -= box;
            if (d == "RIGHT") snakeX += box;
            if (d == "DOWN") snakeY += box;

            if (snakeX == food.x && snakeY == food.y){
                incrementScore();
                food = {
                    x: Math.floor(Math.random() * 15+1) * box,
                    y: Math.floor(Math.random() * 15+1) * box
                }
            }
            else {
                snake.pop()
            }

            let newHead = { /*nouvelle tete du serpent*/
                x: snakeX,
                y: snakeY
            }

            if (snakeX<0 || snakeY<0 || snakeX> 19*box || snakeY> 19*box || collision(newHead, snake)){
                clearInterval(game);
                Loose();
            }

            snake.unshift(newHead);
        }

        function collision(head, array){
            for (let g= 0; g< array.length; g++){
                if (head.x == array[g].x && head.y == array[g].y ){
                    return true;
                }
            }
            return false
        }

        function actualiserPage() {
            if(window.confirm("Voulez-vous recommencer la partie ? ")){
                alert("Début d'une nouvelle partie ! ");
                location.reload();
            }
        }

        function pauseGame(){
            alert("pause!");
        }

        function incrementScore() {
            score++;
            scorePan.textContent = "Score :" + score;
        }

        function Loose(){
            perdu.textContent = "PERDU !!!";
        }

        const bouton1 = document.getElementById("bouton1");
        const bouton2 = document.getElementById("bouton2");
        const scorePan = document.getElementById("score");
        const perdu = document.getElementById("perdu")

        bouton1.addEventListener("click", actualiserPage);
        bouton2.addEventListener("click", pauseGame);
        /*scorePan.addEventListener("click", incrementScore);*/

        let game = setInterval(draw, 350)
            

        
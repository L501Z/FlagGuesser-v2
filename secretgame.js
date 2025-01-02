
let hits = 0;
let score = 0;
let hp = 100;
let blockState = false;
let sE = true;
let enemyMovementCounter = 0;
let randNum = Math.floor(Math.random() * (16 - 5 + 1)) + 5;

//event listener is a timeout to prevent user spamming 

setTimeout(() =>{
    addEventListener("keydown", (event) =>{
        if (event.code === "Space"){
            jump();
        }
    });
    
    addEventListener("keydown", (event) =>{
        if (event.code === "KeyM"){
            shoot();
        }
    });

    addEventListener("keydown", (event) =>{
        if (event.code === "KeyB"){
            block();
        }
    });

    addEventListener("keydown", (event) =>{
        if (event.code === "KeyN"){
            shootLow();
        }
    });
}, 1000);

function block(){
    console.log("block");
    blockState = true;
    document.getElementById("userpic").src = "gamesprite2.4.png";  
    setTimeout(() =>{
        document.getElementById("userpic").src = "gamesprite2.png";  
        blockState = false;
        clearInterval();
    }, 750);
}

function shoot(){
    document.getElementById("spear").style.visibility = "visible";  
    document.getElementById("userpic").src = "gamesprite2.3.png";  
    let swords = document.getElementById("spear");
    if (swords.classList != "animateShoot"){
        swords.classList.add("animateShoot");
    }
    setTimeout(() =>{
        swords.classList.remove("animateShoot");  
        document.getElementById("userpic").src = "gamesprite2.png";  
        document.getElementById("spear").style.visibility = "hidden"; 
        clearInterval();
    }, 750);
}

function shootLow(){

    //shoot shot
    document.getElementById("spear").style.visibility = "visible";  
    document.getElementById("userpic").src = "gamesprite2.3.png";  
    let swords = document.getElementById("spear");
    if (swords.classList != "animateShootLow"){
        swords.classList.add("animateShootLow");
    }
    setTimeout(() =>{
        swords.classList.remove("animateShootLow");  
        document.getElementById("userpic").src = "gamesprite2.png";  
        document.getElementById("spear").style.visibility = "hidden"; 
        clearInterval();
    }, 1250);

    //hit detection

    const lowHitDetection = setInterval(() => {
        let spear = document.getElementById("spear");
        let enemy4 = document.getElementById("enemy4");
        let enemy41 = document.getElementById("enem4");
        let leftPos = enemy4.offsetLeft;

        console.log(spear.offsetTop);
        // if spear touches enemy 1 or 2, kill the enemy playing the death animation class for each enemey
        if (spear.offsetLeft > leftPos && spear.offsetTop < 180){
            console.log("hit");
            score+=20;         
            enemy4.classList.remove("animateGoblinCharge"); 
            enemy41.src = "/enemies/enemy1B.png";
   
    
            setTimeout(() =>{
                enemy41.src = "/enemies/enemy1A.png";
                enemy4.classList.add("animateEnemyMoveLeft"); 
            }, 750);
        }


        // add score increase upon killing enemy



        // add block feature which means user takes no damage if the block is in progress

        

        // if user doesnt block or jump and collides with enemy 1 or two, then lose hp ;
    }, 5)

}

function jump(){
    let user = document.getElementById("user");
    if (user.classList != "animate"){
        user.classList.add("animate");
    }
    setTimeout(() =>{
        user.classList.remove("animate");  
        clearInterval();
    }, 1000);



}


const moveEnemies = setInterval(() => {
    //every second move the enemy left by x pixels until it hits a wall then moves right by x pixels until a wall and repeat
    let enemy4 = document.getElementById("enemy4");
    let enem4 = document.getElementById("enem4");
    enemyMovementCounter++;
    if (enemyMovementCounter >= randNum){
        enemy4.classList.remove("animateEnemyMoveLeft");
        enemy4.classList.add("animateGoblinCharge");
        setTimeout(() =>{
            enemy4.classList.remove("animateGoblinCharge");  
            clearTimeout();
        }, 6000);
        if (enemyMovementCounter >=randNum + 6){
            enemyMovementCounter = 0;
            randNum = Math.floor(Math.random() * (16 - 5 + 1)) + 5;
        }
    }
    else{
        enemy4.classList.remove("animateGoblinCharge");
        enemy4.classList.add("animateEnemyMoveLeft");
    }

    // if movement counter == a random number between 5 and 30 then cancel current animation and charge towards the user.
}, 1000);


// hit detection for moving pillars
const hitDetection = setInterval(() => {

    let user = document.getElementById("user");
    let enemy = document.getElementById("enemy");
    let enemy2 = document.getElementById("enemy2");
    let enemy3 = document.getElementById("enemy3");

    if (hits >= 100){
        clearInterval(hitDetection);
    }

    //if level 1 enemies hit the sprite
    if (enemy.offsetLeft < 690 && enemy.offsetLeft > 650 && user.offsetTop >= 140 ){
        hits++;
        document.getElementById("hits").innerHTML = "hits: "+hits;  
        user.style.visibility = "hidden";
        document.getElementById("enem1").src = "gamesprite10.png";
        setTimeout(() => {
            document.getElementById("user").style.visibility = "visible";
            document.getElementById("enem1").src = "gamesprite4.png";
        }, 500)   
    }
    if (enemy2.offsetLeft < 690 && enemy2.offsetLeft > 650 && user.offsetTop >= 150 ){
        hits++;
        document.getElementById("hits").innerHTML = "hits: "+hits;    
        user.style.visibility = "hidden";
        document.getElementById("enem2").src = "gamesprite8.png";
        setTimeout(() => {
            document.getElementById("user").style.visibility = "visible";
            document.getElementById("enem2").src = "gamesprite1.png";
        }, 500)
    }
    if (enemy3.offsetLeft < 690 && enemy3.offsetLeft > 650 && user.offsetTop >= 150 ){
        hits++;
        document.getElementById("hits").innerHTML = "hits: "+hits;   
        user.style.visibility = "hidden";
        document.getElementById("enem3").src = "gamesprite9.png";
        setTimeout(() => {
            user.style.visibility = "visible";
            document.getElementById("enem3").src = "gamesprite7.png";
        }, 500) 
    }

    
    //if user takes too much damage
    if (hits >= 100){
        user.style.display = "none";
        enemy.style.display = "none";
        document.getElementById("hits").innerHTML = "Game Over";
        document.getElementById("h1").style.visibility = "hidden";
        document.getElementById("score").style.visibility = "hidden";
        return;
    }
    if (hits >= 20){
        document.getElementById("h5").style.visibility = "hidden";
    }
    if (hits >= 40){
        document.getElementById("h4").style.visibility = "hidden";
    }
    if (hits >= 60){
        document.getElementById("h3").style.visibility = "hidden";
    }
    if (hits >= 80){
        document.getElementById("h2").style.visibility = "hidden";
    }
    document.getElementById("score").innerHTML = "Score: "+Math.trunc(score / 100); 

    hp = hp - hits;
    score++;

}, 5);

function spawnEnemies(){
    console.log("spawn");
    document.getElementById("enem4").style.visibility = "visible";
}

function launchGame(){    
    score = 0;
    hits = 0;
    document.getElementById("gamecontainer").style.visibility = "hidden";
    document.getElementById("secretgame").style.visibility = "visible";
    document.getElementById("hits").style.visibility = "visible";
}





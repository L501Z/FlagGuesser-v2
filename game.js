let arr2 = new Array(); 
let answerArray = new Array();
let correctArray = new Array();
let aLen = arr2.length;
let firstGame = true;
let gScore = new Array(); 


function main(){
    let arr = createRandArray();
    timer(3000, arr);
}

function startGame(){
    document.getElementById("saveResults").style.visibility = "hidden";
    document.getElementById("startGame").style.visibility = "hidden";
    nextFlag();
}

function reset(){
    location.reload();
}

function createRandArray(){
    let arr = new Array();
    let numArr = new Array();
    while (arr.length != 9){
        let str = "flagOverlay";
        let rNum = getRandomNumber(9, numArr);
        str+=rNum;
        numArr.push(rNum);
        arr.push(str);
    }
    return arr;
}

function getRandomNumber(range, arr){
    let randNum =  Math.floor(Math.random() * range);
    if (arr.includes(randNum)){
        randNum = getRandomNumber(range, arr);
    }
    return randNum;
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function timer(ms, randomList){
    for (let i=0; i<=8; i++){
        removeOverlay(9, randomList[i]);
        await delay(1000);
    }
    nextFlag();
}

function removeOverlay(seconds, overlay){ 
    let i = 1;
    const gametimer = setInterval(function(){
        document.getElementById(overlay).style.opacity = i - 0.05;
        i = i-0.22;
        if (i == 0){
            return;
        }
        if (seconds <= 0){
            document.getElementById(overlay).style.opacity = 0;
            clearInterval(gametimer);
        }
        --seconds;
    }, 50);
    return;
}

function nextFlag(){
    if (aLen == 5){
        answerArray.push(document.getElementById("inputBox").value);
        document.getElementById("userInputs").innerHTML = "Your answers: " + answerArray;
        document.getElementById("correctAnswers").innerHTML = "Correct Answers: " + correctArray;
        checkAnswers();
        document.getElementById("saveResults").style.visibility = "visible";
        return;
    }
    let rNum = configureNumber(getRandomNumber(201, arr2));
    if (arr2.includes(rNum)){
        nextFlag();
    }
    arr2.push(rNum);
    aLen = arr2.length;
    document.getElementById("score").innerHTML = "Question: "+aLen;
    getCountry(rNum);
    setOverlay();
    main();
}

function getCountry(rNum){
    try{
        fetch("/flags-main/key.txt")
        .then(response => response.text())
        .then(contents => {
            //getting country name from random number
            let key = contents.split("\n").join().replace("\r", "").split(",");
            let countryName = key.indexOf(rNum.toString()) + 1;
            let nextCountry = key[countryName];
            let nextPath = "/flags-main/"+rNum+nextCountry+".png";
            //there is a bug where this number generates an incompatable file path
            //the statement backtracks to nextFlag to generate a different number
            if (nextCountry === "001"){
                nextFlag();
            }
            //if this is not here, the first user input will happen when the game is started
            //this makes the user input array 1 length longer than the correct answers array when they should be same size
            if (firstGame == true){
                firstGame = false;
            }else{
                answerArray.push(document.getElementById("inputBox").value)
            }
            correctArray.push(nextCountry);
            
            document.getElementById("inputBox").value = "";
            document.getElementById("currentFlag").src = nextPath;
            document.getElementById("currentFlag").width = 429;
            return;
        });
    } catch (exception){
        console.log("Not working sorry");
    }
    return;
}

function configureNumber(rNum){
    // adds a 0 or 00 to start of number to match file format
    if (rNum < 10){ rNum = "0"+"0"+rNum; }
    else if (rNum >= 10 && rNum < 100){ rNum = "0"+rNum; }
    return rNum;
}

function setOverlay(){
    for (let i=0; i<=8; i++){
        let overlay = "flagOverlay";
        overlay+=i;
        document.getElementById(overlay).style.opacity = 1;
    }
}

function checkAnswers(){
    let i = 0;
    let score = 0;
    while (i < correctArray.length) {
        if (correctArray[i].toLowerCase().trim() === answerArray[i].toLowerCase().trim()){
            score=score+1;
        }
        i++;
    }
    gScore.push(score);

    document.getElementById("score").innerHTML = score+ " / "+aLen;
}
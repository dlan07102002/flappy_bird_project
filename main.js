let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');

canvas.height = 710;
canvas.width = 530;

const graphics = new Image();
graphics.src = './assets/img/background_img.png';
let game = 'start';
let frame = 0;
// Start game
const start = {
    draw: function() {
        ctx.beginPath();
        ctx.drawImage(graphics, 570, 150, 150, 35, canvas.width/2 - 114, 50, 236 , 50)
        ctx.drawImage(graphics, 480, 96, 145, 36, canvas.width/2 - 114, 175, 225 , 50)
        ctx.drawImage(graphics, 500, 145, 70, 85, canvas.width/2 - 50, canvas.height/2 - 60 , 105 , 127.5)
    }
}
// End game
const end = {
    draw: function(){
        ctx.beginPath();
        ctx.drawImage(graphics, 642, 96, 156, 34, canvas.width/2 - 123, 200, 246, 54);
        ctx.drawImage(graphics, 3, 418, 190, 100, canvas.width/2 - 145, 350, 290, 145);
        ctx.drawImage(graphics, 180, 815, 31, 15, canvas.width/2 - 46.5, 500, 93, 45);
    }
}

// Animation background
const background = {
    sX: 0,
    sY: 0,
    sW: 236,
    sH: 417,
    cX: 0,
    cY: 0,
    cW: 572,
    cH: 525,
    draw: function () {
        ctx.beginPath();
        ctx.drawImage(graphics, this.sX, this.sY, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH + 293);
        ctx.drawImage(graphics, this.sX, this.sY, this.sW, this.sH, this.cX + 234, this.cY , this.cW, this.cH + 293);
        ctx.drawImage(graphics, this.sX, this.sY, this.sW, this.sH, this.cX + 468, this.cY, this.cW, this.cH + 293);
    }
}
// Ground

class Ground {
    constructor(cX, cY){
        this.cX = cX;
        this.cY = cY;
        this.sX = 475;
        this.sY = 0;
        this.sW = 275;
        this.sH = 90;
        this.cW = 275;
        this.cH = 180;
        this.dX = -2;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(graphics, this.sX, this.sY, this.sW,this.sH,this.cX, this.cY, this.cW, this.cH);
    }
}
let arrGround = [];
for(let i = 0; i < 4; i++){
    let ground = new Ground(250 * i, 625)
    arrGround.push(ground);
}
function drawArrGround(){
    arrGround.forEach(ground => ground.draw())
}
function moveGround(){
    arrGround.forEach(ground => {
        ground.cX += ground.dX;
    })

    if(arrGround[0].cX <= -320){
        arrGround.splice(0,1);
        let ground = new Ground(arrGround[2].cX + 250, 625);
        arrGround.push(ground);
    }
}
// Random 
function random(min,max){
    return Math.ceil(Math.random() * (max-min) + min);
}

// Pipe
class Pipes{
    constructor(cX,cY, space){
        this.cX = cX; 
        this.cY = cY;
        this.cW = 82;
        this.cH = 710;
        this.sXb = 0;
        this.sYb = 524;
        this.sXt = 90;
        this.sYt = 524;
        this.sW = 44;
        this.sH = 265;
        this.dX = -2;
        this.space = space;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(graphics, this.sXt, this.sYt, this.sW, this.sH, this.cX, this.cY, this.cW, this.cH );
        ctx.drawImage(graphics, this.sXb, this.sYb, this.sW, this.sH, this.cX, this.cY + this.cH + this.space, this.cW, this.cH);

    }
}
let arrPipes= [];
var newPipes = function(){
    for(let i = 1; i < 4; i++){
        let pipe = new Pipes(random(530, 600) * i, random(-660,-300), 200)
        arrPipes.push(pipe);
    }
}
newPipes();

function drawArrPipes(){
    arrPipes.forEach(pipe => pipe.draw())
}
function movePipe(){
    arrPipes.forEach(pipe => {
        pipe.cX += pipe.dX;
    })

    if(arrPipes[0].cX <= -82){
        arrPipes.splice(0,1);
        let pipe = new Pipes(arrPipes[arrPipes.length - 1].cX + random(400, 500)
        ,random(-660,-300), random(200,150));
        arrPipes.push(pipe);
    }
}
// Number
const arrNumber = [
    {name: 0, sX: 806, sY: 95, sW: 24, sH: 35, cW: 52, cH: 80},
    {name: 1, sX: 219, sY: 739, sW: 24, sH: 35, cW: 52, cH: 80},
    {name: 2, sX: 474, sY: 258, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 3, sX: 497, sY: 258, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 4, sX: 520, sY: 258, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 5, sX: 543, sY: 258, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 6, sX: 474, sY: 297, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 7, sX: 497, sY: 297, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 8, sX: 520, sY: 297, sW: 24, sH: 35, cW: 52, cH: 79},
    {name: 9, sX: 543, sY: 297, sW: 24, sH: 35, cW: 52, cH: 79},
]
// Score
class Score {
    constructor(value, cX, cY){
        this.value = value;
        this.cX = cX;
        this.cY = cY;
    }
    draw(){
        ctx.beginPath();
        if(this.value >= 10){
            this.split = (this.value.toString()).split('');
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(graphics, number.sX, number.sY, number.sW, number.sH, canvas.width/2 - 52, 60, number.cW, number.cH);
                }
                if(this.split[1] == number.name){
                    ctx.drawImage(graphics, number.sX, number.sY, number.sW, number.sH, canvas.width/2 + 2, 60, number.cW, number.cH);
                }
            })
        }
        else {
            this.split = this.value.toString();
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(graphics, number.sX, number.sY ,number.sW, number.sH, canvas.width/2 - 26, 60, number.cW, number.cH);

                }
            })
        }
    }

    drawScore(){
        ctx.beginPath();
        if(this.value >= 10){
            this.split = (this.value.toString()).split('');
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(graphics, number.sX, number.sY, number.sW, number.sH, this.cX, this.cY, number.cW/3, number.cH/3);
                }
                if(this.split[1] == number.name){
                    ctx.drawImage(graphics, number.sX, number.sY, number.sW, number.sH, this.cX , this.cY, number.cW/3, number.cH/3);
                }
            })
        }
        else {
            this.split = this.value.toString();
            arrNumber.forEach(number => {
                if(this.split[0] == number.name){
                    ctx.drawImage(graphics, number.sX, number.sY ,number.sW, number.sH, this.cX + 18, this.cY, number.cW/3, number.cH/3);

                }
            })
        }
    }
}
let score = new Score(0, 340, 391);
let best = new Score(0, 340, 440);
// Bird
class Bird {
    constructor(cX, cY){
        this.cX = cX;
        this.cY = cY;
        this.animate = [
            {sX: 184, sY: 618},
            {sX: 184, sY: 533},
            {sX: 184, sY: 575},
        ]
        this.sW = 34;
        this.sH = 26;
        this.cW = 60;
        this.cH = 50;
        this.i = 0;
        this.a = 0;
        this.g = 0.5;
    }
    draw() {
        ctx.beginPath();
        if(game == 'start'){
            if(frame % 35 == 0){
                this.i++;
                if(this.i > 2){
                    this.i = 0;
                }
            }
        }
        if(game == 'play' ){
            if(frame % 16 == 0){
                this.i++;
                if(this.i > 2){
                    this.i = 0;
                }
            }
        }

        ctx.drawImage(graphics, this.animate[this.i].sX, this.animate[this.i].sY, this.sW, this.sH,
        this.cX, this.cY, this.cW, this.cH)
    }
    update(){
        if(game == 'play' || game == 'end'){
            this.a += this.g;
            this.cY += this.a;
        }
        // Check the touch with the ground
        if(this.cY + this.cH + this.a >= 625){
            game = 'end';
            this.a = 0;
            this.cY = 600;
        }
        // Check the touch with the Pipes
        if(
            this.cX + this.cW > arrPipes[0].cX && 
            this.cX < arrPipes[0].cX + arrPipes[0].cW &&
        (
            bird.cY < arrPipes[0].cY + arrPipes[0].cH
            || bird.cY + bird.cH > arrPipes[0].cY + arrPipes[0].cH + arrPipes[0].space
        )
        ){
            game = 'end';
        }
        
        // get point
        if( bird.cX == arrPipes[0].cX + 82 || bird.cX == arrPipes[0].cX + 81){
            score.value++;
            best.value = Math.max(score.value, best.value);
        }
}
}
let bird = new Bird(140, canvas.height / 2 - 66);
// Medal
class Medal{
    constructor(i){
        this.sX = [196, 196, 529];
        this.sY = [418, 457, 478];
        this.sXn = 529;
        this.sYn = 478;
        this.sW = 48;
        this.sH = 38;
        this.cX = canvas.width/2 - 108;
        this.cY = 402;
        this.cW = 64;
        this.cH = 56;
        this.i = i;
    }
    draw(){
        ctx.beginPath();
        ctx.drawImage(graphics,this.sX[this.i],this.sY[this.i], this.sW, this.sH, this.cX, this.cY , this.cW, this.cH)
    }
    update(){
        if(score.value == 0){
            this.i = 2;
        }
        else if(score.value == best.value){
            this.i = 1;
        }else if(score.value >= best.value/2 && score.value < best.value)
        {
            this.i = 0;
        }else {
            this.i = 2;
        }
    }

}
let medal = new  Medal(0)
canvas.addEventListener('click',function(event){
    switch(game){
        case 'start':
            game = 'play';
            break;
        case 'play':
            console.log('Play game');
            bird.a = -8;
            break;
        case 'end':
            console.log('End game');
            if(event.offsetX > canvas.width/2 - 46.5 && event.offsetX < canvas.width/2 + 46.5
            && event.offsetY > 500 && event.offsetY < 546){
                arrPipes = [];
                score.value = 0;
                newPipes();
                bird.a = 0;
                bird.cY = canvas.height / 2 - 12;
                game = 'start';
               
            }
            break;
    }
})
function draw() {
    background.draw();
    if(game == 'start'){
        start.draw();
    }
    drawArrPipes();
    drawArrGround();
    if(game == 'play'){
        score.draw();
    }
    bird.draw();
    if(game == 'end'){
        end.draw();
        score.drawScore();
        best.drawScore();
        medal.draw();
    }
}
function update(){
    if(game == 'play'){
        movePipe();
        moveGround();
    }
    bird.update();
    medal.update();
}
function animate() {
    requestAnimationFrame(animate);
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
}
animate();

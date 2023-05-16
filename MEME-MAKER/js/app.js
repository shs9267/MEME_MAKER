const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("erase-btn");
const fileinput = document.getElementById("file");
const textinput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.fillStyle = event.target.dataset.color;
    ctx.strokeStyle = event.target.dataset.color;
    color.value = colorValue;
}

function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else{
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function onEraserClick(){
    ctx.strokeStyle = "ivory";
    isFilling = false;
    modeBtn.innerText = "Draw";
}

function onImageClick(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); // html의 <img src="">
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileinput.value = null;
    }
}

function onTextClick(event){
    const text = textinput.value;
    if (text !== ""){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.font="100px serif";
    ctx.restore();
    }
}

function onSaveClick(){
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "MyDrawing.png";
    a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onTextClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraserClick);
fileinput.addEventListener("change", onImageClick);
saveBtn.addEventListener("click", onSaveClick);

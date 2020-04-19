// DOM elements
let canvas, ctx, clrPicker, imgInput, brushinput, nameInput;
// Mouse Data
let prevX, prevY, currX, currY;
let drawing = false;

let brushWidthNum = 3;

let picName = 'untitled';

function save() {
    var pic = canvas.toDataURL('image/png');
    var file = new Blob([pic], {
        type: "image/png"
    });
    var a = document.createElement("a"),
        url = URL.createObjectURL(file);
    a.href = pic;
    a.download = picName + '.png';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

function fill() {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
    if (confirm("Are you sure?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function clrPicked() {
    ctx.fillStyle = clrPicker.value;
    ctx.strokeStyle = clrPicker.value;
}

function imgPicked() {
    var img = new Image(canvas.width, canvas.height);
    img.src = URL.createObjectURL(document.getElementById("imgInput").files[0]);
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function brushWidth() {
    if (brushInput.value > 1) {
        brushWidthNum = brushInput.value;
    } else {
        brushInput = 2;
    }
}

function nameChanged() {
    picName = nameInput.value;
}

function draw(eid, e) {
    if (eid == "down") {
        drawing = true;
        ctx.lineWidth = brushWidthNum;
        ctx.beginPath();
        ctx.arc(prevX, prevY, brushWidthNum / 2, 0, Math.pi / 180);
        ctx.fill();
    }
    if (eid == "up") {
        drawing = false;
    }
    if (eid == "move") {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;
        if (drawing) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.stroke();
        }
    }
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = 450;
    canvas.height = 375;
    ctx.lineCap = "round";
    canvas.addEventListener("mousemove", function(e) {
        draw("move", e);
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        draw("down", e);
    }, false);
    document.addEventListener("mouseup", function(e) {
        draw("up", e);
    }, false);
    clrPicker = document.getElementById("clrPicker");
    clrPicker.addEventListener("change", clrPicked);
    imgInput = document.getElementById("imgInput");
    imgInput.addEventListener("change", imgPicked);
    brushInput = document.getElementById("brushInput");
    brushInput.addEventListener("change", brushWidth);
    nameInput = document.getElementById("nameInput");
    nameInput.addEventListener("change", nameChanged);
}
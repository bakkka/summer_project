
let canvas = document.getElementById('canvas');


let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const thumbnailCanvas = document.getElementById('thumbnailCanvas');
let minHeight = thumbnailCanvas.height;
let minWidth = thumbnailCanvas.width;
const minCtx = thumbnailCanvas.getContext('2d');

const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');
let startDeviation = 25;
let DEVIATION = 25;
let MinDEVIATION = 15;
let minOffsetX = 0;
let minOffsetY = 0;
let minScale = 0;
let difference = 5;
let offsetY = 0;
let offsetX = 0;

let color1 = 'black';
let color2 = 'red';


let OPTIONS = {
    full:true,
    ping:1000
}

document.getElementById('color1').addEventListener('change', function (){
    let color = document.getElementById('color1').value;
    color1 = color;
})
document.getElementById('color1_1').addEventListener('change', function (){
    let color = document.getElementById('color1_1').value;
    color1 = color;
    drawGraphic1()
})
document.getElementById('color2').addEventListener('change', function (){
    let color = document.getElementById('color2').value;
    color2 = color;
})
document.getElementById('color2_2').addEventListener('change', function (){
    let color = document.getElementById('color2_2').value;
    color2 = color;
    drawGraphic2();
})
const message = document.getElementById("notification");  

canvas.addEventListener("click", (event) => {  
    const mouseX = event.offsetX;  
    const mouseY = event.offsetY;  
    console.log(mouseX)
    const diffY = mouseY - canvasHeight/2
    let data = [];
    let distance = '';
    const convert1 = data1.map(point => {
        const key = Object.keys(point)[0];
        const value = point[key];
        return {[(key * DEVIATION) + canvasWidth/2 ]: ((value * DEVIATION) + canvasHeight/2 )};
    });
    convert1.forEach(point => {
        data.push(point);
    })
    const convert2 = data2.map(point => {
        const key = Object.keys(point)[0];
        const value = point[key];
        return {[(key * DEVIATION) + canvasWidth/2 ]: ((value * DEVIATION) + canvasHeight/2 )};
    });
    convert2.forEach(point => {
        data.push(point);
    })
    data.some(point => {
        const [x, y] = Object.entries(point)[0];
        console.log(Number(x), y);
        distance = Math.sqrt((mouseX - x) ** 2 + ((canvasHeight/2 - diffY) - y) ** 2);
        if (distance < 5) {  
            let convertX = (x - canvasWidth/2) / DEVIATION;
            let convertY = -(canvasHeight/2 - y) / DEVIATION;
            console.log(`Координаты точки: (${x}, ${y})`);  
            message.innerText = `Координаты точки: (${convertX}, ${convertY})`;
            message.style.top = `${mouseY}px`;
            message.style.left = `${mouseX}px`;
            message.classList.add("show");
            setTimeout(() => {
                message.classList.remove("show");
            }, 3000); 
            return true;
        } else {
            console.log('not near'); 
        }
    })
});

let data1 = []
document.getElementById("add1").addEventListener("click", function() {
    let key = document.getElementById("key1").value;
    let value = document.getElementById("value1").value;
    let newItem = {};
    newItem[key] = parseInt(value);
    data1.push(newItem);
    document.getElementById("key1").value = '';
    document.getElementById("value1").value = '';
    renderList1();
    drawPoint1();
});


let data2 = []
document.getElementById("add2").addEventListener("click", function() {
    let key = document.getElementById("key2").value;
    let value = document.getElementById("value2").value;
    let newItem = {};
    newItem[key] = parseInt(value);
    data2.push(newItem);
    document.getElementById("key2").value = '';
    document.getElementById("value2").value = '';
    renderList2();
    drawPoint2();
});



const drawAxes = () => {
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo((canvas.width / 2)-offsetX, 0);
    ctx.lineTo((canvas.width / 2)-offsetX, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, (canvas.height / 2)-offsetY);
    ctx.lineTo(canvas.width, (canvas.height / 2)-offsetY);
    ctx.stroke();
}
const labelAxes = () => {
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    let value = 1
    for (let y = canvasHeight/2 + DEVIATION; y < (canvas.height + DEVIATION)*3; y += DEVIATION) {
            ctx.fillText(value.toString(), (canvas.width / 2 + 7)-offsetX, y-offsetY);
            value += 1;
    }
    value = 1
    for (let y = canvasHeight/2 - DEVIATION; y > -(canvasHeight)*3; y -= DEVIATION) {
            ctx.fillText(value.toString(), (canvas.width / 2 + 7)-offsetX, y-offsetY);
            value += 1;
    }

    value = 1
    for (let x = canvasWidth/2 + DEVIATION; x < canvas.width*5 ; x += DEVIATION) {
            ctx.fillText(value.toString(), x-offsetX, (canvas.height / 2 + 10)-offsetY);
            value += 1;

    }
    value = 1
    for (let x = canvasWidth/2 - DEVIATION; x > -(canvasWidth*5); x -= DEVIATION) {
            ctx.fillText(value.toString(), x-offsetX, (canvas.height / 2 + 10)-offsetY);
            value += 1;
    }
}
const drawAxesMin = () => {
    minCtx.lineWidth = 1;

    minCtx.beginPath();
    minCtx.moveTo((minWidth / 2), 0);
    minCtx.lineTo((minWidth / 2), minHeight);
    minCtx.stroke();

    minCtx.beginPath();
    minCtx.moveTo(0, (minHeight / 2));
    minCtx.lineTo(minWidth, (minHeight / 2));
    minCtx.stroke();
}
const labelAxesMin = () => {
    minCtx.fillStyle = 'black';
    minCtx.font = '10px Arial';
    minCtx.textAlign = 'center';

    let value = 0
    for (let y = minHeight/2 + MinDEVIATION; y < (minHeight + MinDEVIATION)*3; y += MinDEVIATION) {
        value += 5;
        minCtx.fillText(value.toString(), (minWidth / 2 + 7), y);
    }
    value = 0
    for (let y = minHeight/2 - MinDEVIATION; y > -(minHeight)*3; y -= MinDEVIATION) {
        value += 5;
        minCtx.fillText(value.toString(), (minWidth / 2 + 7), y);
    }

    value = 0
    for (let x = minWidth/2 + MinDEVIATION; x < minWidth*5 ; x += MinDEVIATION) {
        value += 5;
        minCtx.fillText(value.toString(), x, (minHeight / 2 + 10));
    }
    value = 0
    for (let x = minWidth/2 - MinDEVIATION; x > -(minWidth*5); x -= MinDEVIATION) {
        value += 5;
        minCtx.fillText(value.toString(), x, (minHeight / 2 + 10));
    }
}


const drawPoint1 = () => {
   
    const convert1 = data1.map(point => {
        const key = Object.keys(point)[0];
        const value = point[key];
        return {[((key * DEVIATION) + canvasWidth/2) ]: ((value * DEVIATION) + canvasHeight/2 )};
    });
    let points = []
    convert1.map((point) => {
        const [key, value] = Object.entries(point)[0]
        const diffY = value - canvasHeight/2
        const current = [Number(key), canvasHeight/2 - diffY];
        points.push(current);
        ctx.fillRect((Number(key) - 1)-offsetX , (canvasHeight/2 - diffY)-offsetY, 3, 3)
    })
    return points;
}

const drawGraphic1 = () => {
    let points = drawPoint1();
    if (points.length !== 0){
        ctx.strokeStyle = color1; 
        ctx.beginPath();
        ctx.moveTo(points[0][0]-offsetX, points[0][1]-offsetY);
        for (let i = 1; i < points.length; i++) {
            setTimeout(() => {
                ctx.lineTo((points[i][0] + 1)-offsetX , (points[i][1] + 2)-offsetY);
                ctx.stroke();
            }, i * OPTIONS.ping)
        }
    }
}
const drawPoint2 = () => {
    const convert2 = data2.map(point => {
        const key = Object.keys(point)[0];
        const value = point[key];
        return {[(key * DEVIATION) + canvasWidth/2 - 2]: ((value * DEVIATION) + canvasHeight/2 - 2)};
    });
    let points = []
    convert2.map((point) => {
        const [key, value] = Object.entries(point)[0]
        const diffY = value - canvasHeight/2
        const current = [Number(key), canvasHeight/2 - diffY];
        points.push(current);
        ctx.fillRect((Number(key) - 1)-offsetX , (canvasHeight/2 - diffY)-offsetY, 3, 3)
    })
    return points;
}

const drawGraphic2 = () => {
    let points = drawPoint2();
    if (points.length !== 0){
        ctx.strokeStyle = color2; 
        ctx.beginPath();
        ctx.moveTo(points[0][0]-offsetX, points[0][1]-offsetY);
        for (let i = 1; i < points.length; i++) {
            setTimeout(() => {
                ctx.lineTo((points[i][0] + 1)-offsetX , (points[i][1] + 2)-offsetY);
                ctx.stroke();
            }, i * OPTIONS.ping)
        }
    }
}
const eraseGraphic1 = () => {
    OPTIONS.ping = 0
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic2();
    OPTIONS.ping = 1000
    OPTIONS.full = true;
}
const eraseGraphic2 = () => {
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1()
    OPTIONS.ping = 1000;
    OPTIONS.full = true;
}
const  renderList1 = () => {
    list1.innerHTML = ''; 
    let current = [];
    let index = 1
    data1.map((obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        let li = `| x${index} : ${key}  y${index} : ${value} |`
        current.push(li);
        index += 1;
    });
    list1.innerHTML = current;
}
const renderList2 = () => {
    list2.innerHTML = ''; 
    let current = [];
    let index = 1
    data2.map((obj) => {
        const key = Object.keys(obj)[0];
        const value = obj[key];
        let li = `| x${index} : ${key}  y${index} : ${value} |`
        current.push(li);
        index += 1;
    });
    list2.innerHTML = current;
}
const erase = (arg) => {
    if (arg === undefined){
        arg = OPTIONS;
    }
    ctx.clearRect(0, 0, canvasHeight, canvasWidth)
    ctx.strokeStyle = 'black';
    if (arg.full === true){
        data1 = [];
        data2 = [];
        renderList1();
        renderList2();
    }
    drawAxes();
    labelAxes();
}
const eraseMin = () => {
    minCtx.clearRect(0, 0, minHeight, minWidth)
    minCtx.strokeStyle = 'black';
    drawAxesMin();
    labelAxesMin();
}
const area = () => {
    minCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    minCtx.fillRect((minWidth/2)-MinDEVIATION -minOffsetX-3-minScale, (minHeight/2)-MinDEVIATION - minOffsetY-3-minScale, MinDEVIATION*2+6+(minScale*2), MinDEVIATION*2+6+(minScale*2));
}
const addScale = () => {
    DEVIATION += 5;
    minScale -= 5;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    setTimeout(() => {
        drawGraphic2();
    }, 0)
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    eraseMin();
    area();
}
const downScale = () => {
    if (DEVIATION !== 15){
        DEVIATION -= 5;
        minScale += 5;
        OPTIONS.ping = 0;
        OPTIONS.full = false;
        erase(OPTIONS);
        drawGraphic1();
        setTimeout(() => {
            drawGraphic2();
        }, 0)
        OPTIONS.ping = 0;
        OPTIONS.full = false;
        eraseMin();
        area();
    }
}
const down = () => {
    offsetY += 50;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    setTimeout(() => {
        drawGraphic2();
    }, 0)
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    minOffsetY += -(MinDEVIATION / difference);
    eraseMin();
    area();
}
const up = () => {
    offsetY -= 50;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    setTimeout(() => {
        drawGraphic2();
    }, 0)
    OPTIONS.ping = 0;
    OPTIONS.full = false;

    minOffsetY += (MinDEVIATION / difference);
    eraseMin();
    area();
}
const left = () => {
    offsetX -= 50;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    setTimeout(() => {
        drawGraphic2();
    }, 0)
    OPTIONS.ping = 0;
    OPTIONS.full = false;

    minOffsetX += (MinDEVIATION / difference)- (startDeviation-DEVIATION)/4.5;
    eraseMin();
    area();
}
const right = () => {
    offsetX += 50;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    setTimeout(() => {
        drawGraphic2();
    }, 0)
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    minOffsetX += (-(MinDEVIATION / difference))- (startDeviation-DEVIATION)/4.5;
    console.log(minOffsetX)
    eraseMin()
    area();
}
const generateRandomNumberPairs = () => {
    const min = -10;
    const max = 10;
    const result = [];
    for (let i = 0; i < 3; i++) {
        const randomNumber1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const randomNumber2 = Math.floor(Math.random() * (max - min + 1)) + min;
        const numberPair = [randomNumber1, randomNumber2];
        result.push(numberPair);
    }
    return result;
}
const generate = () => {
    OPTIONS.full = true;
    erase(OPTIONS);
    const graph1 = generateRandomNumberPairs();
    const graph2 = generateRandomNumberPairs();
    graph1.map((pair) => {
        let key = pair[0];
        let value = pair[1];
        let newItem = {};
        newItem[key] = parseInt(value);
        data1.push(newItem);
        renderList1();
        drawPoint1();
    })
    drawGraphic1();
    setTimeout(() => {
        graph2.map((pair) => {
            let key = pair[0];
            let value = pair[1];
            let newItem = {};
            newItem[key] = parseInt(value);
            data2.push(newItem);
            renderList2();
            drawPoint2();
        })
        drawGraphic2();
    },3000)
    OPTIONS.full = false;
}






drawAxes();
labelAxes();
drawAxesMin();
labelAxesMin();
area();


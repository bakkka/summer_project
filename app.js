// Получаем canvas элемент
let canvas = document.getElementById('canvas');

// Указываем элемент для 2D рисования
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const thumbnailCanvas = document.getElementById('thumbnailCanvas');
let minHeight = thumbnailCanvas.height;
let minWidth = thumbnailCanvas.width;
const minCtx = thumbnailCanvas.getContext('2d');

const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');
let DEVIATION = 50;
let MinDEVIATION = 15;
let minOffsetX = 0;
let minOffsetY = 0;
let minScale = 0;
let difference = 5;
let offsetY = 0;
let offsetX = 0;

let color1 = '';
let color2 = '';


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
const message = document.getElementById("notification");  // Получаем элемент сообщения

canvas.addEventListener("click", (event) => {  // Вешаем обработчик события "mouseover"
    const mouseX = event.offsetX;  // Получаем координату X мыши относительно холста
    const mouseY = event.offsetY;  // Получаем координату Y мыши относительно холста
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
        if (distance < 5) {  // Проверяем, находится ли мышь рядом с точкой (10 - это радиус области вокруг точки, в которой будет показываться сообщение)
            let convertX = (x - canvasWidth/2) / DEVIATION;
            let convertY = -(canvasHeight/2 - y) / DEVIATION;
            console.log(`Координаты точки: (${x}, ${y})`);  // Показываем сообщение с координатами точки
            message.innerText = `Координаты точки: (${convertX}, ${convertY})`;
            message.style.top = `${mouseY}px`;
            message.style.left = `${mouseX}px`;
            message.classList.add("show");
            setTimeout(() => {
                message.classList.remove("show");
            }, 3000); //Можно задать время исчезновения уведомления
            return true;
        } else {
            console.log('not near');  // Если мышь не находится рядом с точкой, то сообщение очищаем
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

    // Подписываем вертикальную ось
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

    // Подписываем горизонтальную ось
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

    // Подписываем вертикальную ось
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

    // Подписываем горизонтальную ось
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
    // if (data1.length === 0){
    //     data1 = [
    //         {'1':3},
    //         {'3':9},
    //         {'8':12},
    //         {'10':4}
    //     ]
    // }
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
        ctx.strokeStyle = color1; // устанавливаем цвет линии, например - красный
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
        ctx.strokeStyle = color2; // устанавливаем цвет линии, например - красный
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
    list1.innerHTML = ''; // очищаем список перед рендерингом
    let current = [];
    // проходим по всем объектам в массиве и добавляем их в список
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
    list2.innerHTML = ''; // очищаем список перед рендерингом
    let current = [];
    // проходим по всем объектам в массиве и добавляем их в список
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
    minCtx.fillRect((minWidth/2)-MinDEVIATION - minOffsetX-3-minScale, (minHeight/2)-MinDEVIATION - minOffsetY-3-minScale, MinDEVIATION*2+6+(minScale*2), MinDEVIATION*2+6+(minScale*2));
}
const addScale = () => {
    DEVIATION += 5;
    minScale -= 5;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    drawGraphic2();
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
        drawGraphic2();
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
    drawGraphic2();
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
    drawGraphic2();
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
    drawGraphic2();
    OPTIONS.ping = 0;
    OPTIONS.full = false;

    minOffsetX += (MinDEVIATION / difference);
    eraseMin();
    area();
}
const right = () => {
    offsetX += 50;
    OPTIONS.ping = 0;
    OPTIONS.full = false;
    erase(OPTIONS);
    drawGraphic1();
    drawGraphic2();
    OPTIONS.ping = 0;
    OPTIONS.full = false;

    minOffsetX += -(MinDEVIATION / difference);
    console.log(minOffsetX)
    eraseMin()
    area();
}

// Функция для обновления миниатюры
function updateThumbnail() {
    // Измените размеры миниатюры в соответствии с соотношением сторон основного полотна
    thumbnailCanvas.width = 300;
    thumbnailCanvas.height = 300;

    // Копирование содержимого основного полотна на миниатюру с изменением размера
    minCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);
}


// Обновление миниатюры после рисования на основном полотне





drawAxes();
labelAxes();
drawAxesMin();
labelAxesMin();
area();


// Получаем canvas элемент
let canvas = document.getElementById('canvas');

// Указываем элемент для 2D рисования
let ctx = canvas.getContext('2d');
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');

let color1 = '';
let color2 = '';

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
        return {[(key * 20) + canvasWidth/2 ]: ((value * 20) + canvasHeight/2 )};
    });
    convert1.forEach(point => {
        data.push(point);
    })
    const convert2 = data2.map(point => {
        const key = Object.keys(point)[0];
        const value = point[key];
        return {[(key * 20) + canvasWidth/2 ]: ((value * 20) + canvasHeight/2 )};
    });
    convert2.forEach(point => {
        data.push(point);
    })
    data.some(point => {
        const [x, y] = Object.entries(point)[0];
        console.log(Number(x), y);
        distance = Math.sqrt((mouseX - x) ** 2 + ((canvasHeight/2 - diffY) - y) ** 2);
        if (distance < 5) {  // Проверяем, находится ли мышь рядом с точкой (10 - это радиус области вокруг точки, в которой будет показываться сообщение)
            let convertX = (x - canvasWidth/2) / 20;
            let convertY = -(canvasHeight/2 - y) / 20;
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
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
}

const labelAxes = () => {
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    // Подписываем вертикальную ось
    let value = 1
    for (let y = canvasHeight/2 + 20; y < canvas.height + 20; y += 20) {
            ctx.fillText(value.toString(), canvas.width / 2 + 7, y);
            value += 1;
    }
    value = 1
    for (let y = canvasHeight/2 - 20; y > -40; y -= 20) {
        ctx.fillText(value.toString(), canvas.width / 2 + 7, y);
        value += 1;
    }

    // Подписываем горизонтальную ось
    value = 1
    for (let x = canvasWidth/2 + 20; x < canvas.width ; x += 20) {
            ctx.fillText(value.toString(), x, canvas.height / 2 + 10);
            value += 1;

    }
    value = 1
    for (let x = canvasWidth/2 - 20; x > 0; x -= 20) {
        ctx.fillText(value.toString(), x, canvas.height / 2 + 10);
        value += 1;
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
        return {[(key * 20) + canvasWidth/2 ]: ((value * 20) + canvasHeight/2 )};
    });
    let points = []
    convert1.map((point) => {
        const [key, value] = Object.entries(point)[0]
        const diffY = value - canvasHeight/2
        const current = [Number(key), canvasHeight/2 - diffY];
        points.push(current);
        ctx.fillRect(Number(key) - 1 , canvasHeight/2 - diffY, 3, 3)
    })
    return points;
}

const drawGraphic1 = () => {
    let points = drawPoint1();
    ctx.strokeStyle = color1; // устанавливаем цвет линии, например - красный
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        setTimeout(() => {
            ctx.lineTo((points[i][0] + 1) , (points[i][1] + 2));
            ctx.stroke();
        }, i * 1000)
    }
}
const drawPoint2 = () => {
    // if (data2.length === 0){
    //     data2 = [
    //         {'-1':3},
    //         {'-3':9},
    //         {'-8':12},
    //         {'-10':4}
    //     ]
    // }
    const convert2 = data2.map(point => {
        const key = Object.keys(point)[0];
        const value = point[key];
        return {[(key * 20) + canvasWidth/2 - 2]: ((value * 20) + canvasHeight/2 - 2)};
    });
    let points = []
    convert2.map((point) => {
        const [key, value] = Object.entries(point)[0]
        const diffY = value - canvasHeight/2
        const current = [Number(key), canvasHeight/2 - diffY];
        points.push(current);
        ctx.fillRect(Number(key) - 1 , canvasHeight/2 - diffY, 3, 3)
    })
    return points;
}

const drawGraphic2 = () => {
    let points = drawPoint2();
    console.log(points)
    ctx.strokeStyle = color2; // устанавливаем цвет линии, например - красный
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        setTimeout(() => {
            ctx.lineTo((points[i][0] + 1) , (points[i][1] + 2));
            ctx.stroke();
        }, i * 1000)
    }
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
const erase = () => {
    let points = drawPoint1();
    ctx.strokeStyle = 'white'; // устанавливаем цвет линии, например - красный
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        setTimeout(() => {
            ctx.lineTo((points[i][0] + 1) , (points[i][1] + 2));
            ctx.stroke();
        }, i * 1000)
    }
}
drawAxes();
labelAxes();


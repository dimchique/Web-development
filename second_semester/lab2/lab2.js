function calculate(data) {
    let a = data.osn1.value;
    let b = data.osn2.value;
    let h = data.height ? data.height.value : "";
    let s = data.side ? data.side.value : "";
    let output = document.getElementById('output');
    let find = document.getElementById('find');
    output.innerHTML = "<p>Результат:</p>";

    if (Number(a) <= 0 || isNaN(a)) {
        data.osn1.classList.add("error");
    }

    if (Number(b) <= 0 || isNaN(b)) {
        data.osn2.classList.add("error");
    }

    let osn1 = document.getElementById('osn1');
    osn1.onfocus = function () {
        this.classList.remove('error');
    };
    let osn2 = document.getElementById('osn2');
    osn2.onfocus = function () {
        this.classList.remove('error');
    };

    if (data.height) {
        if (Number(h) <= 0 || isNaN(h)) {
            data.height.classList.add("error");
        }
        let height = document.getElementById('height');
        height.onfocus = function () {
            this.classList.remove('error');
        };
    }

    if (data.side) {
        if (Number(s) <= 0 || isNaN(s)) {
            data.side.classList.add("error");
        }
        let side = document.getElementById('side');
        side.onfocus = function () {
            this.classList.remove('error');
        };
    }

    if (data.task1.checked) {
        if (h) {
            if ((a > 0) && (b > 0) && (h > 0)){
            let newElement = document.createElement('p');
            newElement.innerHTML = `H = ${Math.round(h * 1000) / 1000}`;
            output.appendChild(newElement);
            }
        } else {
            if ((a > 0) && (b > 0) && (s > 0)){
            let h = (0.5 * Math.sqrt(4*s**2 - (b-a)**2));
            let newElement = document.createElement('p');
            newElement.innerHTML = `H = ${Math.round(h * 1000) / 1000}`;
            output.appendChild(newElement);
            }
        }
    }

    if (data.task2.checked) {
        if (h){
            if ((a > 0) && (b > 0) && (h > 0)){
            let c = Math.sqrt((b-a)**2+h**2);
            let p = (a*1 + b*1 + 2*c);
            let newElement = document.createElement('p');
            newElement.innerHTML = `P = ${Math.round(p * 1000) / 1000}`;
            output.appendChild(newElement);
            }
        } else {
            if ((a > 0) && (b > 0) && (s > 0)){
            let p = (a*1 + b*1 + 2*s);
            let newElement = document.createElement('p');
            newElement.innerHTML = `P = ${Math.round(p * 1000) / 1000}`;
            output.appendChild(newElement);
            }
        }
    }

    if (data.task3.checked) {
        if (h){
            if ((a > 0) && (b > 0) && (h > 0)){
            let m = (a*1+b*1)/2;
            let d = (Math.sqrt(h**2 + m**2));
            let newElement = document.createElement('p');
            newElement.innerHTML = `d1, d2 = ${Math.round(d * 1000) / 1000}`;
            output.appendChild(newElement);
            }
        } else {
            if ((a > 0) && (b > 0) && (s > 0)){
            let d = (Math.sqrt(s**2 + a*b));
            let newElement = document.createElement('p');
            newElement.innerHTML = `d1, d2 = ${Math.round(d * 1000) / 1000}`;
            output.appendChild(newElement);
            }
        }
    }

    if (!data.task1.checked && !data.task2.checked && !data.task3.checked) {
        find.classList.add("redText");
    } else {
        find.classList.remove("redText");
    }
    return true;
}

function clearData(data) {
    data.osn1.value = "";
    data.osn2.value = "";
    if (data.height){
        data.height.value = "";
    }
    if (data.side){
        data.side.value = "";
    }
    data.task1.checked = false;
    data.task2.checked = false;
    data.task3.checked = false;
    let output = document.getElementById('output');
    output.innerHTML = "";
}

function clearResult(data) {
    let inputFields = document.querySelectorAll('input[type="number"]');
    inputFields.forEach(function (input) {
        input.addEventListener('click', function () {
            let output = document.getElementById('output');
            output.innerHTML = "";
        });
    });
}

function showInputs(data) {
    let input = document.getElementById('chooseInputData');
    input.innerHTML = ``;
    let inputPic = document.getElementById('inputImg');
    if (data.start1.checked) {
        inputPic.innerHTML = "";
        input.innerHTML = `<p>Входные данные:</p>`;
        let osn1 = document.createElement('p');
        let osn2 = document.createElement('p');
        osn1.innerHTML = `<label><input type="number" id="osn1" min=0 max=200> основание a</label>`;
        osn2.innerHTML = `<label><input type="number" id="osn2" min=0 max=200> основание b</label>`;
        input.appendChild(osn1);
        input.appendChild(osn2);
        let pic = document.createElement('img');
        pic.setAttribute('src', 'pict1.png')
        pic.setAttribute('width', '400px')
        let side = document.createElement('p');
        side.innerHTML = `<label><input type="number" id="side" min=0 max=200> боковая сторона c</label>`;
        input.appendChild(side);
        inputPic.prepend(pic)
    }
    if (data.start2.checked) {
        inputPic.innerHTML = "";
        input.innerHTML = `<p>Входные данные:</p>`;
        let osn1 = document.createElement('p');
        let osn2 = document.createElement('p');
        osn1.innerHTML = `<label><input type="number" id="osn1" min=0 max=200> основание a</label>`;
        osn2.innerHTML = `<label><input type="number" id="osn2" min=0 max=200> основание b</label>`;
        input.appendChild(osn1);
        input.appendChild(osn2);
        let pic = document.createElement('img');
        pic.setAttribute('src', 'pict2.png')
        pic.setAttribute('width', '400px')
        let height = document.createElement('p');
        height.innerHTML = `<label><input type="number" id="height" min=0 max=200> высота h</label>`;
        input.appendChild(height);
        inputPic.prepend(pic)
    }
}
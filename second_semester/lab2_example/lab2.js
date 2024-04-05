function calculate(data) {
    let h = data.input1.value;
    let a = data.input2.value;
    let output = document.getElementById('output');
    let find = document.getElementById('find');
    output.innerHTML = "<p>Результат:</p>";
    if (Number(h) <= 0 || isNaN(h)) {
    data.input1.classList.add("error");
    return false;
    }
    let input1 = document.getElementById('input1');
    input1.onfocus = function() {
     this.classList.remove('error');
    };
    if (Number(a) <= 0 || isNaN(a)) {
        data.input2.classList.add("error");
        return false;
        }
    let input2 = document.getElementById('input2');
    input2.onfocus = function() {
    this.classList.remove('error');
    };
    if (data.task1.checked) {
        let s = (a ** 2 * Math.sqrt(3) / 4) + (3 * a / 2 * Math.sqrt(h ** 2 + a ** 2 / 12));
        let newElement1 = document.createElement('p');
        newElement1.innerHTML = "S = " + Math.round(s * 1000) / 1000;
        output.appendChild(newElement1);
        }
    if (data.task2.checked) {
        let v = ((a ** 2 * h) / (4 *Math.sqrt(3)))
        let newElement2 = document.createElement('p');
        newElement2.innerHTML = "V = " + Math.round(v * 1000) / 1000;
        output.appendChild(newElement2);
        }
    if (!data.task1.checked && !data.task2.checked) {
        find.classList.add("redText");
    } else {
        find.classList.remove("redText"); 
    }
    return true;
}



function clearData(data) {
    data.input1.value = "";
    data.input2.value = "";
    data.task1.checked = false;
    data.task2.checked = false;
    let output = document.getElementById('output');
    output.innerHTML = "";
}



function clearResult(data){
    let inputFields = document.querySelectorAll('input[type="number"]');
    inputFields.forEach(function(input) {
        input.addEventListener('click', function() {
            let output = document.getElementById('output');
            output.innerHTML = "";
        });
    });
}


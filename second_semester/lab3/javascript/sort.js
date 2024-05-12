let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    let tr = document.createElement('tr');
    for (key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);
    data.forEach((item) => {
        let row = document.createElement('tr');
        for (key in item) {
            let cell = document.createElement('td');
            cell.innerHTML = item[key];
            row.appendChild(cell);
        }
        table.appendChild(row);
    });
}

let correspond = {
    'Имя персонажа': 'name',
    'Атрибут': 'attribute',
    'Количество здоровья': ["hpFrom", "hpTo"],
    'Количество маны': ["manaFrom", "manaTo"],
    'Атака': ["attackFrom", "attackTo"],
    'Задержка перед атакой': ["delayFrom", "delayTo"],
    'Дальность атаки': ["rangeFrom", "rangeTo"] ,
    'Скорость передвижения': ["msFrom", "msTo"],
    'Броня': ["armorFrom", "armorTo"],
    'Тип атаки': 'attackType'
}

let dataFilter = (dataForm) => {
    let dictFilter = {};
    for (let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        let valInput = item.value;
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type == "number") {
            if (valInput !== "") {
                valInput = parseFloat(valInput);
            } else {
                if (item.id.includes("From")) {
                    valInput = Number.NEGATIVE_INFINITY;
                } else if (item.id.includes("To")) {
                    valInput = Number.POSITIVE_INFINITY;
                }
            }
        }
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
}

let removeAllRows = (idTable) => {
    let table = document.getElementById(idTable);
    if (table) {
        while (table.rows.length > 0) {
            table.deleteRow(-1);
        }
    }
}

let filterTable = (data, idTable, dataForm) => {
    let datafilter = dataFilter(dataForm);
    let tableFilter = data.filter(item => {
        let result = true;
        for (let key in item) {
            let val = item[key];
            if (isNaN(Number(val))) {
                val = item[key].toLowerCase()
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1
            }
            if (!isNaN(Number(val))) {
                val = Number(val)
                result &&= (val >= datafilter[correspond[key][0]] && val <= datafilter[correspond[key][1]]) 
            }
        }
        return result;
    });
    removeAllRows(idTable);
    createTable(tableFilter, idTable);
}

let clearFilter = (idTable, formData) => {
    let formElements = formData.elements;
    for (let i = 0; i < formElements.length; i++) {
        let element = formElements[i];
        if (element.type === 'text' || element.type === 'number') {
            element.value = '';
        }
    }
    removeAllRows(idTable);
    createTable(heroes, 'list');
}

///
let selectedOptions = {}

let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

let setSortSelect = (head, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    for (let i in head) {
        let option = createOption(head[i], Number(i) + 1)
        sortSelect.append(option);
        selectedOptions[option.value] = false
    }
}

let setSortSelects = (data, dataForm) => {
    let head = Object.keys(data);
    let allSelect = dataForm.getElementsByTagName('select');
    for (let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);
        if (j != 0) {
            allSelect[j].disabled = true;
        }
    }
}

let changeNextSelect = (nextSelectId, curSelect) => {

    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    selectedOptions[curSelect.oldValue] = false
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
        selectedOptions[curSelect.value] = true
        for (let key in selectedOptions) {
            if (selectedOptions[key]) {
                let options = nextSelect.options
                for (let index = 0; index < options.length; index++) {
                    if (options[index].value == key) {
                        nextSelect.remove(index)
                    }
                }
            }
        }
    } else {
        let allSelect = document.getElementById('sort').getElementsByTagName('select');
        let allSelectArray = Array.from(allSelect)
        for (let j = allSelectArray.indexOf(curSelect); j < allSelect.length; j++) {
            selectedOptions[allSelect[j].oldValue] = false
            allSelect[j].value = 0
            if (j != allSelectArray.indexOf(curSelect)) {
                allSelect[j].disabled = true
            }

        }
    }
    curSelect.oldValue = curSelect.value
}

let createSortArr = (data) => {
    let sortArr = [];
    let sortSelects = data.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {
        let keySort = sortSelects[i].value;
        if (keySort == 0) {
            break;
        }
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push({ column: keySort - 1, order: desc });
    }
    return sortArr;
};


let sortTable = (idTable, data) => {
    let sortArr = createSortArr(data);
    if (sortArr.length === 0) {
        return false;
    }
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    rowData.shift();
    rowData.sort((first, second) => {
        for (let i = 0; i < sortArr.length; i++) {
            let key = sortArr[i].column;
            let order = sortArr[i].order;
            if (order) {
                if (key == 3) {
                    if (Number(first.cells[key].innerHTML) < Number(second.cells[key].innerHTML)) {
                        return 1;
                    } else if (Number(first.cells[key].innerHTML) > Number(second.cells[key].innerHTML)) {
                        return -1;
                    }
                } else {
                    if (first.cells[key].innerHTML < second.cells[key].innerHTML) {
                        return 1;
                    } else if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                        return -1;
                    }
                }
            } else {
                if (key == 3) {
                    if (Number(first.cells[key].innerHTML) > Number(second.cells[key].innerHTML)) {
                        return 1;
                    } else if (Number(first.cells[key].innerHTML) < Number(second.cells[key].innerHTML)) {
                        return -1;
                    }
                } else {
                    if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                        return 1;
                    } else if (first.cells[key].innerHTML < second.cells[key].innerHTML) {
                        return -1;
                    }
                }
            }

        }
        return 0;
    });
    table.innerHTML = table.rows[0].innerHTML;
    rowData.forEach(item => {
        table.append(item);
    });
}

function resetSort(idTable) {
    removeAllRows(idTable)
    createTable(heroes, 'list');
    for (let key in selectedOptions) {
        selectedOptions[key] = false
    }
    let allSelect = document.getElementById('sort').getElementsByTagName('select');
    for (let j = 0; j < allSelect.length; j++) {
        if (j != 0) {
            allSelect[j].disabled = true
        }
        allSelect[j].value = 0
    }
}

document.addEventListener("DOMContentLoaded", function () {
    createTable(heroes, 'list');
    let sortForm = document.getElementById('sort');
    setSortSelects(heroes[0], sortForm);
    let findButton = document.getElementById('find');
    findButton.addEventListener('click', function () {
        let dataForm = document.getElementById('filter');
        filterTable(heroes, 'list', dataForm);
        // let formData = document.getElementById('sort');
        // resetSort('list', formData);
    });
    let clearButton = document.getElementById('clearFilters');
    clearButton.addEventListener('click', function () {
        let formData = document.getElementById('filter');
        clearFilter('list', formData);
        // let dataForm = document.getElementById('sort');
        // resetSort('list', dataForm);
    });

    document.getElementById('fieldsFirst').onchange = () => {
        changeNextSelect('fieldsSecond', document.getElementById('fieldsFirst'))
        if (document.getElementById('fieldsFirst').value==0) {
            resetSort('list')
        }
    }

    document.getElementById('fieldsSecond').onchange = () => {
        changeNextSelect('fieldsThird', document.getElementById('fieldsSecond'))
        if (document.getElementById('fieldsSecond').value==0) {
            resetSort('list')
        }
    }

    let sortbutton = document.getElementById('sortbutton');
    sortbutton.addEventListener('click', function () {
        let formData = document.getElementById('sort');
        sortTable('list', formData)
    });

    let resetButton = document.getElementById('resetsort');
    resetButton.addEventListener('click', function () {
        resetSort('list');
    });
})
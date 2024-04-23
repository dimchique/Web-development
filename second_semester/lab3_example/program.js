//выводим таблицу на страницу
let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    let tr = document.createElement('tr');
    for (key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);
    // самостоятельно сформировать строки таблицы на основе массива data
    data.forEach((item) => {
        // создать новую строку таблицы tr
        let row = document.createElement('tr');
        // перебрать ключи очередного элемента массива
        for (key in item) {
            // создать элемент td
            let cell = document.createElement('td');
            // занести в него соответствующее значение из массива
            cell.innerHTML = item[key];
            // добавить элемент td к строке
            row.appendChild(cell);
        }
        // строку добавить в таблицу
        table.appendChild(row);
    });
}


let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

let dataFilter = (dataForm) => {

    let dictFilter = {};
    // перебираем все элементы формы с фильтрами

    for (let j = 0; j < dataForm.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = dataForm.elements[j];

        // получаем значение элемента
        let valInput = item.value;
        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type == "number") {
            // Если значение числового поля не пустое, преобразовать его в число
            if (valInput !== "") {
                valInput = parseFloat(valInput);
            } else {
                // Если числовое поле пустое и его id содержит "From", присвоить значение бесконечности
                if (item.id.includes("From")) {
                    valInput = Number.NEGATIVE_INFINITY;
                    // Если числовое поле пустое и его id содержит "To", присвоить значение бесконечности с противоположным знаком
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
    // Находим таблицу по идентификатору
    let table = document.getElementById(idTable);
    // Проверяем, существует ли таблица
    if (table) {
        // Удаляем все строки таблицы, начиная с конца, чтобы не нарушать индексы
        while (table.rows.length > 0) {
            table.deleteRow(-1);
        }
    }
}

let filterTable = (data, idTable, dataForm) => {
    // Получаем данные из полей формы
    let datafilter = dataFilter(dataForm);

    // Выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {
        let result = true;

        // Строка соответствует фильтру, если сравнение всех значения из input
        // со значением ячейки очередной строки - истина
        for (let key in item) {
            let val = item[key];

            // Текстовые поля проверяем на вхождение
            if (typeof val === 'string') {
                val = item[key].toLowerCase();
                result &&= val.indexOf(datafilter[correspond[key]]) !== -1;
            } else if (Array.isArray(val)) {
                // Если значение является массивом (такие как Год и Высота)
                let [from, to] = val;
                let fromFilter = datafilter[correspond[key]][0];
                let toFilter = datafilter[correspond[key]][1];

                // Проверяем, входит ли значение из массива в заданный интервал
                result &&= (from >= fromFilter && to <= toFilter);
            }
        }
        return result;
    });

    // Удалить все строки таблицы с заданным идентификатором
    removeAllRows(idTable);

    // Показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);
}


let clearFilter = (idTable, formData) => {
    // Находим все элементы формы
    let formElements = formData.elements;

    // Проходимся по всем элементам формы
    for (let i = 0; i < formElements.length; i++) {
        let element = formElements[i];
        // Если элемент - текстовое поле или поле ввода числа, очищаем его значение
        if (element.type === 'text' || element.type === 'number') {
            element.value = '';
        }
    }
    // Очищаем таблицу отфильтрованных данных
    removeAllRows(idTable);
    createTable(buildings, 'list');
}







// формирование полей элемента списка с заданным текстом и значением
let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}
// формирование полей со списком из заголовков таблицы
// параметры – массив из заголовков таблицы и элемент select
let setSortSelect = (head, sortSelect) => {

    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));

    // перебираем все ключи переданного элемента массива данных
    for (let i in head) {
        // создаем OPTION из очередного ключа и добавляем в SELECT
        // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(head[i], Number(i) + 1));
    }
}
// формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => {
    // выделяем ключи словаря в массив
    let head = Object.keys(data);
    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName('select');

    for (let j = 0; j < allSelect.length; j++) {
        //формируем опции очередного SELECT
        setSortSelect(head, allSelect[j]);
        if (j !== 0) {
            allSelect[j].disabled = true;
        }
        //самостоятельно все SELECT, кроме первого, сделать неизменяемыми
    }
}


// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelectId, curSelect) => {

    let nextSelect = document.getElementById(nextSelectId);

    nextSelect.disabled = false;

    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;

    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}

/*формируем массив для сортировки по уровням вида:
 [
 {column: номер столбца,
 order: порядок сортировки (true по убыванию, false по возрастанию)
 },
 {column: номер столбца,
 order: порядок сортировки
 }
 ]
*/
let createSortArr = (data) => {
    let sortArr = [];

    let sortSelects = data.getElementsByTagName('select');

    for (let i = 0; i < sortSelects.length; i++) {

        // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push({ column: keySort - 1, order: desc });
    }
    return sortArr;
};


let sortTable = (idTable, data) => {
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }

    // находим нужную таблицу
    let table = document.getElementById(idTable);
    // преобразуем строки таблицы в массив
    let rowData = Array.from(table.rows);

    // удаляем элемент с заголовками таблицы
    rowData.shift();

    // сортируем данные
    rowData.sort((first, second) => {
        let sortSelects = data.getElementsByTagName('select');
        for (let i in sortArr) {
            let key = sortArr[i].column;
            let sortOrder = document.getElementById(sortSelects[i].id + 'Desc').checked ? -1 : 1;
            let comparison = first.cells[key].innerHTML.localeCompare(second.cells[key].innerHTML);
            if (comparison !== 0) {
                return sortOrder * comparison;
            }
        }
        return 0;
    });

    // очищаем текущую таблицу
    table.innerHTML = table.rows[0].innerHTML;

    // вставляем отсортированные строки обратно в таблицу
    rowData.forEach(item => {
        table.appendChild(item);
    });
}


let resetSort = (idTable, dataForm) => {
    // Восстанавливаем поля формы для сортировки
    dataForm.reset();

    removeAllRows(idTable);
    createTable(buildings, 'list');
    let secondSelect = document.getElementById('fieldsSecond'); // Замените 'fieldsSecond' на ID вашего второго select
    secondSelect.disabled = true;
}
    






document.addEventListener("DOMContentLoaded", function () {
    createTable(buildings, 'list');
    let sortForm = document.getElementById('sort');
    setSortSelects(buildings[0], sortForm);
    let findButton = document.getElementById('find');
    // Добавим обработчик события клика на кнопку "Найти"
    findButton.addEventListener('click', function () {
        // Получим данные формы для фильтрации
        let dataForm = document.getElementById('filter');
        // Вызовем функцию filterTable() с соответствующими параметрами
        filterTable(buildings, 'list', dataForm);
        let formData = document.getElementById('sort');
        resetSort('list', formData);
    });
    let clearButton = document.getElementById('clearFilters');
    clearButton.addEventListener('click', function () {
        // Получаем данные формы для фильтрации
        let formData = document.getElementById('filter');
        // Вызываем функцию clearFilter() с соответствующими параметрами
        clearFilter('list', formData);
        let dataForm = document.getElementById('sort');
        resetSort('list', dataForm);
    });
    let firstSelect = document.getElementById('fieldsFirst'); // Замените 'firstSelect' на ID вашего первого select
    firstSelect.addEventListener('change', function () {
        // Вызываем функцию changeNextSelect() с параметрами для второго уровня сортировки
        changeNextSelect('fieldsSecond', this); // Замените 'secondSelect' на ID вашего второго select
    });

    let sortbutton = document.getElementById('sortbutton');
    // Добавим обработчик события клика на кнопку "Найти"
    sortbutton.addEventListener('click', function () {
        //     // Получим данные формы для фильтрации
        let formData = document.getElementById('sort');
        sortTable('list', formData)
        //     // Вызовем функцию filterTable() с соответствующими параметрами
    });


    let resetButton = document.getElementById('resetsort');
    resetButton.addEventListener('click', function () {
        let formData = document.getElementById('sort');
        resetSort('list', formData);
    });
})
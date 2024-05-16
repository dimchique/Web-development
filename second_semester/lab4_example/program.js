//инициализация svg элемента
const width = 600;
const height = 600;
let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

function drawSmile() {
    let smile = svg.append("g").style("stroke", "brown").style("stroke-width", 2).style("fill", "brown");
    //лицо
    smile.append("circle").attr("cx", 0).attr("cy", 0).attr("r", 50).style("fill", "yellow");
    //левый глаз
    smile.append("circle").attr("cx", -20).attr("cy", -10).attr("r", 5);
    //правый глаз
    smile.append("circle").attr("cx", 20).attr("cy", -10).attr("r", 5);
    // улыбка
    let arc = d3.arc().innerRadius(35).outerRadius(35);
    smile.append("path").attr("d", arc({
        startAngle: Math.PI / 3 * 2,
        endAngle: Math.PI / 3 * 4
    })).style("stroke", "brown")
    return smile
}
let draw = (dataForm) => {
    let pict = drawSmile();
    pict.attr("transform", `translate(${dataForm.cxFrom.value}, ${dataForm.cyFrom.value}) scale(${dataForm.sxFrom.value}, ${dataForm.syFrom.value}) rotate(${dataForm.degreeFrom.value})`);
}

let makePict = document.getElementById("makePict");
makePict.addEventListener('click', function () {
    let formData = document.getElementById('setting');
    draw(formData);
});

let resetPict = document.getElementById("resetPict");
resetPict.addEventListener('click', function () {
    svg.selectAll('*').remove()
});

let spans = document.querySelectorAll('span');
let animationCheckbox = document.getElementById("animationEnabled");
let animPict = document.getElementById("animPict");
animationCheckbox.addEventListener('change', function () {

    if (animationCheckbox.checked) {
        spans.forEach(control => {
            control.style.display = 'inline';
            animPict.style.display = 'inline';
            makePict.style.display = 'none';
        });
    } else {
        spans.forEach(control => {
            control.style.display = 'none';
            animPict.style.display = 'none';
            makePict.style.display = 'inline';
        });
    }
});

let coordDiv = document.getElementById("coord")
let pathsDiv = document.getElementById("paths");
let scaleDiv = document.getElementById("scale");
let rotateDiv = document.getElementById("rotate");
let pathCheckbox = document.getElementById("pathEnabled");
pathCheckbox.addEventListener('change', function () {

    if (pathCheckbox.checked) {
        coordDiv.style.display = 'none';
        scaleDiv.style.display = 'none';
        rotateDiv.style.display = 'none';
        pathsDiv.style.display = 'inline';
    } else {
        coordDiv.style.display = 'inline';
        scaleDiv.style.display = 'inline';
        rotateDiv.style.display = 'inline';
        pathsDiv.style.display = 'none';
    }
});
let runAnimation = (dataForm) => {
    let pict = drawSmile();
    let selectedEase = dataForm.animationType.value;
    let selectedPath = dataForm.pathType.value;
    if ((selectedEase == "bounce") && !(pathCheckbox.checked)) {
        pict.transition().duration(6000).ease(d3.easeBounce).attr("transform", `translate(${dataForm.cxTo.value}, ${dataForm.cyTo.value}) scale(${dataForm.sxTo.value}, ${dataForm.syTo.value}) rotate(${dataForm.degreeTo.value})`);
    }
    if ((selectedEase == "linear") && !(pathCheckbox.checked)) {
        pict.transition().duration(6000).ease(d3.easeLinear).attr("transform", `translate(${dataForm.cxTo.value}, ${dataForm.cyTo.value}) scale(${dataForm.sxTo.value}, ${dataForm.syTo.value}) rotate(${dataForm.degreeTo.value})`);
    }
    if ((selectedEase == "elastic") && !(pathCheckbox.checked)) {
        pict.transition().duration(6000).ease(d3.easeElastic).attr("transform", `translate(${dataForm.cxTo.value}, ${dataForm.cyTo.value}) scale(${dataForm.sxTo.value}, ${dataForm.syTo.value}) rotate(${dataForm.degreeTo.value})`);
    }
    if ((selectedEase == "bounce") && (pathCheckbox.checked)) {
        let path = drawPath(selectedPath);
        pict.transition().ease(d3.easeBounce).duration(6000).attrTween('transform', translateAlong(path.node()));
    }
    if ((selectedEase == "linear") && (pathCheckbox.checked)) {
        let path = drawPath(selectedPath);
        pict.transition().ease(d3.easeLinear).duration(6000).attrTween('transform', translateAlong(path.node()));
    }
    if ((selectedEase == "elastic") && (pathCheckbox.checked)) {
        let path = drawPath(selectedPath);
        pict.transition().ease(d3.easeElastic).duration(6000).attrTween('transform', translateAlong(path.node()));
    }
}


animPict.addEventListener('click', function () {
    let formData = document.getElementById('setting');
    runAnimation(formData);
});

/* массив точек пути будет иметь следующий вид:
 [
 {x: координата, y: координата},
 {x: координата, y: координата},
 ...
 ]
*/
// создаем массив точек, расположенных буквой "Г"
function createPathG() {
    let data = [];
    const padding = 100;
    //начальное положение рисунка
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    // координаты y - уменьшаются, x - постоянны
    while (posY > padding) {
        data.push({ x: posX, y: posY });
        posY -= h;
    }
    8
    // координаты y - постоянны, x - увеличиваются
    while (posX < width - padding) {
        data.push({ x: posX, y: posY });
        posX += h;
    }
    return data
}
// создаем массив точек, расположенных по кругу
function createPathCircle() {
    let data = [];
    // используем параметрическую форму описания круга
    // центр асположен в центре svg-элемента, а радиус равен трети высоты/ширины
    for (let t = Math.PI; t <= Math.PI * 2; t += 0.1) {
        data.push(
            {
                x: width / 2 + width / 3 * Math.sin(t),
                y: height / 2 + height / 3 * Math.cos(t)
            }
        );
    }
    return data
}
// создаем путь и отображаем его в svg-элементе
let drawPath = (typePath) => {
    // создаем массив точек пути в зависимости от параметра
    const dataPoints = (typePath == 0) ? createPathG() : createPathCircle();
    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    // создаем путь на основе массива точек
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'black')
        .attr('fill', 'none');

    return path;
}

function translateAlong(path) {
    const length = path.getTotalLength();
    return function() {
    return function(t) {
    const {x, y} = path.getPointAtLength(t * length);
    return `translate(${x},${y})`;
    }
    }
   }
   


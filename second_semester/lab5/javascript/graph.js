const marginX = 50;
const marginY = 50;
const height = 400;
const width = 800;

let svg = d3.select("svg").attr("height", height).attr("width", width);

function createArrGraph(data, key) {
    let groupObj = d3.group(data, d => d[key]);
    let arrGraph = [];
    for (let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Количество здоровья']));
        arrGraph.push({ labelX: entry[0], values: minMax });
    }
    return arrGraph;
}

function drawGraph(form) {
    const keyX = form.ox.value;
    const isMin = form.oy[0].checked;
    const isMax = form.oy[1].checked;
    if ((keyX) && (isMin || isMax)) {
        const arrGraph = createArrGraph(heroes, keyX);
        svg.selectAll('*').remove();
        const [scX, scY] = createAxis(arrGraph);
        if (isMin) {
            createBars(arrGraph, scX, scY, 0, "blue", -1);
        }
        if (isMax) {
            createBars(arrGraph, scX, scY, 1, "red", 1);
        }
    } else {
        alert('Выберите тип графика');
    }
}

function createAxis(data) {
    let firstRange = d3.extent(data.map((d) => Number(d.values[0])));
    let secondRange = d3.extent(data.map((d) => Number(d.values[1])));
    let min = firstRange[0];
    let max = secondRange[1];
    let scaleX = d3
        .scaleBand()
        .domain(data.map((d) => d.labelX))
        .range([0, width - 2 * marginX])
        .padding(0.2);
    let scaleY = d3
        .scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([height - 2 * marginY, 0]);
    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);
    svg.append("g")
        .attr("transform", `translate(${marginX}, ${height - marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", (d) => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createBars(arrGraph, scaleX, scaleY, index, color, offsetMultiplier) {
    const barWidth = scaleX.bandwidth() / 3;
    const offset = barWidth * offsetMultiplier;

    svg.selectAll(`.bar-${index}`)
        .data(arrGraph)
        .enter()
        .append("rect")
        .attr("class", `bar-${index}`)
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + offset)
        .attr("y", d => scaleY(d.values[index]))
        .attr("width", barWidth)
        .attr("height", d => height - marginY - scaleY(d.values[index]) - marginY)
        .attr("transform", `translate(${marginX}, ${marginY})`)
        .style("fill", color);
}


function clearGraph() {
    d3.select("#graph").selectAll('input[type="checkbox"]').property('checked', false);
    d3.select("#graph").selectAll('input[type="radio"]').property('checked', false);
    svg.selectAll('*').remove();
}

let clearButton = document.getElementById('clearGraph');
clearButton.addEventListener('click', function () {
    clearGraph();
});
const width = 600;
const height = 600;
let svg = d3.select("svg").attr("width", width).attr("height", height);

cx = ((1 + Math.cos(3 * Math.PI / 2)) * Math.cos(3 * Math.PI / 2)) * width / 5;
cy = ((1 + Math.cos(3 * Math.PI / 2)) * Math.sin(3 * Math.PI / 2)) * height / 5 + 120;

let pict = svg.append("circle").attr("cx", width / 2).attr("cy", height / 3.333).attr("r", 20).attr("fill", "red");

function createPath() {
    let data = [];
    for (let t = (-1 * Math.PI) / 2; t <= Math.PI / 2; t += 0.01) {
        data.push(
            {
                x: width / 2 + ((1 + Math.cos(t)) * Math.cos(t)) * width / 5,
                y: width / 2 + ((1 + Math.cos(t)) * Math.sin(t)) * width / 5
            }
        );
    }
    for (let t = Math.PI / 2; t <= 3 * Math.PI / 2; t += 0.01) {
        data.push(
            {
                x: width / 2 + ((1 - Math.cos(t)) * Math.cos(t)) * width / 5,
                y: width / 2 + ((1 - Math.cos(t)) * Math.sin(t)) * width / 5
            }
        );
    }
    return data;
}

function drawPath() {
    const dataPoints = createPath();
    const line = d3.line().x((d) => d.x).y((d) => d.y);
    const path = svg.append('path').attr('d', line(dataPoints)).attr('stroke', 'black').attr('fill', 'none');
    return path;
}
let dataForm = document.getElementById("setting");

let runAnimation = () => {
    let animSpeed = dataForm.animSpeed.value;
    let path = drawPath();
    let pict = svg.append("circle").attr("cx", cx).attr("cy", cy).attr("r", 20).attr("fill", "red");
    const length = path.node().getTotalLength();
    pict.transition().ease(d3.easeLinear).duration(animSpeed * 1000).attrTween('transform', function () {
        return function (t) {
            let { x, y } = path.node().getPointAtLength(t * length);
            let scaleX = 1 + t * (dataForm.sxTo.value - 1);
            let scaleY = 1 + t * (dataForm.syTo.value - 1); 
            let translate = `translate(${x},${y})`;
            let transform = `scale(${scaleX}, ${scaleY})`;
            return `${translate} ${transform}`;
        };
    });
};


let animPict = document.getElementById("animPict");
animPict.addEventListener('click', function () {
    runAnimation();
});


function translateAlong(path) {
    const length = path.getTotalLength();
    return function () {
        return function (t) {
            const { x, y } = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    drawPath();
})

let resetPict = document.getElementById("resetPict");
resetPict.addEventListener('click', function () {
    svg.selectAll('*').remove();
    drawPath();

});

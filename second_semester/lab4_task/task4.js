function checkPage(inputRate) {
    d3.selectAll("tbody tr").filter(function() {
        var tableRate = parseFloat(d3.select(this).select("td:nth-child(2)").text());
        return tableRate < inputRate;
    }).remove(); 
}
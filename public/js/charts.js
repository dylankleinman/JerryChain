var ctx = document.getElementById('myChart').getContext('2d');
function buildChart(chartData){
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // The data for our dataset
        data: {
            labels:Last7Days(),
            datasets: [{
                label: 'Price in the Last 7 Days',
                borderColor: 'rgb(255, 99, 132)',
                data: chartData,
            }]
        },
    
        // Configuration options go here
        options: {
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        
                    }
                }]
            },
        }
    });    
}

function Last7Days () {
    var result = [];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push( formatDate(d) )
    }
    return(result);
}

function formatDate(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = mm+'/'+dd;
    return date
 }
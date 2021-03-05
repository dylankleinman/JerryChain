fetchURLs();

let Flapdata;

async function fetchURLs() {
    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all([
        // fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json()),// parse each response as json
        fetch('https://api.coingecko.com/api/v3/global')
            .then((response) => response.json())
            .then(data => { 
                //console.log (data);
                Flapdata = data.data;
                fillCarousel(data.data);
            }),
        fetch('https://api.coingecko.com/api/v3/search/trending',
            {mode: 'cors'},
            {headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }})
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);
                    data.coins.forEach(element => {
                        createCard(element.item);
                    });
                })
      ]);
    } catch (error) {
      console.log(error);
    }
  }
function fillCarousel(data){
    activeCryptos = data.active_cryptocurrencies + '';
    maxWidth = activeCryptos.length + 15
    var options = {
        width: maxWidth,
        timing: 500,          // the maximum timing for digit animation
    }
    $('#display1').flapper(options).val('Active Cryptos:' + activeCryptos).change();
    $('#display2').flapper(options).val('Markets:' + data.markets).change();
    $('#display3').flapper(options).val('Upcoming ICOs:' + data.upcoming_icos).change();
    $('#display4').flapper(options).val('Ongoing ICOs:' + data.ongoing_icos).change();
    setTimeout(function(){    
        changeFlappers(data, activeCryptos);
    },10000);
}

function changeFlappers(data, activeCryptos){
    $('#display1').val('').change();
    $('#display2').val('').change();
    $('#display3').val('').change();
    $('#display4').val('').change();
    $('#display1').val('Active Cryptos:' + activeCryptos).change();
    $('#display2').val('Markets:' + data.markets).change();
    $('#display3').val('Upcoming ICOs:' + data.upcoming_icos).change();
    $('#display4').val('Ongoing ICOs:' + data.ongoing_icos).change();
    setTimeout(function(){    
        changeFlappers(data, activeCryptos);
    },15000);
}

function createCard(item){
    document.getElementById("cards").innerHTML += `
        <div class="card custom-card" id= `+item.id+` style="width: 18rem; height: 13rem; margin: 10px; padding-top: 15px;">
        <img class="card-img-top" src=`+item.large+` alt="Card image cap" style="width:25%; margin:auto">
        <div class="card-body" style="margin: auto; text-align: center">
            <h3 class="card-title">`+item.name+`</h3>
            <h5 class="card-title">Market Cap Rank: `+item.market_cap_rank+`</h5>
        </div>
        </div>`

        $(".custom-card").click(function(){
            $('#exampleModalCenter').modal('toggle');
            let itemId = $(this)[0].id
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids='+itemId+'&order=market_cap_desc&per_page=100&page=1&sparkline=true')
            .then((response) => response.json())
            .then(data => { 
                data=data[0];
                $('#spinner').hide();
                $('#modalTitle').html(data.name);
                $('#tkn-id').html(data.id);
                $('#crnt-price').html(data.current_price);
                $('#mkt-cap').html(data.market_cap);
                $('#prc-chng').html(data.price_change_24h);
                console.log(data);
                buildChart(data.sparkline_in_7d.price);
            })
            console.log(itemId);
        });
}

$('.close-btn').click(function(){

})

$("#exampleModalCenter").on("hidden.bs.modal", function () {
    console.log('remove');
    $('.chartjs-size-monitor').remove();
});



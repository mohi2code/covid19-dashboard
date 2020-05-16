
(async () => {
  const data = await makeData();
  
  displaySummaryData(data);
  displayChartData(data);
})();

function displaySummaryData(data) {
  document.querySelector('#total').innerHTML = data.total;
  document.querySelector('#active').innerHTML = data.active;
  document.querySelector('#recovered').innerHTML = data.recovered;
  document.querySelector('#deaths').innerHTML = data.deaths;
}

function displayChartData(data) {
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: data.labels,
          datasets: [{
              label: 'Cases since the start of the outbreak',
              backgroundColor: 'rgb(244,67,54)',
              borderColor: 'rgb(244,67,54)',
              data: data.values
          }]
      },

      // Configuration options go here
      options: {}
  });
}


// Fetch data
async function makeData() {
  var total, active, recovered, deaths, labels, values;

  let now = new Date();
  now.setHours(0, 0, 0, 0);

  let response = await fetch(`https://api.covid19api.com/country/sd?from=2020-03-13T00:00:00Z&to=${now.toISOString()}`);
  let data = await response.json();

  total = data[data.length - 1].Confirmed;
  active = data[data.length - 1].Active;
  recovered = data[data.length - 1].Recovered;
  deaths = data[data.length - 1].Deaths;
  labels = data.map(x => {
    let date = new Date(x.Date);
    return date.toLocaleDateString();
  });
  values = data.map(x => {
    return x.Active;
  });

  return {
    total,
    active,
    recovered,
    deaths,
    labels,
    values
  };
}

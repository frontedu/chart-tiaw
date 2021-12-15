const ctx = document.getElementById('myChart');

fetch('/data.json').then(result => result.json()).then(createChart);

function createChart(data) {
    
    let dadosJson = data['rad 2020_02'];

    let a1a7 = getAverages(dadosJson, getRange('A', 1, 7));
    let a13a18 = getAverages(dadosJson, getRange('A', 13, 18));
    let a19a23 = getAverages(dadosJson, getRange('A', 19, 23));
    let orientacaoEstagio = getAverages(dadosJson, ['A24']);
    let orientancaoTcc = getAverages(dadosJson, ['A25', 'A27', 'A28', 'A29', 'A30']);
    let orientacaoPesquisa = getAverages(dadosJson, ['A26']);
    let orientacaoExtensao = getAverages(dadosJson, getRange('A', 31, 33));
    let participacaoEmReunioes = getAverages(dadosJson, getRange('A', 36, 39));
    let participacaoEmPesquisa = getAverages(dadosJson, getRange('B', 1, 8));
    let producaoAcademica = getAverages(dadosJson, getRange('B', 9, 25));
    let atividadesDeExtensao = getAverages(dadosJson, getRange('C', 1, 13));
    let atividadesDeGestao = getAverages(dadosJson, getRange('D', 1, 11));
    let atividadesDeRepresentacao = getAverages(dadosJson, getRange('E', 1, 13));

    
    const chartData = {
        labels: ['A1 a A7',
        'A13 a A18',
        'A19 a A23', 
        'A24',
        'A25; A27; A28; A29; A30',
        'A26',   
        'A31; A32; A33',
        'A36 a A39',
        'B1 a B8',
        'B9 a B25',
        'C1 a C13',
        'D1 a D11',
        'E1 a E13'],
        datasets: [{
          axis: 'y',
          label: 'Média',
          data: [a1a7, a13a18, a19a23, orientacaoEstagio, orientancaoTcc, orientacaoPesquisa, orientacaoExtensao, participacaoEmReunioes, participacaoEmPesquisa, producaoAcademica, atividadesDeExtensao, atividadesDeGestao, atividadesDeRepresentacao],
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1    
        }]
      };


    const myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            responsive: false,
        },
      });

    myChart.canvas.parentNode.style.height = '160px';
    myChart.canvas.parentNode.style.width = '950px';
}


function getRange(letter, r0, r1) {
    let arr = [];
    for (let i = r0; i <= r1; i ++) {
        arr.push(letter + i);
    }

    return arr
}

function getAverages(data, range) {
    let hours = [];

    for (let group in data) {
        for (let item in data[group]) {
            if (range.some(function(v) { return item == v })) {
                hours.push(data[group][item]);
            }
        }
    }
    return calculateAverages(hours);
}


function calculateAverages(arr) {
    arr = arr.map(num => Number(num));
    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = (sum / arr.length) || 0;
    return avg;
}

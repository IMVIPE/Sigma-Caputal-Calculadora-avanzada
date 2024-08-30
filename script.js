function calculate() {
    // Get input values
    const initial1 = parseFloat(document.getElementById('initial1').value);
    const rate1 = parseFloat(document.getElementById('rate1').value) / 100;
    const years1 = parseFloat(document.getElementById('years1').value);
    const monthly1 = parseFloat(document.getElementById('monthly1').value);
    
    const initial2 = parseFloat(document.getElementById('initial2').value);
    const rate2 = parseFloat(document.getElementById('rate2').value) / 100;
    const years2 = parseFloat(document.getElementById('years2').value);
    const monthly2 = parseFloat(document.getElementById('monthly2').value);
    
    const inflation = parseFloat(document.getElementById('inflation').value) / 100;
    const displayInterval = parseFloat(document.getElementById('displayInterval').value);
    
    // Compound interest calculations
    function compoundInterest(principal, rate, years, monthly) {
        const months = years * 12;
        let capital = principal;
        for (let i = 1; i <= months; i++) {
            capital += capital * rate;
            capital += monthly;
        }
        return capital.toFixed(2);
    }
    
    // Case 1 calculations
    const finalCapital1 = compoundInterest(initial1, rate1, years1, monthly1);
    
    // Case 2 calculations
    const finalCapital2 = compoundInterest(initial2, rate2, years2, monthly2);
    
    // Display results
    document.getElementById('case1Results').innerHTML = `<p>Capital final: ${finalCapital1}</p>`;
    document.getElementById('case2Results').innerHTML = `<p>Capital final: ${finalCapital2}</p>`;
    
    // Compare cases
    const capitalDifference = (finalCapital2 - finalCapital1).toFixed(2);
    document.getElementById('comparisonResults').innerHTML = `<p>Diferencia en capital final: ${capitalDifference}</p>`;
    
    // Generate chart
    generateChart(finalCapital1, finalCapital2);
}

function generateChart(case1, case2) {
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0 años', '10 años'],
            datasets: [
                {
                    label: 'Caso 1',
                    data: [1000, case1],
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'Caso 2',
                    data: [1000, case2],
                    borderColor: 'red',
                    fill: false
                }
            ]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Años'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Capital ($)'
                    }
                }
            }
        }
    });
}
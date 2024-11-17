let lineChart, barChart, doughnutChart;
let updateInterval = null; // 업데이트 타이머 변수

document.addEventListener('DOMContentLoaded', () => {
    setupSPA();
    navigateTo('home');
});

function initializeCharts() {
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Temperature (°C)',
                data: [],
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        }
    });

    const barCtx = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['PM2.5', 'PM10', 'NOx', 'NH3', 'CO2', 'SO2', 'VOC'],
            datasets: [{
                label: 'Pollutant Levels',
                data: [],
                backgroundColor: ['#ff6384', '#36a2eb', '#ff9f40', '#4bc0c0', '#ffcd56', '#c45850', '#9966ff']
            }]
        }
    });

    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['PM2.5', 'PM10', 'NOx', 'NH3', 'CO2', 'SO2', 'VOC'],
            datasets: [{
                data: [],
                backgroundColor: ['#ff6384', '#36a2eb', '#ff9f40', '#4bc0c0', '#ffcd56', '#c45850', '#9966ff']
            }]
        }
    });
}

function startRealTimeData() {
    // 타이머가 이미 실행 중이면 중단
    if (updateInterval) return;

    updateInterval = setInterval(() => {
        const randomData = {
            temperature: (Math.random() * 30 + 10).toFixed(2),
            pm25: (Math.random() * 50).toFixed(2),
            pm10: (Math.random() * 60).toFixed(2),
            nox: (Math.random() * 20).toFixed(2),
            nh3: (Math.random() * 15).toFixed(2),
            co2: (Math.random() * 500 + 300).toFixed(2),
            so2: (Math.random() * 10).toFixed(2),
            voc: (Math.random() * 30).toFixed(2)
        };

        updateCharts(randomData);
    }, 5000);
}

function stopRealTimeData() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
    }
}

function updateCharts(data) {
    lineChart.data.labels.push(new Date().toLocaleTimeString());
    lineChart.data.datasets[0].data.push(parseFloat(data.temperature));
    if (lineChart.data.labels.length > 10) {
        lineChart.data.labels.shift();
        lineChart.data.datasets[0].data.shift();
    }
    lineChart.update();

    barChart.data.datasets[0].data = [
        parseFloat(data.pm25),
        parseFloat(data.pm10),
        parseFloat(data.nox),
        parseFloat(data.nh3),
        parseFloat(data.co2),
        parseFloat(data.so2),
        parseFloat(data.voc)
    ];
    barChart.update();

    doughnutChart.data.datasets[0].data = [
        parseFloat(data.pm25),
        parseFloat(data.pm10),
        parseFloat(data.nox),
        parseFloat(data.nh3),
        parseFloat(data.co2),
        parseFloat(data.so2),
        parseFloat(data.voc)
    ];
    doughnutChart.update();
}

function setupSPA() {
    document.getElementById('home-link').addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('home');
    });
    document.getElementById('data-link').addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('data');
    });
    document.getElementById('about-link').addEventListener('click', (event) => {
        event.preventDefault();
        navigateTo('about');
    });
}

function navigateTo(page) {
    const mainContent = document.getElementById('main-content');

    // 페이지 전환 시 실시간 데이터 업데이트 중단
    stopRealTimeData();

    if (page === 'home') {
        mainContent.innerHTML = `
            <header>
                <h1>Air Quality Monitoring Dashboard</h1>
            </header>
            <section id="data-cards">
                <div class="card"><h3>Temperature</h3><p><span id="temperature">25</span> °C</p></div>
                <div class="card"><h3>Humidity</h3><p><span id="humidity">60</span> %</p></div>
                <div class="card"><h3>PM2.5</h3><p><span id="pm25">35</span> μg/m³</p></div>
                <div class="card"><h3>PM10</h3><p><span id="pm10">40</span> μg/m³</p></div>
                <div class="card"><h3>NOx</h3><p><span id="nox">15</span> ppb</p></div>
                <div class="card"><h3>NH3</h3><p><span id="nh3">8</span> ppb</p></div>
                <div class="card"><h3>CO2</h3><p><span id="co2">400</span> ppm</p></div>
                <div class="card"><h3>SO2</h3><p><span id="so2">5</span> ppb</p></div>
                <div class="card"><h3>VOC</h3><p><span id="voc">20</span> ppb</p></div>
            </section>
            <section id="charts">
                <div class="chart-container"><canvas id="lineChart"></canvas></div>
                <div class="chart-container"><canvas id="barChart"></canvas></div>
                <div class="chart-container"><canvas id="doughnutChart"></canvas></div>
            </section>
        `;

        if (lineChart) lineChart.destroy();
        if (barChart) barChart.destroy();
        if (doughnutChart) doughnutChart.destroy();
        initializeCharts();
        startRealTimeData();

    } else if (page === 'data') {
        mainContent.innerHTML = `
            <h2>Data Overview</h2>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temperature (°C)</th>
                        <th>PM2.5 (μg/m³)</th>
                        <th>PM10 (μg/m³)</th>
                        <th>CO2 (ppm)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>2024-11-17</td><td>25.5</td><td>35.0</td><td>40.0</td><td>420</td></tr>
                    <tr><td>2024-11-18</td><td>26.0</td><td>37.5</td><td>42.0</td><td>430</td></tr>
                </tbody>
            </table>
        `;

    } else if (page === 'about') {
        mainContent.innerHTML = `
            <h2>About This Dashboard</h2>
            <p>This Air Quality Monitoring Dashboard provides real-time updates on air quality using various metrics.</p>
        `;
    }
}

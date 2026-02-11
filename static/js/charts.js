// ================= Customer Churn Distribution (Pie Chart) =================
const churnCtx = document.getElementById('churnChart').getContext('2d');
const churnChart = new Chart(churnCtx, {
    type: 'pie',
    data: {
        labels: ['Churn', 'Active'],
        datasets: [{
            label: 'Customers',
            data: [300, 900], // Example numbers, replace with backend values
            backgroundColor: ['#ff4d4d', '#4caf50'],
            borderColor: ['#fff', '#fff'],
            borderWidth: 2,
            hoverOffset: 10
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Customer Churn Distribution' }
        }
    }
});

// ================= Contract Type Split (Doughnut Chart) =================
const contractCtx = document.getElementById('contractChart').getContext('2d');
const contractChart = new Chart(contractCtx, {
    type: 'doughnut',
    data: {
        labels: ['Monthly', 'Yearly'],
        datasets: [{
            label: 'Contracts',
            data: [800, 400], // Example
            backgroundColor: ['#36a2eb', '#ffcd56'],
            borderColor: '#fff',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Contract Type Split' }
        }
    }
});

// ================= Payment Method Usage (Bar Chart) =================
const paymentCtx = document.getElementById('paymentChart').getContext('2d');
const paymentChart = new Chart(paymentCtx, {
    type: 'bar',
    data: {
        labels: ['Card', 'PayPal', 'Bank Transfer'],
        datasets: [{
            label: 'Number of Customers',
            data: [500, 300, 400], // Example
            backgroundColor: ['#4caf50', '#ff9800', '#9c27b0']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Payment Method Usage' }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 100 }
            }
        }
    }
});

// ================= Customer Tenure Distribution (Line Chart) =================
const tenureCtx = document.getElementById('tenureChart').getContext('2d');
const tenureChart = new Chart(tenureCtx, {
    type: 'line',
    data: {
        labels: ['0-3', '4-6', '7-12', '13-24', '25-36', '37+'], // Months
        datasets: [{
            label: 'Number of Customers',
            data: [100, 200, 300, 250, 150, 50], // Example
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: '#36a2eb',
            tension: 0.4,
            pointBackgroundColor: '#36a2eb'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' },
            title: { display: true, text: 'Customer Tenure Distribution (Months)' }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

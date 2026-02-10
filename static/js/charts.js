// ===== Churn Distribution =====
new Chart(document.getElementById("churnChart"), {
    type: "doughnut",
    data: {
        labels: ["Churned", "Retained"],
        datasets: [{
            data: [35, 65],
            backgroundColor: ["#f87171", "#34d399"],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: "Customer Churn Distribution"
            }
        }
    }
});


// ===== Contract Type =====
new Chart(document.getElementById("contractChart"), {
    type: "bar",
    data: {
        labels: ["Monthly", "Yearly"],
        datasets: [{
            label: "Customers",
            data: [70, 30],
            backgroundColor: "#667eea",
            borderRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Contract Type Split"
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// ===== Payment Method =====
new Chart(document.getElementById("paymentChart"), {
    type: "pie",
    data: {
        labels: ["Card", "PayPal", "Bank Transfer"],
        datasets: [{
            data: [55, 25, 20],
            backgroundColor: ["#60a5fa", "#fbbf24", "#34d399"],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: "Payment Method Usage"
            }
        }
    }
});

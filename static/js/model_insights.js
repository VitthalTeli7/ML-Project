// Model Accuracy
new Chart(document.getElementById("accuracyChart"), {
    type: "doughnut",
    data: {
        labels: ["Correct", "Incorrect"],
        datasets: [{
            data: [88, 12],
            backgroundColor: ["#34d399", "#f87171"]
        }]
    }
});

// Confusion Matrix
new Chart(document.getElementById("confusionChart"), {
    type: "bar",
    data: {
        labels: ["TP", "FP", "FN", "TN"],
        datasets: [{
            label: "Count",
            data: [42, 7, 9, 92],
            backgroundColor: "#667eea"
        }]
    }
});

// Feature Importance
new Chart(document.getElementById("featureChart"), {
    type: "bar",
    data: {
        labels: ["Contract", "Tenure", "Charges", "Complaints", "Support"],
        datasets: [{
            label: "Importance",
            data: [0.35, 0.28, 0.17, 0.12, 0.08],
            backgroundColor: "#fbbf24"
        }]
    },
    options: {
        indexAxis: "y"
    }
});

/**
 * =====================================================
 * CHARTS.JS - PREMIUM ENTERPRISE EDITION
 * =====================================================
 * ✓ Real-time data integration with your backend
 * ✓ Premium animations & transitions
 * ✓ Interactive tooltips & hover effects
 * ✓ Responsive & mobile optimized
 * ✓ Dark mode support
 * ✓ Accessibility (ARIA labels)
 * ✓ Performance optimized
 * ✓ Memory efficient
 * 
 * Author: Vitthal Teli
 * Version: 3.0.0
 * =====================================================
 */

// ============= GLOBAL CHART CONFIGURATION =============
Chart.defaults.font.family = "'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
Chart.defaults.font.size = 12;
Chart.defaults.font.weight = '500';
Chart.defaults.color = '#1e293b';
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.layout.padding = 16;

// Global animation defaults
Chart.defaults.animation = {
    duration: 1200,
    easing: 'easeOutQuart',
    delay: (context) => context.dataIndex * 50,
    loop: false
};

// Global tooltip defaults
Chart.defaults.plugins.tooltip = {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    titleColor: '#ffffff',
    titleFont: { size: 14, weight: '600', family: "'Inter', sans-serif" },
    bodyColor: '#e2e8f0',
    bodyFont: { size: 13, family: "'Inter', sans-serif" },
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    caretSize: 8,
    cornerRadius: 8,
    displayColors: true,
    boxPadding: 6,
    usePointStyle: true
};

// Global legend defaults
Chart.defaults.plugins.legend = {
    position: 'bottom',
    align: 'center',
    labels: {
        font: { size: 12, weight: '500', family: "'Inter', sans-serif" },
        color: '#475569',
        padding: 20,
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        boxHeight: 8
    }
};

// ============= PREMIUM COLOR PALETTE =============
const CHART_COLORS = {
    // Primary palette
    primary: '#6366f1',
    primaryLight: '#818cf8',
    primaryDark: '#4f46e5',
    
    // Secondary palette
    secondary: '#8b5cf6',
    secondaryLight: '#a78bfa',
    secondaryDark: '#7c3aed',
    
    // Accent palette
    accent: '#ec4899',
    accentLight: '#f472b6',
    accentDark: '#db2777',
    
    // Semantic colors
    success: '#10b981',
    successLight: '#34d399',
    successDark: '#059669',
    
    warning: '#f59e0b',
    warningLight: '#fbbf24',
    warningDark: '#d97706',
    
    danger: '#ef4444',
    dangerLight: '#f87171',
    dangerDark: '#dc2626',
    
    info: '#3b82f6',
    infoLight: '#60a5fa',
    infoDark: '#2563eb',
    
    // Neutral colors
    gray: '#64748b',
    grayLight: '#94a3b8',
    grayDark: '#475569',
    
    // Chart gradients
    gradientPrimary: ['#6366f1', '#8b5cf6', '#a78bfa'],
    gradientSuccess: ['#10b981', '#34d399', '#6ee7b7'],
    gradientDanger: ['#ef4444', '#f87171', '#fca5a5'],
    gradientWarning: ['#f59e0b', '#fbbf24', '#fcd34d'],
    gradientInfo: ['#3b82f6', '#60a5fa', '#93c5fd'],
    
    // Transparent variants
    primaryTransparent: 'rgba(99, 102, 241, 0.1)',
    successTransparent: 'rgba(16, 185, 129, 0.1)',
    dangerTransparent: 'rgba(239, 68, 68, 0.1)',
    warningTransparent: 'rgba(245, 158, 11, 0.1)',
    infoTransparent: 'rgba(59, 130, 246, 0.1)'
};

// ============= DARK MODE COLORS =============
const DARK_MODE_COLORS = {
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    grid: 'rgba(255, 255, 255, 0.1)',
    tooltipBg: 'rgba(15, 23, 42, 0.98)',
    legendText: '#e2e8f0'
};

// ============= CHART UTILITIES =============
const ChartUtils = {
    /**
     * Detect dark mode
     */
    isDarkMode: () => {
        return document.body.classList.contains('dark-mode') || 
               window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    /**
     * Format number with commas
     */
    formatNumber: (value) => {
        return new Intl.NumberFormat('en-US').format(value);
    },

    /**
     * Format percentage
     */
    formatPercentage: (value, decimals = 1) => {
        return `${value.toFixed(decimals)}%`;
    },

    /**
     * Format currency
     */
    formatCurrency: (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    },

    /**
     * Calculate total from dataset
     */
    calculateTotal: (dataset) => {
        return dataset.reduce((sum, value) => sum + value, 0);
    },

    /**
     * Calculate percentage
     */
    calculatePercentage: (value, total) => {
        return ((value / total) * 100).toFixed(1);
    },

    /**
     * Create gradient
     */
    createGradient: (ctx, colorStops) => {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        colorStops.forEach((stop, index) => {
            gradient.addColorStop(index / (colorStops.length - 1), stop);
        });
        return gradient;
    },

    /**
     * Create radial gradient
     */
    createRadialGradient: (ctx, colors) => {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 200);
        colors.forEach((color, index) => {
            gradient.addColorStop(index / (colors.length - 1), color);
        });
        return gradient;
    }
};

// ============= SAFE CHART INITIALIZATION =============
class ChartManager {
    constructor() {
        this.instances = {};
        this.defaultOptions = this.getDefaultOptions();
        this.initDarkModeListener();
    }

    /**
     * Get default chart options
     */
    getDefaultOptions() {
        return {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 20,
                    bottom: 20,
                    left: 10,
                    right: 10
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeOutQuart',
                animateScale: true,
                animateRotate: true
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    position: 'nearest',
                    backgroundColor: this.isDarkMode() ? DARK_MODE_COLORS.tooltipBg : 'rgba(15, 23, 42, 0.95)',
                    titleColor: '#ffffff',
                    bodyColor: this.isDarkMode() ? '#e2e8f0' : '#f1f5f9',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    borderRadius: 12,
                    padding: 12,
                    caretSize: 8,
                    cornerRadius: 8,
                    displayColors: true,
                    boxPadding: 6,
                    usePointStyle: true
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                    labels: {
                        font: {
                            size: 12,
                            weight: '500',
                            family: "'Inter', sans-serif"
                        },
                        color: this.isDarkMode() ? DARK_MODE_COLORS.legendText : '#475569',
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 8,
                        boxHeight: 8
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: this.isDarkMode() ? DARK_MODE_COLORS.grid : 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        font: { size: 11, weight: '500' },
                        color: this.isDarkMode() ? DARK_MODE_COLORS.textMuted : '#64748b',
                        padding: 8,
                        callback: (value) => ChartUtils.formatNumber(value)
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: true,
                        color: this.isDarkMode() ? DARK_MODE_COLORS.grid : 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: { size: 11, weight: '500' },
                        color: this.isDarkMode() ? DARK_MODE_COLORS.textMuted : '#64748b',
                        padding: 8,
                        maxRotation: 45,
                        minRotation: 45
                    }
                }
            }
        };
    }

    /**
     * Initialize dark mode listener
     */
    initDarkModeListener() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    this.updateChartsForDarkMode();
                }
            });
        });

        observer.observe(document.body, { attributes: true });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            this.updateChartsForDarkMode();
        });
    }

    /**
     * Update all charts for dark mode
     */
    updateChartsForDarkMode() {
        Object.values(this.instances).forEach(chart => {
            if (chart && chart.options) {
                const isDark = ChartUtils.isDarkMode();
                
                // Update tooltip colors
                if (chart.options.plugins?.tooltip) {
                    chart.options.plugins.tooltip.backgroundColor = isDark ? 
                        DARK_MODE_COLORS.tooltipBg : 'rgba(15, 23, 42, 0.95)';
                    chart.options.plugins.tooltip.bodyColor = isDark ? 
                        '#e2e8f0' : '#f1f5f9';
                }

                // Update legend colors
                if (chart.options.plugins?.legend?.labels) {
                    chart.options.plugins.legend.labels.color = isDark ?
                        DARK_MODE_COLORS.legendText : '#475569';
                }

                // Update grid colors
                if (chart.options.scales?.y?.grid) {
                    chart.options.scales.y.grid.color = isDark ?
                        DARK_MODE_COLORS.grid : 'rgba(0, 0, 0, 0.05)';
                }

                chart.update();
            }
        });
    }

    /**
     * Create chart safely
     */
    createChart(elementId, config) {
        const canvas = document.getElementById(elementId);
        if (!canvas) {
            console.warn(`⚠️ Canvas element '${elementId}' not found`);
            return null;
        }

        try {
            const ctx = canvas.getContext('2d');
            
            // Add ARIA label for accessibility
            canvas.setAttribute('role', 'img');
            canvas.setAttribute('aria-label', config.ariaLabel || `${config.type} chart`);

            // Merge with default options
            const enhancedConfig = {
                ...config,
                options: {
                    ...this.defaultOptions,
                    ...config.options,
                    plugins: {
                        ...this.defaultOptions.plugins,
                        ...config.options?.plugins,
                        tooltip: {
                            ...this.defaultOptions.plugins.tooltip,
                            ...config.options?.plugins?.tooltip
                        },
                        legend: {
                            ...this.defaultOptions.plugins.legend,
                            ...config.options?.plugins?.legend
                        }
                    },
                    scales: {
                        ...this.defaultOptions.scales,
                        ...config.options?.scales,
                        y: {
                            ...this.defaultOptions.scales.y,
                            ...config.options?.scales?.y
                        },
                        x: {
                            ...this.defaultOptions.scales.x,
                            ...config.options?.scales?.x
                        }
                    }
                }
            };

            // Add gradient backgrounds for bar/line charts
            if (config.type === 'bar' || config.type === 'line') {
                enhancedConfig.data.datasets = enhancedConfig.data.datasets.map(dataset => {
                    if (!dataset.backgroundColor && dataset.data) {
                        const gradient = ChartUtils.createGradient(ctx, [
                            CHART_COLORS.primaryTransparent,
                            CHART_COLORS.primary
                        ]);
                        return { ...dataset, backgroundColor: gradient };
                    }
                    return dataset;
                });
            }

            // Destroy existing instance if exists
            if (this.instances[elementId]) {
                this.instances[elementId].destroy();
            }

            // Create new chart
            this.instances[elementId] = new Chart(ctx, enhancedConfig);
            
            console.log(`✅ Chart '${elementId}' initialized successfully`);
            return this.instances[elementId];

        } catch (error) {
            console.error(`❌ Error creating chart '${elementId}':`, error);
            return null;
        }
    }

    /**
     * Destroy all charts
     */
    destroyAll() {
        Object.values(this.instances).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.instances = {};
        console.log('🔄 All charts destroyed');
    }

    /**
     * Update chart data
     */
    updateChartData(chartId, newData) {
        const chart = this.instances[chartId];
        if (chart) {
            chart.data.datasets[0].data = newData;
            chart.update();
            return true;
        }
        return false;
    }

    /**
     * Get chart instance
     */
    getChart(chartId) {
        return this.instances[chartId] || null;
    }
}

// Initialize chart manager
const chartManager = new ChartManager();

// ============= PREMIUM CHART CONFIGURATIONS =============
const ChartConfigs = {
    /**
     * Customer Churn Distribution (Pie Chart)
     */
    churnDistribution: (data = { churned: 300, active: 900 }) => ({
        type: 'pie',
        ariaLabel: 'Customer churn distribution pie chart',
        data: {
            labels: ['Churned Customers', 'Active Customers'],
            datasets: [{
                data: [data.churned, data.active],
                backgroundColor: [CHART_COLORS.danger, CHART_COLORS.success],
                borderColor: 'white',
                borderWidth: 4,
                hoverOffset: 20,
                hoverBorderColor: CHART_COLORS.primary,
                hoverBorderWidth: 3,
                offset: 5,
                spacing: 2,
                borderRadius: 4
            }]
        },
        options: {
            cutout: '0%',
            plugins: {
                title: {
                    display: true,
                    text: '📊 Customer Churn Distribution',
                    font: { size: 18, weight: '700' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${ChartUtils.formatNumber(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    }),

    /**
     * Contract Type Split (Doughnut Chart)
     */
    contractSplit: (data = { monthly: 800, yearly: 400 }) => ({
        type: 'doughnut',
        ariaLabel: 'Contract type distribution doughnut chart',
        data: {
            labels: ['Monthly Contracts', 'Yearly Contracts'],
            datasets: [{
                data: [data.monthly, data.yearly],
                backgroundColor: [CHART_COLORS.info, CHART_COLORS.warning],
                borderColor: 'white',
                borderWidth: 4,
                hoverOffset: 20,
                hoverBorderColor: CHART_COLORS.primary,
                hoverBorderWidth: 3,
                spacing: 2,
                borderRadius: 4
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                title: {
                    display: true,
                    text: '📋 Contract Type Distribution',
                    font: { size: 18, weight: '700' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${ChartUtils.formatNumber(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    }),

    /**
     * Payment Method Usage (Bar Chart)
     */
    paymentMethods: (data = { card: 500, paypal: 300, bank: 400 }) => ({
        type: 'bar',
        ariaLabel: 'Payment method usage bar chart',
        data: {
            labels: ['Credit Card', 'PayPal', 'Bank Transfer'],
            datasets: [{
                label: 'Number of Customers',
                data: [data.card, data.paypal, data.bank],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
                hoverBackgroundColor: [
                    CHART_COLORS.primary,
                    CHART_COLORS.secondary,
                    CHART_COLORS.accent
                ],
                hoverBorderColor: 'white',
                hoverBorderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: '💰 Payment Method Distribution',
                    font: { size: 18, weight: '700' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            return `${context.dataset.label}: ${ChartUtils.formatNumber(value)} customers`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers',
                        color: ChartUtils.isDarkMode() ? '#94a3b8' : '#64748b',
                        font: { size: 12, weight: '600' }
                    },
                    ticks: {
                        stepSize: 100,
                        callback: (value) => ChartUtils.formatNumber(value)
                    }
                }
            }
        }
    }),

    /**
     * Customer Tenure Distribution (Line Chart)
     */
    tenureDistribution: (data = [100, 200, 300, 250, 150, 50]) => ({
        type: 'line',
        ariaLabel: 'Customer tenure distribution line chart',
        data: {
            labels: ['0-3 mo', '4-6 mo', '7-12 mo', '13-24 mo', '25-36 mo', '37+ mo'],
            datasets: [{
                label: 'Customer Count',
                data: data,
                fill: true,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
                    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.05)');
                    return gradient;
                },
                borderColor: CHART_COLORS.primary,
                borderWidth: 3,
                tension: 0.4,
                pointBackgroundColor: CHART_COLORS.primary,
                pointBorderColor: 'white',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: CHART_COLORS.secondary,
                pointHoverBorderColor: 'white',
                pointHoverBorderWidth: 3,
                spanGaps: true
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: '⏳ Customer Tenure Distribution',
                    font: { size: 18, weight: '700' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            return `${context.dataset.label}: ${ChartUtils.formatNumber(value)} customers`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Customers',
                        color: ChartUtils.isDarkMode() ? '#94a3b8' : '#64748b',
                        font: { size: 12, weight: '600' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Tenure (months)',
                        color: ChartUtils.isDarkMode() ? '#94a3b8' : '#64748b',
                        font: { size: 12, weight: '600' }
                    }
                }
            }
        }
    }),

    /**
     * Model Accuracy (Doughnut Chart)
     */
    modelAccuracy: (data = { correct: 88, incorrect: 12 }) => ({
        type: 'doughnut',
        ariaLabel: 'Model accuracy doughnut chart',
        data: {
            labels: ['Correct Predictions', 'Incorrect Predictions'],
            datasets: [{
                data: [data.correct, data.incorrect],
                backgroundColor: [CHART_COLORS.success, CHART_COLORS.danger],
                borderColor: 'white',
                borderWidth: 4,
                hoverOffset: 20,
                hoverBorderColor: CHART_COLORS.primary,
                hoverBorderWidth: 3,
                spacing: 2,
                borderRadius: 4
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                title: {
                    display: true,
                    text: `🎯 Model Accuracy: ${data.correct}%`,
                    font: { size: 20, weight: '800' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                subtitle: {
                    display: true,
                    text: `Correct: ${data.correct}% | Errors: ${data.incorrect}%`,
                    color: ChartUtils.isDarkMode() ? '#94a3b8' : '#64748b',
                    font: { size: 13, weight: '500' },
                    padding: { bottom: 8 }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            return `${context.label}: ${value}%`;
                        }
                    }
                }
            }
        }
    }),

    /**
     * Confusion Matrix (Bar Chart)
     */
    confusionMatrix: (data = { tp: 42, fp: 7, fn: 9, tn: 92 }) => ({
        type: 'bar',
        ariaLabel: 'Confusion matrix bar chart',
        data: {
            labels: ['True Positive', 'False Positive', 'False Negative', 'True Negative'],
            datasets: [{
                label: 'Number of Predictions',
                data: [data.tp, data.fp, data.fn, data.tn],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
                hoverBackgroundColor: [
                    CHART_COLORS.success,
                    CHART_COLORS.warning,
                    CHART_COLORS.warning,
                    CHART_COLORS.success
                ],
                hoverBorderColor: 'white',
                hoverBorderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: '📊 Confusion Matrix',
                    font: { size: 18, weight: '700' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                tooltip: {
                    callbacks: {
                        afterLabel: (context) => {
                            const index = context.dataIndex;
                            const descriptions = [
                                '✅ Correctly predicted churn',
                                '⚠️ Incorrectly predicted churn (Type I Error)',
                                '⚠️ Missed churn cases (Type II Error)',
                                '✅ Correctly predicted active'
                            ];
                            return descriptions[index];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Predictions',
                        color: ChartUtils.isDarkMode() ? '#94a3b8' : '#64748b',
                        font: { size: 12, weight: '600' }
                    }
                }
            }
        }
    }),

    /**
     * Feature Importance (Horizontal Bar Chart)
     */
    featureImportance: (data = [0.35, 0.28, 0.17, 0.12, 0.08]) => ({
        type: 'bar',
        ariaLabel: 'Feature importance horizontal bar chart',
        data: {
            labels: [
                '📄 Contract Type',
                '⏱️ Customer Tenure',
                '💰 Monthly Charges',
                '📞 Support Complaints',
                '🛟 Support Tickets'
            ],
            datasets: [{
                label: 'Importance Score',
                data: data,
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 8,
                barPercentage: 0.7,
                categoryPercentage: 0.8,
                hoverBackgroundColor: [
                    CHART_COLORS.primary,
                    CHART_COLORS.secondary,
                    CHART_COLORS.accent,
                    CHART_COLORS.warning,
                    CHART_COLORS.success
                ],
                hoverBorderColor: 'white',
                hoverBorderWidth: 2
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                title: {
                    display: true,
                    text: '🔑 Feature Importance Analysis',
                    font: { size: 18, weight: '700' },
                    padding: { bottom: 24 },
                    color: ChartUtils.isDarkMode() ? '#f1f5f9' : '#0f172a'
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const value = context.raw;
                            return `Importance: ${(value * 100).toFixed(0)}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 0.4,
                    title: {
                        display: true,
                        text: 'Importance Score (%)',
                        color: ChartUtils.isDarkMode() ? '#94a3b8' : '#64748b',
                        font: { size: 12, weight: '600' }
                    },
                    ticks: {
                        callback: (value) => `${(value * 100)}%`
                    }
                }
            }
        }
    })
};

// ============= CHART INITIALIZATION =============
function initializeCharts() {
    console.log('🚀 Initializing premium charts...');
    
    // Get data from HTML data attributes or use defaults
    const getChartData = (elementId, defaultData) => {
        const canvas = document.getElementById(elementId);
        if (canvas && canvas.dataset) {
            return canvas.dataset;
        }
        return defaultData;
    };

    // Customer Churn Distribution
    const churnData = getChartData('churnChart', { churned: 300, active: 900 });
    chartManager.createChart('churnChart', 
        ChartConfigs.churnDistribution({
            churned: parseInt(churnData.churned) || 300,
            active: parseInt(churnData.active) || 900
        })
    );

    // Contract Type Split
    const contractData = getChartData('contractChart', { monthly: 800, yearly: 400 });
    chartManager.createChart('contractChart',
        ChartConfigs.contractSplit({
            monthly: parseInt(contractData.monthly) || 800,
            yearly: parseInt(contractData.yearly) || 400
        })
    );

    // Payment Method Usage
    const paymentData = getChartData('paymentChart', { card: 500, paypal: 300, bank: 400 });
    chartManager.createChart('paymentChart',
        ChartConfigs.paymentMethods({
            card: parseInt(paymentData.card) || 500,
            paypal: parseInt(paymentData.paypal) || 300,
            bank: parseInt(paymentData.bank) || 400
        })
    );

    // Customer Tenure Distribution
    const tenureData = getChartData('tenureChart', [100, 200, 300, 250, 150, 50]);
    chartManager.createChart('tenureChart',
        ChartConfigs.tenureDistribution([
            parseInt(tenureData.tenure0_3) || 100,
            parseInt(tenureData.tenure4_6) || 200,
            parseInt(tenureData.tenure7_12) || 300,
            parseInt(tenureData.tenure13_24) || 250,
            parseInt(tenureData.tenure25_36) || 150,
            parseInt(tenureData.tenure37) || 50
        ])
    );

    console.log('✅ Premium charts initialized successfully');
}

// ============= MODEL INSIGHTS INITIALIZATION =============
function initializeModelInsightsCharts() {
    console.log('🚀 Initializing model insights charts...');

    // Model Accuracy
    const accuracyData = getChartData('accuracyChart', { correct: 88, incorrect: 12 });
    chartManager.createChart('accuracyChart',
        ChartConfigs.modelAccuracy({
            correct: parseInt(accuracyData.correct) || 88,
            incorrect: parseInt(accuracyData.incorrect) || 12
        })
    );

    // Confusion Matrix
    const confusionData = getChartData('confusionChart', { tp: 42, fp: 7, fn: 9, tn: 92 });
    chartManager.createChart('confusionChart',
        ChartConfigs.confusionMatrix({
            tp: parseInt(confusionData.tp) || 42,
            fp: parseInt(confusionData.fp) || 7,
            fn: parseInt(confusionData.fn) || 9,
            tn: parseInt(confusionData.tn) || 92
        })
    );

    // Feature Importance
    const featureData = getChartData('featureChart', [0.35, 0.28, 0.17, 0.12, 0.08]);
    chartManager.createChart('featureChart',
        ChartConfigs.featureImportance([
            parseFloat(featureData.feature1) || 0.35,
            parseFloat(featureData.feature2) || 0.28,
            parseFloat(featureData.feature3) || 0.17,
            parseFloat(featureData.feature4) || 0.12,
            parseFloat(featureData.feature5) || 0.08
        ])
    );

    console.log('✅ Model insights charts initialized successfully');
}

// Helper function to get chart data from dataset
function getChartData(elementId, defaultData) {
    const canvas = document.getElementById(elementId);
    if (canvas && canvas.dataset) {
        return canvas.dataset;
    }
    return defaultData;
}

// ============= API DATA INTEGRATION =============
async function fetchRealChartData() {
    try {
        // You can replace this with your actual API endpoint
        const response = await fetch('/api/chart-data');
        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.log('Using default chart data (API not available)');
    }
    return null;
}

async function updateChartsWithRealData() {
    const realData = await fetchRealChartData();
    
    if (realData) {
        // Update churn chart
        if (realData.churn) {
            chartManager.updateChartData('churnChart', 
                [realData.churn.churned, realData.churn.active]
            );
        }
        
        // Update contract chart
        if (realData.contracts) {
            chartManager.updateChartData('contractChart',
                [realData.contracts.monthly, realData.contracts.yearly]
            );
        }
        
        // Update payment chart
        if (realData.payments) {
            chartManager.updateChartData('paymentChart',
                [realData.payments.card, realData.payments.paypal, realData.payments.bank]
            );
        }
        
        // Update tenure chart
        if (realData.tenure) {
            chartManager.updateChartData('tenureChart', realData.tenure);
        }
        
        // Update accuracy chart
        if (realData.accuracy) {
            chartManager.updateChartData('accuracyChart',
                [realData.accuracy.correct, realData.accuracy.incorrect]
            );
        }
        
        // Update confusion matrix
        if (realData.confusion) {
            chartManager.updateChartData('confusionChart',
                [realData.confusion.tp, realData.confusion.fp, 
                 realData.confusion.fn, realData.confusion.tn]
            );
        }
        
        // Update feature importance
        if (realData.features) {
            chartManager.updateChartData('featureChart', realData.features);
        }
        
        console.log('✅ Charts updated with real data');
    }
}

// ============= RESIZE HANDLER =============
let resizeTimer;
function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        Object.values(chartManager.instances).forEach(chart => {
            if (chart && typeof chart.update === 'function') {
                chart.update();
            }
        });
        console.log('📐 Charts resized');
    }, 250);
}

// ============= EXPORT FUNCTIONS =============
window.refreshAllCharts = function() {
    chartManager.destroyAll();
    initializeCharts();
    initializeModelInsightsCharts();
    updateChartsWithRealData();
    console.log('🔄 All charts refreshed');
};

window.updateChartsWithData = function(data) {
    // Update multiple charts with new data
    if (data.churn) chartManager.updateChartData('churnChart', [data.churn.churned, data.churn.active]);
    if (data.contracts) chartManager.updateChartData('contractChart', [data.contracts.monthly, data.contracts.yearly]);
    if (data.payments) chartManager.updateChartData('paymentChart', [data.payments.card, data.payments.paypal, data.payments.bank]);
    if (data.tenure) chartManager.updateChartData('tenureChart', data.tenure);
    if (data.accuracy) chartManager.updateChartData('accuracyChart', [data.accuracy.correct, data.accuracy.incorrect]);
    if (data.confusion) chartManager.updateChartData('confusionChart', [data.confusion.tp, data.confusion.fp, data.confusion.fn, data.confusion.tn]);
    if (data.features) chartManager.updateChartData('featureChart', data.features);
};

// ============= INITIALIZE ON DOM LOAD =============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    initializeCharts();
    initializeModelInsightsCharts();
    
    // Fetch real data
    updateChartsWithRealData();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Log initialization
    console.log('✨ Chart system ready');
    console.log(`📊 Total charts: ${Object.keys(chartManager.instances).length}`);
});

// ============= EXPORT FOR GLOBAL USE =============
window.ChartManager = chartManager;
window.ChartConfigs = ChartConfigs;
window.ChartUtils = ChartUtils;
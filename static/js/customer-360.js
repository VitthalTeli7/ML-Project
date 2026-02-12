// static/js/customer-360.js
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Set gauge position
        var gauge = document.getElementById('gaugeFill');
        if (gauge) {
            // Get risk score from data attribute
            var riskScore = parseInt(gauge.dataset.risk || '35');
            gauge.style.transform = 'rotate(' + (riskScore * 1.8) + 'deg)';
        }

        // Animate usage bars
        var usageBars = document.querySelectorAll('.usage-fill');
        for (var i = 0; i < usageBars.length; i++) {
            (function(bar, index) {
                var width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(function() {
                    bar.style.width = width;
                }, 300 * index);
            })(usageBars[i], i);
        }
    });

    // Send offer function - global
    window.sendOffer = function() {
        var customerId = document.getElementById('customerId')?.textContent || 'CUST-1001';
        alert('🎁 Offer sent to ' + customerId);
    };
})();
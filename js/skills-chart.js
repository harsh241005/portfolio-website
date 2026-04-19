document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('skillsChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Create gradient fill for the radar area
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.6)'); // Blueish
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.6)'); // Purplish

    const data = {
        labels: ['Python', 'SQL', 'scikit-learn', 'GCP', 'Pandas', 'Streamlit', 'NLP/BigQuery'],
        datasets: [{
            label: 'Proficiency',
            data: [95, 85, 90, 75, 88, 80, 85],
            backgroundColor: gradient,
            borderColor: '#8b5cf6', // Border color (Purple accent)
            pointBackgroundColor: '#3b82f6', // Points (Blue accent)
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3b82f6',
            borderWidth: 2,
        }]
    };

    const config = {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        circular: true
                    },
                    pointLabels: {
                        color: '#f5f5f7',
                        font: {
                            size: 13,
                            family: "'Outfit', sans-serif"
                        }
                    },
                    ticks: {
                        display: false, // hide numbers
                        min: 0,
                        max: 100,
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // hide legend box since we have a title "Technical Skills" above
                },
                tooltip: {
                    backgroundColor: 'rgba(5, 5, 5, 0.9)',
                    titleColor: '#8b5cf6',
                    bodyColor: '#f5f5f7',
                    titleFont: {
                        family: "'Outfit', sans-serif",
                        size: 14
                    },
                    bodyFont: {
                        family: "'Outfit', sans-serif",
                        size: 13
                    },
                    padding: 12,
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Proficiency: ${context.raw}%`;
                        }
                    }
                }
            }
        }
    };

    // Instantiate Chart
    const skillsRadarChart = new Chart(ctx, config);
});

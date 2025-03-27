new Chart(document.getElementById("radarChart"), {
    type: 'radar',
    data: {
        labels: ["15%", "15%", "15%", "15%", "15%", "15%", "15%", "15%"],
        datasets: [{
            data: [15, 10, 12, 20, 14, 12, 15, 14],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'blue',
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 0
        }, {
            data: [25, 20, 12, 10, 5, 22, 13, 24],
            backgroundColor: 'rgba(235, 57, 54, 0.2)',
            borderColor: 'red',
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 0
        }, {
            data: [5, 20, 32, 20, 15, 12, 23, 4],
            backgroundColor: 'rgba(235, 133, 54, 0.2)',
            borderColor: 'orange',
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 0
        }, {
            data: [35, 10, 22, 10, 25, 22, 33, 14],
            backgroundColor: 'rgba(54, 235, 114, 0.2)',
            borderColor: 'green',
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { 
                display: false,
                labels: {
                    usePointStyle: true, // ✅ Makes legend symbols circular
                    pointStyle: 'circle' // ✅ Explicitly set circle style
                }
            },
            title: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            r: {  
                angleLines: { display: true },  
                grid: { circular: true },
                ticks: { display: false }, 
                pointLabels: { 
                    font: { size: 18 }
                }
            }
        },
        elements: {
            point: { radius: 0 },
            line: { tension: 0.4 }
        }
    }
});


// Line Chart

var ctx = document.getElementById('lineChart').getContext('2d');

// Create gradient for smooth fill effect
var incomeGradient = ctx.createLinearGradient(0, 0, 0, 400);
incomeGradient.addColorStop(0, 'rgba(255, 17, 0, 0.37)'); // Light blue at the top
incomeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent at the bottom

var expensesGradient = ctx.createLinearGradient(0, 0, 0, 400);
expensesGradient.addColorStop(0, 'rgba(0, 255, 204, 0.81)'); // Light orange at the top
expensesGradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent at the bottom

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Income',
            data: [500, 1000, 750, 1250, 900, 600, 1000, 600, 800, 850, 720],
            borderColor: 'red',
            backgroundColor: incomeGradient, // Gradient fill
            fill: true, // Enable filling below the line
            tension: 0.3, // Smooth curve
            pointRadius: 0, // Removes dots,
            borderWidth:0.8
        }, {
            label: 'Expenses',
            data: [300, 800, 500, 1000, 700, 420, 800, 450, 620, 650, 520],
            borderColor: 'rgb(0, 255, 204)',
            backgroundColor: expensesGradient, // Gradient fill
            fill: true, // Enable filling below the line
            tension: 0.3, // Smooth curve
            pointRadius: 0, // Removes dots
            borderWidth:0.8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                position: 'top'
            },
            title: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid:{
                    display:false
                },
                beginAtZero: true
            }
        }
    }
});


// set the language
// Fetch and populate the language dropdown
async function fetchLanguages() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
  
      const languageList = document.getElementById("languageList");
      languageList.innerHTML = ""; // Clear previous items
  
      countries.forEach((country) => {
        if (country.languages) {
          const langKey = Object.keys(country.languages)[0]; // Get first language
          const languageName = country.languages[langKey]; // Language name
          const countryCode = country.cca2.toLowerCase(); // Country code for flag
  
          // Create dropdown item
          const listItem = document.createElement("li");
          listItem.innerHTML = `
              <a class="dropdown-item language-selector" href="#">
                  <img src="https://flagcdn.com/w40/${countryCode}.png" class="flag" alt="Flag" width:40px; height:20px;>
                  <span>${languageName} (${country.cca2})</span>
              </a>
          `;
  
          // Add click event to update selected language
          listItem.addEventListener("click", () => {
            document.getElementById("selectedFlag").innerHTML = `
                  <img src="https://flagcdn.com/w40/${countryCode}.png" class="flag" alt="Flag">
              `;
            document.getElementById(
              "selectedLanguage"
            ).textContent = `${languageName} (${country.cca2})`;
          });
  
          languageList.appendChild(listItem);
        }
      });
  
      console.log("Dropdown items added:", languageList.innerHTML); // Debugging
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  fetchLanguages();

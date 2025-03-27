// Chart.js - Payment Overview Graph
const ctx = document.getElementById('paymentChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan',"", 'Feb',"", 'Mar',"", 'Apr',"", 'May', "",'Jun',"", 'Jul',"", 'Aug',"", 'Sep',"", 'Oct',"", 'Nov', "",'Dec'],
        datasets: [
            {
                data: [20, 30, 45, 50, 70, 65, 85, 90, 120, 110, 95, 80,20, 30, 45, 50, 70, 65, 85, 90, 120, 110, 95, 80],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                pointRadius: 0,
                tension: 0.2 // Makes the line smooth

            },
            {
                data: [15, 24, 35, 40, 65, 40, 55, 70, 110, 100, 85, 65,40, 65, 40, 55, 70, 110, 100, 85, 65,15, 24, 35],
                backgroundColor: 'rgba(255, 99, 133, 0.46)',
                fill: true,
                pointRadius: 0,
                tension: 0.2 // Makes the line smooth

            },
            {
                data: [25, 20, 50, 30, 55, 30, 65, 75, 90, 80, 75, 65, 50, 30, 55, 30, 65, 75, 90, 80, 75, 65,25, 20],
                backgroundColor: 'rgba(255, 99, 133, 0.56)',
                fill: true,
                pointRadius: 0,
                tension: 0.2 // Makes the line smooth

            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false // Hides the legend (labels on top)
            }
        },
        elements: {
            point: {
                radius: 0 // Removes data point markers
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Removes vertical lines
                }
            },
            y: {
                grid: {
                    color: (context) => (context.tick.value % 20 === 0 ? 'rgba(200, 200, 200, 0.5)' : 'transparent') 
                    // Shows horizontal lines only at intervals of 20
                }
            }
        }
    }
});
// dynamic toggle button
document
  .getElementById("createAccountBtn")
  .addEventListener("click", function () {
    this.classList.add("btn-primary");
    document
      .getElementById("accountOverviewBtn")
      .classList.remove("btn-primary");
    window.location.href = "CreateAccount.html";
  });

document
  .getElementById("accountOverviewBtn")
  .addEventListener("click", function () {
    this.classList.add("btn-primary");
    document.getElementById("createAccountBtn").classList.remove("btn-primary");
    window.location.href = "Make-a-Payment.html";
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
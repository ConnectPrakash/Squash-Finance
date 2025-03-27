document.addEventListener("DOMContentLoaded", function () {
    const ctx2 = document.getElementById("depositsChart")?.getContext("2d");
    const ctx1 = document.getElementById("paymentChart")?.getContext("2d");
    const ctx3 = document.getElementById("accountBalanceChart")?.getContext("2d");
    const ctx4 = document.getElementById("depositBalanceChart")?.getContext("2d");

    // ✅ Deposits Account - Horizontal Bar Chart
    if (ctx2) {
        new Chart(ctx2, {
            type: "bar",
            data: {
                labels: ["Saving Deposit", "Fixed Deposit", "Joint Deposit", "No Interest"],
                datasets: [{
                    data: [85, 50, 30, 15],
                    backgroundColor: ["#FF5722", "#3F51B5", "#9C27B0", "#009688"],
                    borderRadius: 5,
                    barThickness: 10, // Increased for better visibility
                    maxBarThickness: 20,
                }],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        min: 0,
                        max: 100,
                        ticks: { callback: (value) => value + "%" },
                        grid: { display: false },
                    },
                    y: { grid: { display: false } },
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => `${tooltipItem.raw}%`,
                        },
                    },
                },
            },
        });
    }

    // ✅ Payment Line Chart
    if (ctx1) {
        new Chart(ctx1, {
            type: "line",
            data: {
                labels: Array(40).fill(""),
                datasets: [{
                    label: "Payments",
                    data: [
                        60, 150, 200, 200, 200, 200, 200, 200, 200, 200, 200, 220, 300, 300,
                        400, 400, 400, 400, 400, 400, 400, 400, 450, 450, 450, 450, 450, 450,
                        450, 450, 450, 500, 600, 800, 800, 800, 800, 900, 950, 950, 950, 1000
                    ],
                    borderColor: "#5865F2",
                    fill: true,
                    backgroundColor: "rgba(88, 101, 242, 0.1)",
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 0, // Hide points
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { grid: { display: false } },
                    y: {
                        grid: { display: false },
                        ticks: {
                            callback: (value) => [0, 60, 100, 200, 500, 1000].includes(value) ? `$${value}` : "",
                        },
                        min: 0,
                        max: 1000,
                    },
                },
                plugins: { legend: { display: false } },
            },
        });
    }

    // ✅ Account Balance Doughnut Chart
    if (ctx3) {
        new Chart(ctx3, {
            type: "doughnut",
            data: {
                labels: ["USD", "EUR", "RUB", "GBP"],
                datasets: [{
                    data: [23232, 12326, 11458, 9235],
                    backgroundColor: ["#3e95cd", "#e386e3", "#3cba9f", "#ffa726"],
                    hoverOffset: 5,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "70%", // Creates the hollow effect
                plugins: { legend: { display: false } },
            },
        });
    }

    // ✅ Deposit Balance Pie Chart
    if (ctx4) {
        new Chart(ctx4, {
            type: "pie",
            data: {
                labels: ["USD", "EUR", "RUB", "GBP"], // Labels for reference
                datasets: [{
                    data: [23232, 12326, 11458, 9235],
                    backgroundColor: ["#3e95cd", "#3cba9f", "#ffa726", "#8e5ea2"],
                    hoverOffset: 5,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }, // ❌ Hide legend
                    tooltip: { enabled: false } // ❌ Hide tooltips
                }
            },
            plugins: [{
                id: "insideLabels",
                afterDraw: function (chart) {
                    const ctx = chart.ctx;
                    const dataset = chart.data.datasets[0];
                    const meta = chart.getDatasetMeta(0);
        
                    ctx.font = "bold 14px Arial";
                    ctx.fillStyle = "#fff"; // White text for better visibility
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
        
                    meta.data.forEach((element, index) => {
                        const model = element.tooltipPosition();
                        const label = chart.data.labels[index]; // Get "USD", "EUR", etc.
        
                        ctx.fillText(label, model.x, model.y); // Print label inside its respective slice
                    });
                }
            }]
        });

        
    }

    // ✅ Dynamic Toggle Buttons (with error handling)
    try {
        document.getElementById("createAccountBtn").addEventListener("click", function () {
            this.classList.add("btn-primary");
            document.getElementById("accountOverviewBtn").classList.remove("btn-primary");
        });

        document.getElementById("accountOverviewBtn").addEventListener("click", function () {
            this.classList.add("btn-primary");
            document.getElementById("createAccountBtn").classList.remove("btn-primary");
            window.location.href = "AccountOverview.html";
        });
    } catch (error) {
        console.warn("Toggle buttons not found. Skipping event listeners.");
    }


     // Fetch and populate the language dropdown
  fetchLanguages();
});


// 
const tableBody = document.getElementById("paymentTable");

    // Sample Data
    const payments = [
        { account: "999 *** *** 127", currency: "#521452", balance: "Visa", status: "Delivered" },
        { account: "874 *** *** 125", currency: "#521452", balance: "Paypal", status: "In Transit" },
        { account: "874 *** *** 445", currency: "#521452", balance: "Payoneer", status: "Delayed" },
        { account: "999 *** *** 127", currency: "#521452", balance: "Visa", status: "Delivered" }
    ];

    // Status badge styles
    const statusClasses = {
        "Delivered": "status-delivered",
        "In Transit": "status-in-transit",
        "Delayed": "status-delayed"
    };

    // Generate table rows dynamically
    payments.forEach(payment => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${payment.account}</td>
            <td>${payment.currency}</td>
            <td>${payment.balance}</td>
            <td><span class="status ${statusClasses[payment.status]}">${payment.status}</span></td>
            <td class="more-options">⋮</td>
        `;
        tableBody.appendChild(row);
    });


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
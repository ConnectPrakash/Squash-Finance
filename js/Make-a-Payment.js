// dynamic toggle button
document
  .getElementById("createAccountBtn")
  .addEventListener("click", function () {
    this.classList.add("active");
    document
      .getElementById("accountOverviewBtn")
      .classList.remove("active");
    window.location.href = "Payment.html";
  });

document
  .getElementById("accountOverviewBtn")
  .addEventListener("click", function () {
    this.classList.add("active");
    document.getElementById("createAccountBtn").classList.remove("active");
    window.location.href = "Make-a-Payment.html";
  });

  document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('paymentChart').getContext('2d');

    // Create gradient for chart fill
    let gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#229BFE');
    gradient.addColorStop(1, 'rgba(246, 246, 247, 0)');

    const paymentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan',"", 'Feb',"", 'Mar',"", 'Apr',"", 'May',"", 'Jun',"", 'Jul',"", 'Aug', "",'Sep',"", 'Oct',"", 'Nov',"", 'Dec'],
            datasets: [{
                label: 'Transactions',
                data: [20, 15, 50, 30, 45, 20, 60, 30, 90, 55, 75, 50, 30, 22, 47, 55, 32, 10,35,20,50,75,60],
                borderColor: '#229BFE',
                backgroundColor: gradient,
                fill: true,
                
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
});

 // Simple exchange conversion
 document.getElementById('spendAmount').addEventListener('input', function() {
    let usd = parseFloat(this.value);
    document.getElementById('receiveAmount').value = (usd * 0.92).toFixed(2);
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
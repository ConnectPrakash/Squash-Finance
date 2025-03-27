const invoices = [
    { name: "Vacation Savings", no: "#106015", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "paid" },
    { name: "Travel Fund", no: "#106016", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "paid" },
    { name: "Technology Upgrade Fund", no: "#106017", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "rejected" },
    { name: "Social Responsibility Donation", no: "#106018", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "unpaid" },
    { name: "Retirement Fund", no: "#106019", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "paid" },
    { name: "Vacation Savings", no: "#106015", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "paid" },
    { name: "Travel Fund", no: "#106016", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "paid" },
    { name: "Technology Upgrade Fund", no: "#106017", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "rejected" },
    { name: "Social Responsibility Donation", no: "#106018", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "unpaid" },
    
];

function populateTable() {
    const tbody = document.getElementById("invoice-table-body");
    tbody.innerHTML = "";
    invoices.forEach(invoice => {
        tbody.innerHTML += `
            <tr>
                <th><input type="checkbox"></th>
                <td>${invoice.name}</td>
                <td>${invoice.no}</td>
                <td>${invoice.amount}</td>
                <td>${invoice.rate}</td>
                <td>${invoice.due}</td>
                <td><span class="status-${invoice.status}">${invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}</span></td>
            </tr>
        `;
    });
}
populateTable();

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
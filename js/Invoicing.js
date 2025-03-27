const invoices = [
    { name: "Vacation Savings", no: "#106015", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Paid" },
    { name: "Travel Fund", no: "#106016", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Paid" },
    { name: "Technology Upgrade Fund", no: "#106017", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Rejected" },
    { name: "Social Responsibility Donation", no: "#106018", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Unpaid" },
    { name: "Retirement Fund", no: "#106019", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Paid" },
    { name: "Real Estate Investment", no: "#106020", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Rejected" },
    { name: "Rainy Day Fund", no: "#106021", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Paid" },
    { name: "Property Purchase", no: "#106022", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Rejected" },
    { name: "Personal Project Funding", no: "#106023", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Unpaid" },
    { name: "Personal Development", no: "#106024", amount: "$495.54", rate: "100%", due: "07/05/2029", status: "Paid" },
];

function renderTable() {
    const tableBody = document.getElementById("invoiceTable");
    tableBody.innerHTML = "";
    invoices.forEach(invoice => {
        tableBody.innerHTML += `
            <tr>
                <td><input type="checkbox"></td>
                <td>${invoice.name}</td>
                <td>${invoice.no}</td>
                <td>${invoice.amount}</td>
                <td>${invoice.rate}</td>
                <td>${invoice.due}</td>
                <td><span class="status-badge ${getStatusClass(invoice.status)}">${invoice.status}</span></td>
                <td><button class="btn btn-light">⋮</button></td>
            </tr>
        `;
    });
}

function getStatusClass(status) {
    switch (status) {
        case "Paid": return "status-paid";
        case "Unpaid": return "status-unpaid";
        case "Rejected": return "status-rejected";
        default: return "";
    }
}

// Search functionality
document.getElementById("searchInput").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const filteredInvoices = invoices.filter(invoice =>
        invoice.name.toLowerCase().includes(searchText) ||
        invoice.no.toLowerCase().includes(searchText) ||
        invoice.amount.includes(searchText) ||
        invoice.status.toLowerCase().includes(searchText)
    );
    renderTable(filteredInvoices);
});

// Pagination (dummy functionality)
function changePage(page) {
    document.querySelectorAll(".pagination .page-item").forEach(item => item.classList.remove("active"));
    document.querySelector(`.pagination .page-item:nth-child(${page + 1})`).classList.add("active");
}

function prevPage() {
    alert("Previous page clicked!");
}

function nextPage() {
    alert("Next page clicked!");
}

renderTable();

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
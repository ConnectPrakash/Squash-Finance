// document.addEventListener("DOMContentLoaded", function () {
//   // ✅ Detect if the page was refreshed
//   if (performance.navigation.type === 1) {
//     console.log("Page was refreshed! Redirecting to Main2.js...");
//     window.location.href = "Main2.html"; // Redirect to Main2.js
//   }

//   // ✅ Your existing code for handling Accounts page logic
//   console.log("Accounts.js is running...");
// });
// dynamic toggle button
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


const accounts = [
  {
    number: "999 *** *** 127",
    currency: "EUR",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-01",
    status: "Success",
  },
  {
    number: "874 *** *** 445",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-02",
    status: "Success",
  },
  {
    number: "874 *** *** 125",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-03",
    status: "Cancelled",
  },
  {
    number: "874 *** *** 475",
    currency: "EUR",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-04",
    status: "Success",
  },
  {
    number: "874 *** *** 475",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-05",
    status: "Success",
  },
  {
    number: "999 *** *** 127",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-06",
    status: "Cancelled",
  },
  {
    number: "874 *** *** 125",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-07",
    status: "Success",
  },
  {
    number: "874 *** *** 475",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-08",
    status: "Cancelled",
  },
  {
    number: "999 *** *** 127",
    currency: "EUR",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-01",
    status: "Success",
  },
  {
    number: "874 *** *** 445",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-02",
    status: "Success",
  },
  {
    number: "874 *** *** 125",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-03",
    status: "Cancelled",
  },
  {
    number: "874 *** *** 475",
    currency: "EUR",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-04",
    status: "Success",
  },
  {
    number: "874 *** *** 475",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-05",
    status: "Success",
  },
  {
    number: "999 *** *** 127",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-06",
    status: "Cancelled",
  },
  {
    number: "874 *** *** 125",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-07",
    status: "Success",
  },
  {
    number: "874 *** *** 475",
    currency: "USD",
    bank: "UniCredit",
    balance: "$8,521,212",
    expiry: "2024-10-08",
    status: "Cancelled",
  },
];

let currentPage = 1;
const rowsPerPage = 12;

function displayAccounts() {
  const tableBody = document.getElementById("accountTableBody");
  tableBody.innerHTML = ""; // Clear table before adding rows

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedAccounts = accounts.slice(start, end);

  paginatedAccounts.forEach((account) => {
    const row = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${account.number}</td>
                <td>${account.currency}</td>
                <td>${account.bank}</td>
                <td>${account.balance}</td>
                <td>${account.expiry}</td>
                <td><span class="status-${account.status.toLowerCase()}">${
      account.status
    }</span></td>
                <td><button class="btn btn-light">...</button></td>
            </tr>`;
    tableBody.innerHTML += row;
  });
}

// Pagination Controls
document.getElementById("prevPage").addEventListener("click", function () {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

document.getElementById("nextPage").addEventListener("click", function () {
  if (currentPage * rowsPerPage < accounts.length) {
    currentPage++;
    updatePagination();
  }
});

function updatePagination() {
  document.getElementById("currentPage").textContent = currentPage;
  displayAccounts();
}

// Search Functionality
document.getElementById("searchInput").addEventListener("input", function () {
  const searchText = this.value.toLowerCase();
  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.number.includes(searchText) ||
      acc.currency.toLowerCase().includes(searchText) ||
      acc.bank.toLowerCase().includes(searchText)
  );

  const tableBody = document.getElementById("accountTableBody");
  tableBody.innerHTML = "";

  filteredAccounts.forEach((account) => {
    const row = `
            <tr>
                <td><input type="checkbox"></td>
                <td>${account.number}</td>
                <td>${account.currency}</td>
                <td>${account.bank}</td>
                <td>${account.balance}</td>
                <td>${account.expiry}</td>
                <td><span class="status-${account.status.toLowerCase()}">${
      account.status
    }</span></td>
                <td><button class="btn btn-light">...</button></td>
            </tr>
        `;
    tableBody.innerHTML += row;
  });
});

// Load initial data
displayAccounts();

//     // Breadcrumb modules

//     function changePage(page, title) {
//         const breadcrumb = document.getElementById("breadcrumb");

//         // Clear previous breadcrumb
//         breadcrumb.innerHTML = '';

//         // Add "Home" as the first breadcrumb item
//         breadcrumb.innerHTML += `
//     <li class="breadcrumb-item"><a href="Main.html">Home</a></li>
// `;

//         // Add the current page as the second item (active)
//         if (page !== "Dashboard.html") {
//             breadcrumb.innerHTML += `
//         <li class="breadcrumb-item active" aria-current="page">${title}</li>
//     `;
//         }
//     }

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
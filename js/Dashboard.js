// document.addEventListener("DOMContentLoaded", function () {
//     // ✅ Detect if the page was refreshed
//   if (performance.navigation.type === 1) {
//     console.log("Page was refreshed! Redirecting to Main2.js...");
//     window.location.href = "Dashboard.html"; // Redirect to Main2.js
//   }

//   // ✅ Your existing code for handling Accounts page logic
//   console.log("Accounts.js is running...");

//     // // ✅ Load Sidebar Dynamically
//     fetch("Sidebar.html")
//         .then(response => response.text())
//         .then(html => {
//             document.getElementById("sidebar-container").innerHTML = html;
//             setupNavLinks(); // ✅ Attach event listeners to sidebar links
//         })
//         .catch(error => console.error("Error loading sidebar:", error));

//     // ✅ Function to Load Pages Dynamically
//     function loadPage(page, title) {
//         const contentContainer = document.getElementById("content-container");
//         const navbarTitle = document.querySelector(".navbar-brand");

//         if (!contentContainer || !navbarTitle) {
//             console.error("Error: Missing content-container or navbar-brand!");
//             return;
//         }

//         fetch(page)
//             .then(response => response.text())
//             .then(html => {
//                 contentContainer.innerHTML = html;
//                 navbarTitle.textContent = title; // ✅ Update navbar title
//                 history.pushState({ page, title }, "", page); // ✅ Update URL
//             })
//             .catch(error => console.error("Error loading page:", error));
//     }

//     // // ✅ Function to Setup Navigation Links
//     function setupNavLinks() {
//         document.querySelectorAll("#sidebar-container .nav-link").forEach(link => {
//             link.addEventListener("click", function (event) {
//                 event.preventDefault();
//                 const page = this.getAttribute("data-page"); // e.g., "Accounts.html"
//                 const title = this.textContent.trim(); // e.g., "Accounts"
//                 loadPage(page, title);
//                 changePage(page, title); // 🔹 Update breadcrumb dynamically

//             });
//         });
//     }

//     // ✅ Handle Back/Forward Navigation
//     window.onpopstate = function (event) {
//         if (event.state) {
//             loadPage(event.state.page, event.state.title);
//         }
//     };
// });
// Breadcrumb modules
function changePage(page, title) {
  const breadcrumb = document.getElementById("breadcrumb");

  // Clear previous breadcrumb
  breadcrumb.innerHTML = "";

  // Add "Home" as the first breadcrumb item
  breadcrumb.innerHTML += `
<li class="breadcrumb-item"><a href="Dashboard.html">Home</a></li>
`;

  // Add the current page as the second item (active)
  if (page !== "Dashboard.html") {
    breadcrumb.innerHTML += `
    <li class="breadcrumb-item active" aria-current="page">${title}</li>
`;
  }
}

// <!-- write the chart usint chart.js -->

var ctx = document.getElementById("myChart").getContext("2d");

// Create gradient for smooth fill effect
var incomeGradient = ctx.createLinearGradient(0, 0, 0, 400);
incomeGradient.addColorStop(0, "rgba(0, 0, 255, 0.34)"); // Light blue at the top
incomeGradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transparent at the bottom

var expensesGradient = ctx.createLinearGradient(0, 0, 0, 400);
expensesGradient.addColorStop(0, "rgba(255, 165, 0, 0.3)"); // Light orange at the top
expensesGradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transparent at the bottom

var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
    ],
    datasets: [
      {
        label: "Income",
        data: [500, 1000, 750, 1250, 900, 800, 1000, 600, 200, 850, 720],
        borderColor: "#3629B6",
        borderWidth: 1.5,
        backgroundColor: incomeGradient,
        fill: true,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Expenses",
        data: [300, 800, 500, 1000, 700, 620, 500, 550, 120, 650, 520],
        borderColor: "orange",
        borderWidth: 1.5,
        backgroundColor: expensesGradient,
        fill: true,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Hides vertical grid lines
      },
      y: {
        grid: { display: false }, // Hides horizontal grid lines ✅
      },
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    fetchLanguages();
    const lists = document.querySelectorAll(".nav li");
    lists.forEach((list) => {
      list.addEventListener("click", () => {
        document.querySelector(".nav li.active")?.classList.remove("active");
        list.classList.add("active");
      });
    });
  }, 500); // Small delay to ensure elements are loaded
});

// round circle
function setProgress(circleElement, percentage, color) {
  const circle = circleElement.querySelector(".progress-bar");
  const text = circleElement.querySelector(".progress-text");
  const circumference = 2 * Math.PI * 45; // Full circumference of the circle
  const offset = circumference - (percentage / 100) * circumference;

  // Set stroke offset and color
  circle.style.strokeDashoffset = offset;
  circle.style.stroke = color;

  // Update text inside the circle
  text.textContent = percentage + "%";
}

document.querySelectorAll(".progress-circle").forEach((circle) => {
  const percentage = parseFloat(circle.getAttribute("data-percentage"));
  const color = circle.getAttribute("data-color") || "#ff4b8b"; // Default color if not set
  setProgress(circle, percentage, color);
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

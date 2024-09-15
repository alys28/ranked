let names = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "William Brown",
  "Olivia Wilson",
  "James Miller",
  "Sophia Moore",
  "Robert Taylor",
  "Emma Anderson",
  "David Thomas",
  "Olivia Jackson",
  "Joseph White",
  "Sophia Harris",
  "Charles Martin",
  "Emma Clark",
  "Joseph Lewis",
  "Mia Young",
  "Daniel Hall",
  "Ava Allen",
  "Matthew Hernandez",
  "Sophia King",
  "Andrew Wright",
  "Emma Lopez",
  "Joseph Hill",
  "Mia Scott",
  "Anthony Green",
  "Ava Adams",
  "Steven Baker",
  "Emma Nelson",
  "Brian Carter",
  "Mia Mitchell",
  "Kevin Roberts",
  "Ava Perez",
  "George Turner",
  "Emma Phillips",
  "Edward Campbell",
  "Mia Parker",
  "Ryan Evans",
  "Ava Edwards",
  "Patrick Collins",
  "Mia Stewart",
  "Alexander Sanchez",
  "Ava Morris",
  "Benjamin Rogers",
  "Mia Reed",
  "Samuel Cook",
  "Ava Morgan",
  "Richard Kelly",
  "Mia Bell",
  "Jeffrey Howard",
  "Ava Ward",
  "Raymond Brooks",
  "Mia Bailey",
  "Joe Sanders",
  "Ava Hughes",
  "Frank Ramirez",
  "Mia Price",
  "Gregory Bennett",
  "Ava Wood",
  "Stephen Foster",
  "Mia Barnes",
  "Patrick Jimenez",
  "Ava Fisher",
  "Dennis Castillo",
  "Mia Flores",
  "Eric Torres",
  "Ava Peterson",
  "Brett Webster",
  "Mia Gray",
  "Frederick Schmidt",
  "Ava Cooper",
  "Albert Reyes",
  "Mia Hughes",
  "Carlos Murphy",
  "Ava Long",
  "Russell Myers",
  "Mia Ross",
  "Vincent Boyd",
  "Ava Cole",
  "Philip Maxwell",
  "Mia Stone",
  "Brett Sandoval",
  "Ava Hawkins",
  "Derek Luna",
  "Mia Rhodes",
  "Harold Salazar",
  "Ava Hunt",
  "Randy Hampton",
  "Mia Black",
  "Gerald Lamb",
  "Ava Daniels",
  "Milton Guerrero",
  "Mia Palmer",
  "Sean George",
  "Ava Dunn",
  "Kenneth Sims",
  "Mia Perkins",
  "Eugene Lyons",
  "Ava Simpson",
  "Victor Alexander",
  "Mia Butler",
  "Brett Patterson",
  "Ava McDonald",
  "Derek Morgan",
  "Mia Roberts",
  "Harold Fuller",
  "Ava Fox",
  "Randy Vargas",
  "Mia Benson",
  "Gerald Chen",
  "Ava Warner",
  "Milton Wong",
  "Mia Castillo",
  "Sean Romero",
  "Ava Santos",
  "Kenneth Combs",
  "Mia Ellis",
  "Eugene Andrews",
  "Ava Webb",
  "Victor Diaz",
  "Mia Coleman",
  "Brett Snyder",
  "Ava Simmons",
  "Derek Jimenez",
  "Mia Obrien",
  "Harold Lawson",
  "Ava Reyes",
  "Randy Stephens",
  "Mia Lucas",
  "Gerald Mitchell",
  "Ava Crawford",
  "Milton Olson",
  "Mia Harrison",
  "Sean Cardenas",
  "Ava Mendoza",
  "Kenneth Navarro",
  "Mia Gordon",
  "Eugene Murray",
  "Ava Lloyd",
  "Victor Cunningham",
  "Mia Keller",
  "Brett Klein",
  "Ava Saunders",
  "Derek Guzman",
  "Mia Jennings",
  "Harold Noble",
  "Ava Fitzgerald",
  "Randy Joyce",
  "Mia Diaz",
  "Gerald Davenport",
  "Ava Conner",
  "Milton Mcguire",
  "Mia Sutton",
  "Sean Barker",
  "Ava Moss",
  "Kenneth Rowland",
  "Mia Portillo",
  "Eugene Le",
  "Ava Lucero",
  "Victor Barrera",
  "Mia Vang",
  "Brett Ho",
  "Ava Kemp",
  "Derek Galvan",
  "Mia Archuleta",
  "Harold Buchanan",
  "Ava Mccarthy",
  "Randy Good",
  "Mia Wise",
  "Gerald Briggs",
  "Ava Coffey",
  "Milton Noel",
  "Mia Stark",
  "Sean Leblanc",
  "Ava Stout",
  "Kenneth Godfrey",
  "Mia Cornell",
  "Eugene Potter",
  "Ava Nielsen",
  "Victor Love",
  "Mia Cheng",
  "Brett Burgess",
  "Ava Rocha",
  "Derek Choi",
  "Mia Shah",
  "Harold Molina",
  "Ava Schroeder",
  "Randy Nolan",
  "Mia Esparza",
  "Gerald French",
  "Ava Charles",
  "Milton Sloan",
  "Mia Mcconnell",
  "Sean Bradford",
  "Ava Landry",
  "Kenneth Wolfe",
  "Mia Christensen",
  "Eugene Malone",
  "Ava Preston",
  "Victor Sherman",
  "Mia Ayers",
  "Brett Shea",
  "Ava Fuentes",
  "Derek Potts",
  "Mia Hurst",
  "Harold Mcclain",
  "Ava McCullough",
  "Randy Oneal",
  "Mia Parsons",
  "Gerald Fischer",
  "Ava Morgan",
  "Milton Montes",
  "Mia Kent",
  "Sean Vaughan",
  "Ava Bates",
  "Kenneth Goldberg",
  "Mia Mcclure",
  "Eugene Robbins",
  "Ava Landry",
  "Victor Leblanc",
  "Mia Conley",
  "Brett Valenzuela",
  "Ava Christian",
  "Derek Maldonado",
  "Mia Wall",
  "Harold Case",
  "Ava Delacruz",
  "Randy Sparks",
  "Mia Eaton",
  "Gerald Norton",
  "Ava Mckee",
  "Milton Mansfield",
  "Mia Solis",
  "Sean Schwartz",
  "Ava Phelps",
  "Kenneth Barton",
  "Mia Cline",
  "Eugene Goodman",
  "Ava Hanna",
];

document
  .getElementById("show-reviews-button")
  .addEventListener("click", async () => {
    const [activeTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (activeTab) {
      const url = activeTab.url;
      console.log(`Current URL: ${url}`);

      try {
        const reviews = await sendToServer(url);
        let reviewsContainer = null;

        if (reviews != null) {
          if (document.getElementById("no-reviews").style.display == "none") {
            populate_reviews(reviews);
            reviewsContainer = document.getElementById("reviews-container");
          }
          document.getElementById("no-reviews").style.display = "none";
        } else {
          reviewsContainer = document.getElementById("no-reviews");
          document.getElementById("reviews-container").style.display = "none";
        }

        if (
          reviewsContainer.style.display === "none" ||
          reviewsContainer.style.display === ""
        ) {
          reviewsContainer.style.display = "block";
          document.getElementById("show-reviews-button").textContent =
            "Hide Reviews";
        } else {
          reviewsContainer.style.display = "none";
          document.getElementById("show-reviews-button").textContent =
            "Show Reviews";
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }
  });

function getRandomColor() {
  let color = "#";
  do {
    color = Math.floor(Math.random() * 16777215).toString(16);
  } while (color === "ffffff" || color.length < 6); // Ensure it's not white or a shorter color
  return `#${color}`;
}

function populate_reviews(reviews) {
  const reviewsContainer = document.getElementById("reviews-container");
  if (reviewsContainer.innerHTML == "") {
    console.log(reviews);
    reviews.forEach((tuple, index) => {
      review = tuple[0];
      // Review container div
      const reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review");
      reviewDiv.id = `review${index + 1}`;

      // Review author div
      const reviewAuthorDiv = document.createElement("div");
      reviewAuthorDiv.classList.add("review-author");
      reviewAuthorDiv.id = `review-author${index + 1}`;

      // Profile image div
      const name = names[Math.floor(Math.random() * names.length)];
      const profileCircleDiv = document.createElement("div");
      profileCircleDiv.classList.add("profile-circle");
      profileCircleDiv.innerText = name.charAt(0); // First letter of the author
      profileCircleDiv.style.backgroundColor = getRandomColor(); // Set random background color

      reviewAuthorDiv.appendChild(profileCircleDiv);
      reviewAuthorDiv.appendChild(document.createTextNode(name));
      const reviewContentDiv = document.createElement("div");
      reviewContentDiv.classList.add("review-content");
      reviewContentDiv.id = `review-content${index + 1}`;
      reviewContentDiv.innerText = review;
      reviewDiv.appendChild(reviewAuthorDiv);
      reviewDiv.appendChild(reviewContentDiv);
      reviewsContainer.appendChild(reviewDiv);
    });
  }
}

function sendToServer(link) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    var baseUrl = "http://127.0.0.1:5000/";
    var params = "?link=" + encodeURIComponent(link);

    xhr.open("GET", baseUrl + params, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status != 200) {
          console.error("Error:", xhr.status, xhr.statusText);
          reject(xhr.statusText);
        } else {
          console.log("Success:", xhr.responseText);
          let reviews = JSON.parse(xhr.responseText).message;
          resolve(reviews);
        }
      }
    };
  });
}

document.getElementById("submit-review").addEventListener("click", () => {
  const reviewForm = document.getElementById("review-form");
  reviewForm.style.display =
    reviewForm.style.display === "none" ? "block" : "none";
});

document.getElementById("submit-review-form").addEventListener("click", () => {
  const reviewText = document.getElementById("review-text").value;
  if (reviewText) {
    sendReviewInfo(reviewText);
    document.getElementById("review-text").value = "";
    document.getElementById("review-form").style.display = "none"; // Hide the form after submission
  }
});

// function getEmailFromServer() {
//   return new Promise((resolve, reject) => {
//     var xhr = new XMLHttpRequest();
//     var baseUrl = "http://127.0.0.1:5000/email";
//     xhr.open("GET", baseUrl, true);
//     xhr.send();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState == 4) {
//         if (xhr.status != 200) {
//           console.error("Error:", xhr.status, xhr.statusText);
//           reject(xhr.statusText);
//         } else {
//           try {
//             const response = JSON.parse(xhr.responseText);
//             resolve(response.message);
//           } catch (e) {
//             reject("Invalid JSON response");
//           }
//         }
//       }
//     };
//   });
// }

async function sendReviewInfo(reviewText) {
  let emailString = null;
  let urlString = null;

  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2)
    emailString = parts.pop().split(";").shift().textContent =
      cookieValue || null;

  // try {
  //   emailString = await getEmailFromServer();
  // } catch (error) {
  //   console.error("Failed to fetch email:", error);
  // }

  const [activeTab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  if (activeTab) urlString = activeTab.url;
  console.log(urlString);

  const base = "https://www.amazon.ca/";
  const dpSegment = "/dp/";
  urlString = urlString.substring(
    urlString.indexOf(base) + base.length,
    urlString.indexOf(dpSegment)
  );

  var reviewInfo = {
    email: emailString.trim(),
    review: reviewText,
    url: urlString,
  };

  const endpointUrl = "https://runk-backend.vercel.app/add_product";
  const headers = {
    "Content-Type": "application/json",
  };

  async function sendData() {
    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(reviewInfo),
      });
      const data = await response.json();
      const reviews = data.message || null;
      console.log(reviews);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  console.log(reviewInfo);
  sendData();
}

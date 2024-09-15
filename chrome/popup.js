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
      var reviews = null;

      // Send the URL to the Flask server
      try {
        reviews = sendToServer(url);
      } catch (error) {
        console.error("Error sending URL to Flask server:", error);
      }

      // Toggle visibility of the reviews
      if (reviews != null)
        var reviewsContainer = document.getElementById("reviews-container");
      else if (
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
    }
  });

function sendToServer(link) {
  var xhr = new XMLHttpRequest();
  var baseUrl = "http://127.0.0.1:5000/";
  var params = "?link=" + encodeURIComponent(link);

  // Open a GET request with the composed URL
  xhr.open("GET", baseUrl + params, true);

  // Send the request
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var reviews = null;

      if (xhr.status != 200) {
        console.error("Error:", xhr.status, xhr.statusText);
      } else {
        console.log("Success:", xhr.responseText);
        reviews = JSON.parse(xhr.responseText).message;
      }
      return reviews;
    }
  };
}

document.getElementById("submit-review").addEventListener("click", () => {
  const reviewForm = document.getElementById("review-form");
  reviewForm.style.display =
    reviewForm.style.display === "none" ? "block" : "none";
});

document.getElementById("submit-review-form").addEventListener("click", () => {
  const reviewText = document.getElementById("review-text").value;
  if (reviewText) {
    // For demonstration purposes, we'll just log the review text to the console.
    console.log("Review submitted:", reviewText);
    // Optionally, you could add the new review to the reviews container here.
    // Reset form
    document.getElementById("review-text").value = "";
    document.getElementById("review-form").style.display = "none"; // Hide the form after submission
  }
});

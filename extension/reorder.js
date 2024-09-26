document.addEventListener("DOMContentLoaded", () => {
  clickBTN();
});

function clickBTN() {
  document.getElementById("amazon").addEventListener("click", () => {
    var button = document.getElementById("amazon");
    if (button) {
      // Change the button text to "Reordering..."
      button.textContent = "Reranking...";
    }
    sendToServer(searchForAmazonTitle());
  });
}

function searchForAmazonTitle() {
  return document.getElementById("productTitle");
}

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
      var button = document.getElementById("amazon");

      if (xhr.status != 200) {
        console.error("Error:", xhr.status, xhr.statusText);
      } else {
        console.log("Success:", xhr.responseText);
      }

      // After 2 seconds, revert the button text back to "Reorder"
      setTimeout(function () {
        if (button) {
          button.textContent = "Re-rank reviews";
        }
      }, 2000);
    }
  };
}

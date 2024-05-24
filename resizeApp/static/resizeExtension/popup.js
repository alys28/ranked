document.addEventListener("DOMContentLoaded", clickBTN);

function clickBTN() {
  document
    .getElementById("resizeBTN")
    .addEventListener("click", debounce(extract, 1000));
}

function debounce(func, delay) {
  let timeoutId;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    document.getElementById("resizeBTN").textContent = "Downloading...";
    timeoutId = setTimeout(() => {
      document.getElementById("resizeBTN").textContent = "Resize";
      func.apply(context, args);
    }, delay);
  };
}

function getURL(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  var link;
  doc.querySelectorAll("img").forEach(function (element) {
    var firstAttribute = element.attributes[0];
    if (
      (firstAttribute.nodeName == "src" &&
        firstAttribute.nodeValue.startsWith("https://") &&
        !firstAttribute.nodeValue.includes("encrypted")) ||
      (firstAttribute.nodeName == "style" &&
        !element.getAttribute("src").includes("encrypted"))
    ) {
      link = element.getAttribute("src");
    }
  });
  return link;
}

function getFileName(html, url) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  var textarea = doc.querySelector("textarea");
  if (textarea && textarea.length != 0) return textarea.textContent.trim();

  var file_name = url.substring(url.lastIndexOf("/") + 1);
  return file_name.split(".")[0];
}

function extract() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { action: "copyHTML" },
      function (response) {
        if (response && response.html) {
          url = getURL(response.html);
          file_name = getFileName(response.html, url);
          sendToServer(url, file_name);
        } else {
          console.log("No HTML received");
        }
      }
    );
  });
}

function titleCase(file_name) {
  let words = file_name.split(" ");
  let capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(" ");
}

function sendToServer(link, file_name) {
  var xhr = new XMLHttpRequest();
  var baseUrl = "http://127.0.0.1:8000/resize-image/";
  // if (file_name.includes(" ")) file_name = file_name.replace(/\s+/g, "-");

  var params =
    "?link=" +
    encodeURIComponent(link) +
    "&file_name=" +
    encodeURIComponent(titleCase(file_name));
  xhr.open("GET", baseUrl + params, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        console.log(xhr.responseText);
      } else {
        console.error("Error:", xhr.status, xhr.statusText);
      }
    }
  };
}

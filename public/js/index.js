const trascan = document.querySelector("a.delete");

trascan.addEventListener("click", (e) => {
  const endpoint = `/blogs/${trascan.dataset.doc}`;
  fetch(endpoint, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.redirected) {
        // Handle redirect
        window.location.href = response.url;
      } else {
        // Process the response as JSON if not redirected
        return response.json();
      }
    })
    .then((data) => {
      // Handle JSON response if not redirected
      if (data) {
        window.location.href = data.redirect;
      }
    })
    .catch((err) => console.log("index.js line 23",err));
});

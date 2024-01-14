const trascan = document.querySelector("a.delete");

if (trascan) {
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
      .catch((err) => console.log("index.js line 23", err));
  });
}

// like functionality
const likeIcon = document.querySelector(".like-post-icon");
if (likeIcon) {
  // console.log(likeIcon);
  likeIcon.addEventListener("click", (e) => {
    const endpoint = `/blogs/${likeIcon.dataset.doc}`;
    fetch(endpoint, {
      method: "PUT",
    })
    .then((response) => {
        window.location.href = response.url;
    })
    .catch((err) => console.log("index.js line 23", err));
});
}

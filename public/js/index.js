const trascan = document.querySelector("a.delete");

trascan.addEventListener("click", (e) => {
  const endpoint = `/blogs/${trascan.dataset.doc}`;
  fetch(endpoint, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data)=>window.location.href=data.redirect)
    .catch((err) => console.log(err));
});

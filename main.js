fetch("include/header.html")
  .then((response) => response.text())
  .then((data) => document.querySelector("#header").innerHTML = data);
fetch("include/footer.html")
  .then((response) => response.text())
  .then((data) => document.querySelector("#footer").innerHTML = data);
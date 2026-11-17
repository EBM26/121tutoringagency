// Current year in footer
document.querySelectorAll(".year").forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// Mobile menu
(function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setOpen(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });
})();

// Contact form: send with FormSubmit's AJAX endpoint and confirm on the page.
// Without JavaScript the form still posts normally and redirects to thanks.html.
(function () {
  var form = document.getElementById("contact-form");
  var card = document.getElementById("form-card");
  if (!form || !card || !window.fetch) return;

  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");
  var endpoint = form.action;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("form submitted with Dan's email");
    button.disabled = true;
    button.textContent = "Sending…";
    status.textContent = "";
    status.classList.remove("is-error");

    var data = new FormData(form);
    var email = data.get("email");

    fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    })
      .then(function (res) {
        return res.json().then(function (json) {
          if (!res.ok || !json.success) throw new Error(json.message || "Send failed");
        });
      })
      .then(function () {
        card.innerHTML =
          '<div class="form-done">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>' +
          '<h3 tabindex="-1">Message sent</h3>' +
          "<p>Thanks for reaching out. We’ll reply to <strong></strong> as soon as we can.</p>" +
          "</div>";
        card.querySelector("strong").textContent = email;
        card.querySelector("h3").focus();
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = "Send message";
        status.classList.add("is-error");
        status.innerHTML =
          'Your message didn’t go through. Try again, or call <a href="tel:+13109166568">(310) 916-6568</a>.';
      });
  });
})();

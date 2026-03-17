const circles = document.querySelectorAll(".circle");

circles.forEach(circle => {
  const percent = circle.getAttribute("data-percent");
  const progress = circle.querySelector(".progress");

  const offset = 377 - (377 * percent) / 100;

  progress.style.strokeDashoffset = offset;
});
const colorBoxes = document.querySelectorAll(".color-box");
const currentColorLabel = document.getElementById("currentColorLabel");
const body = document.body;

colorBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    const color = box.getAttribute("data-color");

    body.style.background = color;

    colorBoxes.forEach((b) => b.classList.remove("active"));
    box.classList.add("active");

    currentColorLabel.textContent = color;
  });
});

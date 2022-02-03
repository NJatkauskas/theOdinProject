const container = document.querySelector(".container");
const clear_btn = document.querySelector(".clear_btn");
const single_color_btn = document.querySelector(".single_color");
const multi_color_btn = document.querySelector(".multi_color");
const canvas_size = document.querySelector("#canvas_size");
const canvas_size_value = document.querySelector(".canvas_size_value");
const cell_size = document.querySelector("#cell_size");
const cell_size_value = document.querySelector(".cell_size_value");
const hex_color_values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
// Option found on the internet
const randColor = () => {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
};

let grid_size = cell_size.value; // 16
let container_size = canvas_size.value; //400
let square_width;
let colored_cells = [];

function makeGrid(size) {
  for (let i = 0; i < size * size; i++) {
    let new_div = document.createElement("div");
    new_div.classList.add("square");
    new_div.style.width = square_width + "px";
    new_div.style.height = square_width + "px";
    container.appendChild(new_div);
    new_div.addEventListener("mouseover", paintingMode);
  }
}

function paintingMode(e) {
  // Option A
  // e.target.style.backgroundColor = pickColor();
  // colored_cells.push(e.target.style);
  // Option B is better due to readability and if e name changes, changes will be needed in one place. And in option A if e name changes, changes will be required in many places.
  let single_squere = e.target.style;
  single_squere.backgroundColor = pickColor();
  colored_cells.push(single_squere);
}

function pickColor() {
  if (single_color_btn.classList.contains("active")) {
    return "rgba(255, 192, 203, 0.5)";
  } else if (multi_color_btn.classList.contains("active")) {
    return randColor();
  } else {
    return "unset";
  }
}
// Option I planned to use
function randomColor() {
  let randomColorHex = "#";
  for (let i = 0; i < 6; i++) {
    randomColorHex += hex_color_values[Math.floor(Math.random() * hex_color_values.length)];
  }
  return randomColorHex;
}

function clearChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setGridSize(canvas_size, cell_size) {
  container.style.width = Number(canvas_size) + "px";
  square_width = Number(canvas_size) / cell_size;
  makeGrid(cell_size);
}

function toggleClass(elem, className) {
  elem.target.classList.toggle(className);
}

single_color_btn.addEventListener("click", (e) => {
  toggleClass(e, "active");
  let multi_c_btn = multi_color_btn.classList;
  if (multi_c_btn.contains("active")) multi_c_btn.remove("active");
});

multi_color_btn.addEventListener("click", (e) => {
  toggleClass(e, "active");
  let single_c_btn = single_color_btn.classList;
  if (single_c_btn.contains("active")) single_c_btn.remove("active");
});

clear_btn.addEventListener("click", function (e) {
  colored_cells.forEach((item) => (item.backgroundColor = "unset"));
  colored_cells = [];
});

cell_size.addEventListener("change", function (e) {
  clearChilds(container);
  setGridSize(canvas_size.value, cell_size.value);
  cell_size_value.innerText = cell_size.value;
});
cell_size.addEventListener("input", function (e) {
  cell_size_value.innerText = cell_size.value;
});

canvas_size.addEventListener("change", function (e) {
  clearChilds(container);
  setGridSize(canvas_size.value, cell_size.value);
  canvas_size_value.innerText = canvas_size.value;
});
canvas_size.addEventListener("input", function (e) {
  canvas_size_value.innerText = canvas_size.value;
});

setGridSize(container_size, grid_size);

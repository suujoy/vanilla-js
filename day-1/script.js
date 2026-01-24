const display = document.querySelector(".display");
const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const reset = document.querySelector(".reset");

let count = 0;

increase.addEventListener("click", () => {
    count++;
    display.innerText = count;
});

decrease.addEventListener("click", () => {
    if (count > 0) count--;
    display.innerText = count;
});

reset.addEventListener("click", () => {
    count = 0;
    display.innerText = count;
});

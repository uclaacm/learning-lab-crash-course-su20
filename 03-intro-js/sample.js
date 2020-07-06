// sample.js
console.log("Hello World!");

document.getElementById("button").addEventListener("click", function(){
    let clickElement = document.getElementById("clicks");
    let currentClicks = Number(clickElement.innerHTML);
    clickElement.innerHTML = currentClicks + 1;
})
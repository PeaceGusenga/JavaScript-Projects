const lengthSlider = docment.querySelector(".pass-length input");

const updateSlider = () => {
    document.querySelectctor(".pass-length span").innerText = lengthSlider.value;
}

lengthSlider.addEventListener("input", updateSlider);
const lengthSlider = document.querySelector(".pass-length input"),
options =  document.querySelectorAll(".option input"),
generateBtn = document.querySelector(".generate-btn");

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
}

// letters, numbers and symbols used to generate passwords
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[]{}():;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    passLength = lengthSlider.value;

    //looping through each options checkbox
    options.forEach(option =>{ 
        // if checkbox is checked
        if(option.checked) { 

            staticPassword += characters[option.id]; 
        }
    });
    for (let i = 0; i < passLength; i++) {
        
        randomPassword += staticPassword[Math.floor(Math.random() * staticPassword.length)];
        
    }
}
updateSlider();

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
const lengthSlider = document.querySelector(".pass-length input"),
options =  document.querySelectorAll(".option input"),
passwordInput = document.querySelector(".input-box input"),
passIndicator = document.querySelector(".pass-indicator"),
generateBtn = document.querySelector(".generate-btn");

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
    excludeDuplicate = false;
    passLength = lengthSlider.value;

    //looping through each options checkbox
    options.forEach(option =>{ 
        // if checkbox is checked
        if(option.checked) { 
            // if exlude duplicate and or include spaces is notchecked
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];   
            }else if(option.id === "spaces"){ // if inlcude spaces is checked
                staticPassword += ' ${staticPassword} '; // add space to beggining and end of statsic password
            }else{ //if exlcude duplicates is checked
                excludeDuplicate = true;
            }
            
        }
    });

    // for loop to generate random password based on slider value
    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        // exlcude duplicate values logic
        if (excludeDuplicate) {
            // if randomPassword doesn't contain the current random character or randomChar is equal
            //to space " ", then add random character to randomPassword else decrement i by -1
            if (!randomPassword.includes(randomChar) || randomChar == " ") {
                randomPassword += randomChar;
            } else {
                i--;
            }
        } else { // else add random character to randomPassword
            randomPassword += randomChar;
        }

        passwordInput.value = randomPassword; // output random password to input box
    }
}

const updatePassIndicator = () => {
    //update passInidicator id to "weak", "medium" or "strong" based on the length of the password
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";

}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
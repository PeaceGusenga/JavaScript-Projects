const popup = document.querySelector(".popup"),
WiFiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title "),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");

let onlineStatus  = true, intervalId, timer = 10;

const checkOfflineStatus = async () =>{
    try {
        // try to fetch random data from the API, if the status code is between
        // 200 and 300, network connection is considerd Online.
        const response = await fetch ("https://jsonplaceholder.typicode.com/posts");
        onlineStatus = response.status >= 200 && response.status < 300;
    } catch (error) {
        onlineStatus = false; // if not 200 and 300, connection is considered Offline
    }
    timer = 10;
    clearIntervalId(intervalId);
    handlePopup(onlineStatus);
}

const handlePopup = (status) => {
    //if status is true (online), update icon, title and description accordingly
    if (status){
        WiFiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now successfully connected to the internet.";
        popup.classList.add("online");
        return setTimeout(() => popup.classList.remove("show"), 2000);
    }
    //if status is false (offline), update icon, title and description accordingly
    WiFiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.className = "popup show";
    
    /* Set an interval to decrease timer by 1 every second */
    intervalId = setInterval(() => {
        timer--;
        if(timer === 0) checkOfflineStatus(); // if timer is 0 run onlineStatus again.
        popup.document.querySelector(".desc b").innerText = timer;
    }, 1000);
}

// Only if onlineStatus is true, check offline status every 3 seconds
setInterval(() => onlineStatus && checkOfflineStatus(), 3000);
reconnectBtn.addEventListener("click", checkOfflineStatus);
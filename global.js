var SERVER = "http://localhost:8788";

if (window.location.href.includes("ngrok")) {
    SERVER = window.location.href.split(".ngrok-free.app")[0] + ".ngrok-free.app";
} else if (window.location.href.includes("wisk.cc")) {
    SERVER = "https://app.wisk.cc";
}

if (window.location.href.includes(".wisk.site")) {
    // get the subdomain and set the server
    const subdomain = window.location.href.split("https://")[1].split(".wisk.site")[0];
    SERVER = "https://" + subdomain + ".wisk.site";
}

function byId(id) {
    return document.getElementById(id);
}

function byClass(className) {
    return document.getElementsByClassName(className);
}

function byQuery(query) {
    return document.querySelector(query);
}

function byQueryAll(query) {
    return document.querySelectorAll(query);
}

function showToast(message, duration) {

    console.log(message);

    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fade-out');
        toast.addEventListener('animationend', () => {
            toast.parentNode.removeChild(toast);
        });
    }, duration);
}

window.showToast = showToast;

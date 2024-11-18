// sync with server
async function sync() {
    window.wisk.utils.showLoading("Syncing with server...");
    console.log("PAGE", window.wisk.editor.pageId);
    
    var pages = await window.wisk.db.getAllKeys();
    // upload all offline pages and update their IDs
    var offlinePages = [];
    for (var i = 0; i < pages.length; i++) {
        if (pages[i].startsWith("of-")) {
            var offlinePage = await window.wisk.db.getItem(pages[i]);
            offlinePages.push(offlinePage);
        }
    }

    console.log("Offline pages:", offlinePages);
}

let socket;
let firstMsg = true;

function initializeWebSocket() {
    return new Promise((resolve, reject) => {
        socket = new WebSocket('wss://cloud.wisk.cc/v1/live');
        
        socket.addEventListener('open', (event) => {
            console.log('Connected to WebSocket server');
            resolve();
        });

        socket.addEventListener('message', (event) => {
            handleIncomingMessage(event.data);
        });

        socket.addEventListener('error', (event) => {
            alert('Connection with server failed. Click OK to reload the page.');
            location.reload();
        });

        socket.addEventListener('close', (event) => {
            alert('Connection with server closed. Click OK to reload the page.');
            location.reload();
        });
    });
}

function sendMessage(message) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        console.log('Connection is not open. ReadyState:', socket ? socket.readyState : 'socket not initialized');
    }
}

function startMessageLoop(interval = 5000) {
    return setInterval(() => {
        sendMessage('hello');
    }, interval);
}

function stopMessageLoop(intervalId) {
    clearInterval(intervalId);
}

async function sendAuth() {
    var user = await document.querySelector('auth-component').getUserInfo();
    sendMessage(JSON.stringify({
        id: window.wisk.editor.pageId,
        token: user.token
    }));
}

async function live() {
    console.log("PAGE LIVE", window.wisk.editor.pageId);

    if (window.wisk.editor.wiskSite) {
        var u = await document.querySelector('auth-component').getUserInfo();

        var fetchUrl = 'https://cloud.wisk.cc/v1/new?doc=' + window.wisk.editor.pageId;
        var fetchOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + u.token

            },
        }

        var response = await fetch(fetchUrl, fetchOptions);

        if (response.status !== 200) {
            window.location.href = '/404.html';
            return;
        }

        var data = await response.json();
        initEditor(data);
        return;
    }


    try {
        await initializeWebSocket();
        await sendAuth();
    } catch (error) {
        console.error('Error:', error);
    }
}

function sendJustUpdates(changes, allElements, newDeletedElements) {
    sendMessage(JSON.stringify({
        changes: changes,
        allElements: allElements,
        newDeletedElements: newDeletedElements
    }));
}

function handleIncomingMessage(message) {
    var m = JSON.parse(message);
    console.log('Received:', m);

    if (firstMsg) {
        initEditor(m);
        firstMsg = false;
    }

    if (!('uuid' in m)) {
        window.wisk.editor.handleChanges(m);
    }
}

window.addEventListener('online', () => {
    console.log('User is online');
});

window.addEventListener('offline', () => {
    console.log('User is offline');
});

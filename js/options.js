$(document).ready(function(){

    restoreSettings();
    $("#optionsForm").submit( function () {
        saveOptions();
        return false;   
    });

});

// Saves options to localStorage.
function saveOptions() {
    var url = $('#host').val();
    var username = $('#username').val();
    var password = $('#password').val();

    if (url && url != '') {
        chrome.storage.local.set({'url': url});
        chrome.storage.local.set({'username': username});
        chrome.storage.local.set({'password': password});

        localStorage.setItem("url", url);
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Update status to let user know options were saved
        alert("Saved");

    } else {
        alert("Error");
    }
}

// Restore setting values
function restoreSettings() {
    var url = localStorage["url"];
    var username = localStorage["username"];
    var password = localStorage["password"];

    if (!url) {
        return;
    }
    $('#host').val(url);
        $('#username').val(username);
        $('#password').val(password);
}
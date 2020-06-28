var localStorage;

function storageAvailable() {
    try {
        let test = "test";
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        
        return true;
    }
    catch (e) {
        return false;
    }
}

function initStorage() {
    if (storageAvailable()) {
        if (localStorage.getItem("library_array") === null) {
            localStorage.setItem("library_array", JSON.stringify([]));
        }
    }
    else {
        console.log("Storage not available.");
    }
}

function getLibraryArray() {
    if (storageAvailable()) {
        return JSON.parse(localStorage.getItem("library_array"));
    }
    else {
        console.log("Returned empty array because storage is not available.");
        return [];
    }
}

function updateLibraryArray(arr) {
    if (storageAvailable()) {
        localStorage.setItem("library_array", JSON.stringify(arr));
    }
    else {
        console.log("Library wasn't updated because it's not available");
    }
}
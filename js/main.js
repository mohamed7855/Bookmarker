var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var bookmarks = JSON.parse(localStorage.getItem("bookmarksList")) || [];

if (bookmarks.length > 0) {
    // show all bookmarks
    displayBookmarks();
}

function isValidBookmarkName() {
    var regex = /^(.*[a-zA-Z0-9]){3}$/;

    if (regex.test(siteName.value)) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
        return true;
    }
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
    return false;
}

function isValidBookmarkURL() {
    var regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i;

    if (regex.test(siteURL.value)) {
        siteURL.classList.add("is-valid");
        siteURL.classList.remove("is-invalid");
        return true;
    }
    siteURL.classList.remove("is-valid");
    siteURL.classList.add("is-invalid");
    return false;
}


// add bookmark
function addBookmark() {
    if (isValidBookmarkName() && isValidBookmarkURL()) {
        var bookmarkSite = { Name: siteName.value, URL: siteURL.value.toLowerCase() };
        
        if(bookmarkSite.URL.startsWith("https://")===false){
            bookmarkSite.URL="https://" + bookmarkSite.URL;
        }
        bookmarks.push(bookmarkSite);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        resetInputs();
        displayBookmarks(bookmarks.length - 1);
    }
    else{
        submitBtn.setAttribute('data-bs-toggle', 'modal');
        submitBtn.click(); 
        submitBtn.removeAttribute('data-bs-toggle');
    }
}

// display bookmark(s)
function displayBookmarks() {
    var tableRows = "";
    for (var i = 0; i < bookmarks.length; i++) {
        tableRows += `
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarks[i].Name}</td>
        <td><button type="button" class="btn btn-visit" onclick="visitBookmark(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button type="button" class="btn btn-delete" onclick="daleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>
        `
    }
    tableContent.innerHTML = tableRows;
}

// reset inputs
function resetInputs() {
    siteName.value = "";
    siteURL.value = "";
}

// visit bookmark
function visitBookmark(index) {
    window.open(`${bookmarks[index].URL}`, '_blank');
}

// delete bookmark
function daleteBookmark(index) {
    bookmarks.splice(index, 1);
    displayBookmarks();
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

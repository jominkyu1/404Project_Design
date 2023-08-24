function includeHTML() {
    var headerPlaceholder = document.getElementById("headerjs");
    var footerPlaceholder = document.getElementById("footerjs");
    var navPlaceholder = document.getElementById("navbarjs");


    var headerRequest = new XMLHttpRequest();
    headerRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            headerPlaceholder.innerHTML = this.responseText;
        }
    };
    headerRequest.open("GET", "include/header.html", true);
    headerRequest.send();

    var footerRequest = new XMLHttpRequest();
    footerRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            footerPlaceholder.innerHTML = this.responseText;
        }
    };
    footerRequest.open("GET", "include/footer.html", true);
    footerRequest.send();

    var navRequest = new XMLHttpRequest();
    navRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            navPlaceholder.innerHTML = this.responseText;
        }
    }
    navRequest.open("GET", "include/nav.html", true);
    navRequest.send();
}
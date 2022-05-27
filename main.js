var scrollPosition = window.scrollY;
var offCanvas = document.getElementsByClassName('offcanvas')[0];
// remove pop out form
window.addEventListener('scroll', function() {
    scrollPosition = window.scrollY;
    if (scrollPosition >= 30) {
        offCanvas.classList.remove('show');
    }
});
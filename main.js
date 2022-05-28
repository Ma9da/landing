var scrollPosition = window.scrollY;
var offCanvas = document.getElementsByClassName('offcanvas');
// remove pop out form
window.addEventListener('scroll', function () {
    scrollPosition = window.scrollY;
    for (let i = 0; i <= offCanvas.length; i++) {
        if(offCanvas[i]){
            if (scrollPosition >= 30) {
                offCanvas[i].classList.remove('show');
            }
        }
    }
});
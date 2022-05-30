// show form pop-up
let offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasRight1'))
document.onreadystatechange = function () {
    offcanvas.show();
};
// hide form pop-up
// remove pop out form
window.addEventListener('scroll', function () {
    scrollPosition = window.scrollY;
    if (scrollPosition >= 30) {
        offcanvas.hide()
    }
});
// slider form hide label on focus
let sliderInput = document.getElementsByClassName('slider__form-input')
let sliderLabel = document.getElementsByClassName('slider__form-label')
for (let i = 0; i < sliderInput.length; i++) {
    sliderInput[i].addEventListener('click' && 'focus', function () {
        sliderInput[i].placeholder = sliderLabel[i].innerText
        sliderLabel[i].innerText = ""
    })
}

// change icon arrow direction
let icon = document.getElementsByClassName("fa-angle-right")[0]
document.getElementById('offcanvasRight1').addEventListener('hidden.bs.offcanvas', function () {
    if (icon.classList.contains('fa-angle-right')) {
        icon.classList.remove('fa-angle-right')
        icon.classList.add('fa-angle-left')
    }

})
document.getElementById('offcanvasRight1').addEventListener('shown.bs.offcanvas', function () {
    if (icon.classList.contains('fa-angle-left')) {
        icon.classList.add('fa-angle-right')
        icon.classList.remove('fa-angle-left')
    }
})


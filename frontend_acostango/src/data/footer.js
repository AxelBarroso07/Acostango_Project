var footer = document.getElementById('footer');

window.addEventListener('scroll', () => {
    var scroll = window.scrollY;

    if (scroll > 10) {
        header.style.backgroundColor = '#FFF';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

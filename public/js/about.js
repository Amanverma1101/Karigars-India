const hamBurgerBtn = document.getElementById('hamBurger');
hamBurgerBtn.addEventListener('click', function() {
    const responsiveRight = document.querySelector('.responsive')
    hamBurgerBtn.classList.toggle('active')
    if (hamBurgerBtn.classList.contains('active')) {
        responsiveRight.classList.add('active')
    } else {
        responsiveRight.classList.remove('active')
    }
})

function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
        // moreText.style.transition = "all 2s";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
        // moreText.style.transition = "all 2s";
    }
}
let header = document.querySelector('.header');
let menu_button = document.querySelector('.header__burger');
let menu_itself = document.querySelector('.menu');
let menu_list = document.querySelector('.menu__list');
let body = document.querySelector('body');
let windowSizeMobile = (window.innerWidth < 740);

menu_button.onclick = function () {
    menu_button.classList.toggle('active');
    menu_itself.classList.toggle('active');
    body.classList.toggle('lock');
};

menu_list.onclick = function () {
    menu_button.classList.toggle('active');
    menu_itself.classList.toggle('active');
    body.classList.toggle('lock');
};

function NewsSliders() {
    const newsSlider = document.querySelectorAll('.news-slider');
    if (newsSlider && windowSizeMobile) {
        newsSlider.forEach(slider => {
            let myVideoSlider;
            let prevArrow = slider.querySelector('.swiper-arrow-prev');
            let nextArrow = slider.querySelector('.swiper-arrow-next');
            myVideoSlider = new Swiper(slider.querySelector('.myvideo-slider'), {

                slidesPerView: 1,
                spaceBetween: 10,
                speed: 800,
                navigation: {
                    nextEl: nextArrow,
                    prevEl: prevArrow,
                },

                keyboard: true,
                breakpoints: {
                    740: {
                        spaceBetween: 0
                    }
                }

            });
        })
    }
}

window.addEventListener('load', NewsSliders);

function searchToggle() {
    const searchForm = document.querySelector('form.search');
    const langSwitch = document.querySelector('.menu__item--lang');
    if (searchForm) {
        let searchToggle = searchForm.querySelector('.search-btn-toggle');
        searchToggle.addEventListener('click', () => {
            header.classList.add('active-search-form')
            searchForm.classList.add('active-search');
            langSwitch.classList.add('active-lang');
        });
        window.addEventListener('click', function (e) {
            if (!searchForm.contains(e.target)) {
                header.classList.remove('active-search-form')
                searchForm.classList.remove('active-search');
                langSwitch.classList.remove('active-lang');
            };
        });
    }
}
searchToggle();


const headerhead = document.querySelector('.header__inner');

window.addEventListener("scroll", function () {
    let scrollPos = window.scrollY;

    if (scrollPos > 100) {
        headerhead.classList.add('orange')
    } else {
        headerhead.classList.remove('orange')
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let scrollPos = window.scrollY;

    if (scrollPos > 100) {
        headerhead.classList.add('orange')
    } else {
        headerhead.classList.remove('orange')
    }
});


const langs = document.querySelectorAll('.lang');

langs.forEach(function (item) {
    item.addEventListener('click', function () {
        let currentBtn = item;

        langs.forEach(function (item) {
            item.classList.remove('active')
        });

        currentBtn.classList.add('active')
    });
});





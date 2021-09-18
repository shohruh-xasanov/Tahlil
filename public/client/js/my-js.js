var windowSizeDesktop = (window.innerWidth > 1320),
    windowSizeTablet = (window.innerWidth < 1320),
    windowSizeMobile = (window.innerWidth > 600),
    wrapper = document.querySelector('body'),
    maiN = wrapper.querySelector('.main'),
    wrHeader = wrapper.querySelector('.header'),
    hoverBlock = wrHeader.querySelector('.header__contacts-block'),
    catalogWrap = document.querySelectorAll('.catalog'),
    catalog = document.querySelector('.catalog .catalog-menu'),
    catContainer = document.querySelector('.container-for-addon'),
    catTopHeight = catContainer.offsetTop,
    burgerBtnHead = document.querySelector('.burger-head'),
    burgerBtnFoo = document.querySelector('.burger-footer'),
    overElHead = document.querySelectorAll('.header__contacts'),
    overElHeadMenu = document.querySelectorAll('.navigation .menu-item.menu-item-has-children'),
    overWishList = document.querySelectorAll('.liked-wishlist'),
    overlay = document.querySelector('.menu-overlay'),
    wc_mini_cart = document.querySelector('.widget_shopping_cart'),
    //попап переменные
    popupLinks = document.querySelectorAll('.popup-link'),
    lockPadding = document.querySelectorAll('.lock-padding'),
    popupCloseIcon = document.querySelectorAll('.close-popup'),
    timeout = 800,
    unlock = true;

/**
 * определяем браузер и добавляем класс к меню
 */
function browserDetect() {
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        wrapper.classList.add('opera-browser');
        console.log("browser name :", "opera-browser")
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        wrapper.classList.add('chrome-browser');
        console.log("browser :", "chrome-browser")
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
        wrapper.classList.add('safari-browser');
        console.log("browser :", "safari-browser")
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        wrapper.classList.add('firefox-browser');
        console.log("browser :", "firefox-browser")
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        wrapper.classList.add('ie-browser');
        console.log("browser :", "ie-browser. Этот браузер уже не поддерживается, установите другой")
    } else {
        wrapper.classList.add('unknown-browser');
        console.log("browser :", "unknown-browser")
    }
}
browserDetect();
// $(document).ready(function () {
//     $('.header .wpforms-container form input').inputmask({
//         "placeholder": "",
//     });
// });
/**
 * Добавляем класс счетчику если знанчение выше 0
 */
function counterAddClass() {
    let counters = document.querySelectorAll('.count, .yith-woocompare-count, .items-count');
    if (counters) {
        counters.forEach(count => {
            if ((count.innerText) > 0) {
                count.parentElement.classList.add('active-counter');
            }
        });
    }
}
// counterAddClass();
window.addEventListener('load', counterAddClass);
window.addEventListener('change', counterAddClass);
/**
 * Добавляем класс к боди если показываються всплывающие окна при наведении
 */
function overlayAdd() {
    if (overElHead) {
        overElHead.forEach(overH => {
            if (windowSizeDesktop) {
                overH.addEventListener('mouseover', () => {
                    wrapper.classList.add('overlay-active');
                    // wrHeader.style.position = 'inherit';
                    hoverBlock.classList.add('on-hover');
                });
                overH.onmouseout = function (e) {
                    if (!overH.contains(e.relatedTarget)) {
                        wrapper.classList.remove('overlay-active');
                        hoverBlock.classList.remove('on-hover');
                        // wrHeader.style.position = 'relative';
                    }
                }
            }
        });
    }
    if (overElHeadMenu) {
        overElHeadMenu.forEach(overHM => {
            if (windowSizeDesktop) {
                overHM.addEventListener('mouseover', () => {
                    wrapper.classList.add('overlay-active');
                    wrHeader.style.position = 'inherit';
                    overHM.classList.add('on-hover');

                });
                overHM.onmouseout = function (e) {
                    if (!overHM.contains(e.relatedTarget)) {
                        wrapper.classList.remove('overlay-active');
                        overHM.classList.remove('on-hover');
                        wrHeader.style.position = 'relative';
                    }
                }
            }
        });
    }
    if (overWishList) {
        overWishList.forEach(wish => {
            if (windowSizeDesktop) {
                let list_items = wish.querySelector('.list');
                wish.addEventListener('mouseover', () => {
                    wrapper.classList.add('overlay-active');
                    wrHeader.style.position = 'inherit';
                    wish.classList.add('on-hover');

                });
                wish.onmouseout = function (e) {
                    if (!wish.contains(e.relatedTarget) && !list_items.contains(e.relatedTarget)) {
                        wrapper.classList.remove('overlay-active');
                        wish.classList.remove('on-hover');
                        wrHeader.style.position = 'relative';
                    }
                }
            }
        });
    }
}
overlayAdd();

/**
 * оборачиваем картинки в тег figure (меню-каталога)
 */
function wrapMenuImg() {
    let images = document.querySelectorAll('.navigation .menu-image');
    if (images) {
        images.forEach(function (list) {
            let wrap = document.createElement('figure');
            wrap.className = 'menu-image-wrap';
            list.parentNode.insertBefore(wrap, list);
            wrap.appendChild(list);
        });
    }

}
wrapMenuImg();

/**
 * фиксируем каталог при прокрутке + анимация поля поиска
 */
function fixedCatalog() {

    const catHeight = catContainer.offsetHeight;
    const searchField = document.querySelector('.search__bar-field input[type="search"]');
    const searchBtn = document.querySelector('.search__bar-field input[type="submit"]');
    const busketMb = document.querySelector('.basket-mobile');


    maiN.style.marginTop = 0;
    if ((catalog.offsetTop >= 0) &&
        !(catalog.classList.contains('on-top')) &&
        (wrapper.classList.contains('home-page'))) {
        // catalog.classList.add('on-top');
    }
    window.addEventListener('scroll', function () {
        scrollpos = window.scrollY;
        const bannerBlock = document.querySelector('.banners');


        // фиксируем каталог
        if (scrollpos >= catTopHeight) {
            wrHeader.classList.add('fixed');
            catalog.classList.add('fixed-catalog');
            // catalog.classList.add('on-scroll');
            // catalog.classList.remove('on-top');
            maiN.style.marginTop = catHeight + 'px';
            if (hoverBlock) {
                hoverBlock.classList.remove('on-hover');
            }
        } else {
            wrHeader.classList.remove('fixed');
            catalog.classList.remove('fixed-catalog');
            // catalog.classList.remove('on-scroll');
            if (wrapper.classList.contains('home-page')) {
                // catalog.classList.add('on-top');
            }
            maiN.style.marginTop = 0;
        }
        // добавляем класс к боди при скроле от и до
        if (bannerBlock && windowSizeDesktop) {
            const bannerBlockHeight = bannerBlock.offsetHeight;

            // console.log('высота-банера:', bannerBlockHeight);
            if ((scrollpos >= 1) && (scrollpos <= (catHeight + bannerBlockHeight))) {
                wrHeader.classList.add('hidden');
            } else {
                wrHeader.classList.remove('hidden');
            }
        }

    });
    /**
     * Раскрытие поиска при клике в мобильной версии
     */
    if (windowSizeTablet) {
        searchField.addEventListener('click', () => {
            wrHeader.classList.add('active-search');
            searchField.closest('.search__bar-field').classList.add('active-form');
        });
        window.addEventListener('click', function (e) {
            if (!searchField.contains(e.target) && !searchBtn.contains(e.target)) {
                wrHeader.classList.remove('active-search');
                searchField.closest('.search__bar-field').classList.remove('active-form');
            };
        });

    }
}

fixedCatalog();


/**
 * каталог меню
 */

function catalogMenu() {

    const catLink = document.querySelectorAll('.catalog .catalog-menu>.catalog-item.menu-item-has-children');
    let linkMenuSub = document.querySelectorAll('.sub-menu.sub-menu-0');
    const bannerCat = document.querySelector('.banners .catalog');

    let maxHeightSubMenu = null; // ищем самое высокое подменю
    for (let i = 0; i < linkMenuSub.length; i++) {
        if (!maxHeightSubMenu) {
            maxHeightSubMenu = linkMenuSub[i].scrollHeight;
        }

        if (maxHeightSubMenu < linkMenuSub[i].scrollHeight) {
            maxHeightSubMenu = linkMenuSub[i].scrollHeight
        }
    }
    if (catalogWrap && windowSizeDesktop) {


        catalogWrap.forEach(catW => {
            let catalog = catW.querySelector('.catalog-menu');
            let catalogHeight = catalog.offsetHeight;
            catalog.style.maxHeight = 420 + 'px';
            catalog.style.minHeight = 420 + 'px';
            catTopOffset = catW.offsetTop;
            let showOll = catalog.querySelector('.oll-items');

            // считаем количество li в  catalog-menu
            let linksQuantity = catW.querySelectorAll('.catalog-menu>.catalog-item');
            console.log(('items:', linksQuantity).length);

            for (let i = 0; i < linksQuantity.length; ++i) {
                if (linksQuantity.length > 11) {
                    wrapper.classList.add('more-then-11');
                } else if (linksQuantity.length < 11) {
                    wrapper.classList.add('less-then-11');
                }
            }
            ///////
            // добавляем класс ссылкам которые идут после 10го линка
            const lastLink = Array.prototype.slice.call(catW.querySelectorAll('.catalog-menu>.catalog-item:not(:last-child)'));
            console.log('elements-after:', lastLink.slice(10).length);
            lastLink.slice(10).forEach(ll => {
                ll.classList.add('invisible');
            });

            catW.addEventListener('mouseover', () => {
                // catW.classList.add('catalog-hovered');
                wrapper.classList.add('overlay-active');
                // wrHeader.style.zIndex = 10;
                // catalog.style.maxHeight = catalogHeight + 'px';
                // catalog.style.minHeight = catalogHeight + 'px';
                catalog.style.visibility = 'visible';
                catalog.style.opacity = 1;
                catalog.style.pointerEvents = 'auto';
            });
            catW.onmouseout = function (event) {
                if (!catW.contains(event.relatedTarget)) {
                    // catW.classList.remove('catalog-hovered');
                    // catalog.style.maxHeight = 420 + 'px';
                    // catalog.style.minHeight = 420 + 'px';
                    wrapper.classList.remove('overlay-active');
                    catalog.style.visibility = 'hidden';
                    catalog.style.opacity = 0;
                    catalog.style.pointerEvents = 'none';
                    // window.setTimeout(function () {
                    // wrHeader.style.zIndex = '';
                    // }, 500);
                }
            }
            if (bannerCat) {
                bannerCat.addEventListener('mouseover', () => {
                    wrapper.classList.add('banner-active');
                });
                bannerCat.onmouseout = function (event) {
                    if (!bannerCat.contains(event.relatedTarget)) {
                        wrapper.classList.remove('banner-active');
                        catW.classList.remove('catalog-hovered');
                        wrapper.classList.remove('overlay-active');
                        wrHeader.style.zIndex = '';
                    }
                }
            }
        });
        catLink.forEach(link => {
            let linkMenu = link.querySelector('.sub-menu.sub-menu-0');
            let sMenuHeight = linkMenu.scrollHeight;

            link.addEventListener('mouseover', () => {
                link.classList.add('active-link');
                link.parentElement.style.minHeight = sMenuHeight + 'px';
                linkMenu.style.opacity = 1;
                linkMenu.style.visibility = 'visible';
                linkMenu.style.pointerEvents = 'auto';
                linkMenu.style.transform = 'translate(0px, 0px)';
            });
            link.onmouseout = function (e) {
                if (!link.contains(e.relatedTarget)) {
                    link.classList.remove('active-link');
                    link.parentElement.style.minHeight = 420 + 'px';
                    linkMenu.style.opacity = 0;
                    linkMenu.style.visibility = 'hidden';
                    linkMenu.style.pointerEvents = 'none';
                    linkMenu.style.transform = 'translate(0, 30px)';
                }
            }
        });
    }



}
catalogMenu();

/**
 * слайдеры
 */
function swiperSliders() {
    const topBanner = document.querySelectorAll('.banners__block');
    const itemSliders = document.querySelectorAll('.top__sales');
    const bottomBanner = document.querySelectorAll('.sale__banners');
    const advantagesBanner = document.querySelectorAll('.advantages');
    const custabs = document.querySelector('.custabs');

    if (topBanner) {
        function updSwiperNumericPagination() {
            this.el.querySelector('.swiper-counter')
                .innerHTML = '<span class="number">' + (this.realIndex + 1) + '</span>/<span class="total">' + this.el.slidesQuantity + '</span>';
        };
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.banners .swiper-container').forEach(function (node) {
                node.slidesQuantity = node.querySelectorAll('.swiper-slide').length;
                new Swiper(node, {
                    speed: 1200,
                    slidesPerView: 1,
                    spaceBetween: 30,
                    centeredSlides: true,
                    loop: true,
                    autoplay: {
                        delay: 4000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.banners__block .swiper-pagination',
                        clickable: true,
                    },
                    on: {
                        init: updSwiperNumericPagination,
                        slideChange: updSwiperNumericPagination
                    }
                });
            });
        });
    }

    if (itemSliders) {
        itemSliders.forEach(s => {
            const btnPrev = s.querySelector('.button-prev');
            const btnNext = s.querySelector('.button-next');
            const sliderItem = new Swiper(s.querySelector('.items-slider'), {
                speed: 800,
                slidesPerView: 2,
                spaceBetween: 5,
                loop: false,
                centeredSlides: false,
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
                breakpoints: {
                    650: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    },
                    992: {
                        slidesPerView: 4,
                        centeredSlides: false,
                    },
                    1025: {
                        slidesPerView: 5,
                        centeredSlides: false,
                    },
                    1360: {
                        slidesPerView: 6,
                        centeredSlides: false,
                    },
                }
            });
            const sliderFilter = new Swiper(s.querySelector('.top__sales-filters'), {
                speed: 800,
                slidesPerView: 'auto',
                spaceBetween: 10,
                loop: false,
                freeMode: true,
                breakpoints: {
                    481: {
                        spaceBetween: 15,
                    },
                }
            });

        });
    }
    if (bottomBanner) {
        const bannerSlideBot = new Swiper('.sale__banners .swiper-container', {
            speed: 1200,
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.sale__banners .button-next',
                prevEl: '.sale__banners .button-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: 1.2
                },
                767: {
                    spaceBetween: 20,
                    slidesPerView: 1.2
                },
                992: {
                    slidesPerView: 1.5
                }
            }
        });
    }
    if (custabs) {
        const tabthums = new Swiper(custabs.querySelector('.custabs-head>.swiper-container'), {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            loop: false,
            watchSlidesVisibility: true,
            watchSlidesProgress: true,
            watchOverflow: true,
            allowTouchMove: false,
        });

        const thumbwindow = new Swiper(custabs.querySelector('.custabs-body>.swiper-container'), {
            spaceBetween: 10,
            allowTouchMove: false,
            effect: "fade",
            thumbs: {
                swiper: tabthums,
            },
        });
        // слайдер галереи
        let nextAr = custabs.querySelector('.custabs-body .gallery-block .button-next');
        let prevAr = custabs.querySelector('.custabs-body .gallery-block .button-prev');
        const galthumbs = new Swiper(custabs.querySelector('.custabs-body .gallery-thumbs'), {
            spaceBetween: 10,
            slidesPerView: 4,
            loop: false,
            direction: 'vertical',
            navigation: {
                nextEl: nextAr,
                prevEl: prevAr,
            },
        });
        const galwindow = new Swiper(custabs.querySelector('.custabs-body .gallery-main'), {
            spaceBetween: 10,
            autoHeight: true,
            thumbs: {
                swiper: galthumbs,
            },
        });
    }
    // if (advantagesBanner) {
    //     const advantagSlide = new Swiper('.advantages .swiper-container', {
    //         speed: 1000,
    //         slidesPerView: 1,
    //         spaceBetween: 0,
    //         loop: false,
    //         watchSlidesVisibility: true,
    //         autoplay: {
    //             delay: 2500,
    //             disableOnInteraction: false,
    //         },
    //         breakpoints: {
    //             480: {
    //                 slidesPerView: 2
    //             },
    //             767: {
    //                 slidesPerView: 3
    //             },
    //             992: {
    //                 slidesPerView: 4
    //             },
    //             1200: {
    //                 slidesPerView: 5
    //             },
    //             1550: {
    //                 slidesPerView: 6
    //             }
    //         }
    //     });
    // }
}
swiperSliders();


/**
 * Наведение на товар
 */
function shopItem() {
    const shopItemWrap = document.querySelectorAll('.shop-item-wrap');
    const shopItemWrapCount = document.querySelectorAll('.shop-item-wrap').length;
    let counter = 0;
    if (shopItemWrap) {
        shopItemWrap.forEach(sI => {
            let perentSection = sI.closest('section');
            let perentSwiperWrap = sI.closest('.swiper-container');
            let shopItem = sI.querySelector('.shop-item');
            let hideBlock = sI.querySelector('.hidden-info');
            let wc_variant_list = sI.querySelectorAll('.variations');
            let wc_variant_select = sI.querySelectorAll('.variations>li select');
            let wc_variant_color = sI.querySelector('.variations .color-variable-wrapper');
            let colorBox = sI.querySelector('.woo-variation-raw-type-color');

            wc_variant_select.forEach(variant => {
                let variantParent = variant.closest('li');
                let var_list = variant.nextElementSibling;
                let var_name = var_list.getAttribute('data-attribute_name');
                if (variant) {
                    variantParent.classList.add('variation-item', var_name);
                }
                if (variant && (variant.classList.contains('woo-variation-raw-type-color'))) {
                    window.setTimeout(function () {
                        wc_variant_color.style.opacity = '1';
                    }, 1500);
                }
                // if (var_list.getAttribute('data-attribute_name') === 'attribute_pa_memory') {
                //     variantParent.classList.add('memory-box');
                // }
                // if ((perentSection.classList.contains('on-dropdown') && !variantParent.classList.contains('attribute_pa_color')) && (!variantParent.classList.contains('attribute_pa_memory'))) {
                //     variantParent.style.cssText = 'display: none !important;'; // удаляем лишнее плюшки со страницы магазина
                // }
            })
            if (wc_variant_list) { // удаляем лишнее плюшки со страницы магазина , оставляем только первіе две
                wc_variant_list.forEach(var_list => {
                    const var_list_items = Array.prototype.slice.call(var_list.querySelectorAll('.variations>li'));
                    var_list_items.slice(2).forEach(v_item => {
                        v_item.style.cssText = 'display: none !important;';
                    });
                })
            }


            if (hideBlock && windowSizeMobile && (perentSection.classList.contains('on-dropdown'))) {
                let shopItemHeight = shopItem.scrollHeight;
                let hideBlockHeight = hideBlock.scrollHeight;
                sI.style.zIndex = shopItemWrapCount - (counter++ - 1);
                // if (navigator.userAgent.indexOf("Chrome") != -1) {
                sI.style.height = (shopItemHeight - hideBlockHeight) + 'px';
                // shopItem.style.minHeight = (shopItemHeight - hideBlockHeight) + 'px';
                // } else {
                //     sI.style.height = ((shopItemHeight - hideBlockHeight) + 20) + 'px';
                // shopItem.style.minHeight = ((shopItemHeight - hideBlockHeight) + 20) + 'px';
                // }
                //hideBlock.style.cssText = 'visibility: hidden;pointer-events: none;opacity: 0;';



                sI.addEventListener('mouseover', () => {
                    shopItem.classList.add('hovered-item');
                    // if (navigator.userAgent.indexOf("Chrome") != -1) {
                    if (colorBox) {
                        shopItem.style.height = (shopItemHeight - 20) + 'px';
                    } else {
                        shopItem.style.height = shopItemHeight + 'px';
                    }
                    // shopItem.style.minHeight = shopItemHeight + 'px';
                    // } else {
                    //     shopItem.style.height = (shopItemHeight - 20) + 'px';
                    // shopItem.style.minHeight = (shopItemHeight - 20) + 'px';
                    // }
                    if (perentSwiperWrap) {
                        perentSwiperWrap.style.zIndex = 3;
                    }
                    hideBlock.classList.add('visible')
                    //hideBlock.style.cssText = 'visibility: visible;pointer-events: all;opacity: 1;';
                });
                sI.onmouseout = function (e) {
                    if (!sI.contains(e.relatedTarget)) {
                        shopItem.classList.remove('hovered-item');
                        // if (navigator.userAgent.indexOf("Chrome") != -1) {
                        shopItem.style.height = (shopItemHeight - hideBlockHeight) + 'px';
                        // shopItem.style.minHeight = (shopItemHeight - hideBlockHeight) + 'px';

                        // } else {
                        // shopItem.style.height = ((shopItemHeight - hideBlockHeight) + 20) + 'px';
                        // shopItem.style.minHeight = ((shopItemHeight - hideBlockHeight) + 20) + 'px';

                        // }
                        if (perentSwiperWrap) {
                            perentSwiperWrap.style.zIndex = 1;
                        }
                        hideBlock.classList.remove('visible')
                        //hideBlock.style.cssText = 'visibility: hidden;pointer-events: none;opacity: 0;';
                    }
                }

            } else if (windowSizeMobile && (perentSection.classList.contains('on-dropdown'))) {
                let shopItemHeight = shopItem.scrollHeight;
                sI.style.height = shopItemHeight + 'px';

                sI.onmouseover = function () {
                    shopItem.classList.add('hovered-item');
                    shopItem.style.height = shopItemHeight + 'px';
                    if (perentSwiperWrap) {
                        perentSwiperWrap.style.zIndex = 3;
                    }
                }
                sI.onmouseout = function (e) {
                    if (!sI.contains(e.relatedTarget)) {
                        shopItem.classList.remove('hovered-item');
                        shopItem.style.height = shopItemHeight + 'px';
                        if (perentSwiperWrap) {
                            perentSwiperWrap.style.zIndex = 1;
                        }
                    }
                }
            }

        });
    }

}

shopItem();
/**
 * Расскрытие блока
 */

function showMore() {
    const showBlock = document.querySelectorAll('.show-more');
    if (showBlock) {
        showBlock.forEach(sB => {
            let showItem = sB.querySelector('.show-more-item');
            let showItemMaxHeight = 136 + 'px';
            let showItemPer = showItem.closest('.show-more');
            let showButton = sB.querySelector('.show-more-btn');
            let showItemHeight = showItem.scrollHeight;
            showItem.style.maxHeight = showItemMaxHeight;
            if (showItem.scrollHeight < 136) {
                showItem.classList.add('min-height');
                showButton.style.display = 'none';
            }

            if (showButton) {
                showButton.addEventListener('click', () => {
                    showItemPer.classList.toggle('show-more-active');
                    if (showItem.style.maxHeight == showItemMaxHeight) {
                        showItem.style.maxHeight = showItemHeight + 'px';
                    } else {
                        showItem.style.maxHeight = showItemMaxHeight;
                    }
                });
                window.addEventListener('click', function (e) {
                    if (!showItem.contains(e.target) && !showButton.contains(e.target)) {
                        showItemPer.classList.remove('show-more-active');
                        showItem.style.maxHeight = showItemMaxHeight;
                    };
                });
            };
        });
    }
}
showMore();
// document.addEventListener('DOMContentLoaded', showMore());

/**
 * Кнопка скролла вверх
 */
function scrollTop() {
    document.addEventListener('DOMContentLoaded', function () {
        let scrollBtn = document.querySelector('.scroll-top-btn');

        let btnReveal = function () {
            if (window.scrollY >= 300) {
                scrollBtn.style.opacity = 1;
            } else {
                scrollBtn.style.opacity = 0;
            }
        }
        window.addEventListener('scroll', btnReveal);
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

    });
}
scrollTop();

/**
 * бургер меню
 */
function burgerMenus() {

    const catMobile = document.querySelector('.catalog-mobile');
    const dropItem = document.querySelectorAll('.navigation-wrap .navigation__list .menu-item-has-children');
    const mobileContacts = document.querySelector('.navigation-wrap-contacts');

    if (burgerBtnHead && windowSizeTablet) { // бургер-меню
        let mobileMenu = document.querySelector('.navigation-wrap');
        let btnClose = document.querySelector('.button-close');
        let popupBox = document.querySelector('.popup');



        burgerBtnHead.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                wrapper.classList.remove('lock');
            } else {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                wrapper.classList.add('lock');
            }
        });
        burgerBtnFoo.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                wrapper.classList.remove('lock');
            } else {
                mobileMenu.classList.add('active');
                overlay.classList.add('active');
                wrapper.classList.add('lock');
            }
        });
        btnClose.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                wrapper.classList.remove('lock');
            }
        });
        window.addEventListener('click', function (e) {
            if (!burgerBtnFoo.contains(e.target) &&
                !burgerBtnHead.contains(e.target) &&
                !mobileMenu.contains(e.target) &&
                !catMobile.contains(e.target) &&
                !popupBox.contains(e.target)) {

                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                wrapper.classList.remove('lock');
                catMobile.classList.remove('active');
            };
        });

    };

    if (dropItem && windowSizeTablet) { // дробдаун бургер-меню
        dropItem.forEach(drop => {

            let dropMenu = drop.querySelector('.sub-menu');
            let dropMenuMaxHeight = 0 + 'px';
            let dropMenuLink = dropMenu.previousElementSibling;
            let dropMenuHeight = dropMenu.scrollHeight;

            dropMenu.style.maxHeight = dropMenuMaxHeight;

            dropMenuLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (dropMenu.style.maxHeight == dropMenuMaxHeight) {
                    drop.classList.add('sub-menu-active');
                    dropMenu.style.maxHeight = dropMenuHeight + 'px';
                    dropMenuLink.style.color = 'var(--green)';
                } else {
                    drop.classList.remove('sub-menu-active');
                    dropMenu.style.maxHeight = 0;
                    dropMenuLink.style.color = 'var(--darkblue)';
                }
            });
            window.addEventListener('click', function (e) {
                if (!dropMenu.contains(e.target) && !dropMenuLink.contains(e.target)) {
                    drop.classList.remove('sub-menu-active');
                    dropMenu.style.maxHeight = 0;
                    dropMenuLink.style.color = 'var(--darkblue)';
                };
            });
        });
    }

    if (mobileContacts && windowSizeTablet) { // дробдаун контактов (мобильных)
        let contactList = mobileContacts.querySelector('.navigation-wrap-contacts-list');
        let listMaxHeight = 0 + 'px';
        let dropLink = contactList.previousElementSibling;
        let listHeight = contactList.scrollHeight;

        contactList.style.maxHeight = listMaxHeight;

        dropLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (contactList.style.maxHeight == listMaxHeight) {
                contactList.classList.add('sub-menu-active');
                contactList.style.maxHeight = listHeight + 'px';
                dropLink.classList.add('active')
            } else {
                contactList.classList.remove('sub-menu-active');
                contactList.style.maxHeight = 0;
                dropLink.classList.remove('active')
            }
        });
        window.addEventListener('click', function (e) {
            if (!contactList.contains(e.target) && !dropLink.contains(e.target)) {
                contactList.classList.remove('sub-menu-active');
                contactList.style.maxHeight = 0;
                dropLink.classList.remove('active')
            };
        });
    }

    if (catMobile && windowSizeTablet) { // открытие и закрытие моб.каталога
        let catBtnClose = catMobile.querySelector('.catalog-mobile-close');
        let catBtnOpen = document.querySelector('.catalog-btn-mobile');
        catBtnOpen.addEventListener('click', () => {
            catMobile.classList.add('active');
        });
        catBtnClose.addEventListener('click', () => {
            catMobile.classList.remove('active');
        });
    }
}
burgerMenus();


/**
 * дродаун футера
 */
function fooDrop() {
    const footerNav = document.querySelector('.footer-nav ul');
    const footerNavItem = footerNav.querySelectorAll('.footer-nav-item');
    if (footerNavItem && (window.innerWidth < 1025)) { // дробдаун бургер-меню
        footerNavItem.forEach(item => {
            let itemList = item.querySelector('ul');;
            let itemListMaxHeight = 0 + 'px';
            let itemListLink = itemList.previousElementSibling;
            let itemListHeight = itemList.scrollHeight + 'px';

            itemList.style.maxHeight = itemListMaxHeight;
            itemList.style.paddingTop = 0;

            itemListLink.addEventListener('click', (e) => {
                e.preventDefault();

                if (itemList.style.maxHeight == itemListMaxHeight) {
                    itemList.style.maxHeight = itemListHeight;
                    itemList.classList.add('active-list');
                    itemList.parentNode.classList.add("active-item");
                    itemList.style.paddingTop = 10 + 'px';
                } else {
                    itemList.style.maxHeight = itemListMaxHeight;
                    itemList.classList.remove('active-list');
                    itemList.parentNode.classList.remove("active-item");
                    itemList.style.paddingTop = 0;
                }
            });
            window.addEventListener('click', function (e) {
                if (!item.contains(e.target) && !itemListLink.contains(e.target)) {
                    itemList.style.maxHeight = itemListMaxHeight;
                    itemList.classList.remove('active-list');
                    itemList.parentNode.classList.remove("active-item");
                    itemList.style.paddingTop = 0;
                };
            });
        });
    }
}
fooDrop();
/**
 * autoMarginDown
 */
function autoMarginDown(e) {
    const autoMarg = document.querySelectorAll('.margin-down');
    autoMarg.forEach(marg => {
        let margHeight = marg.scrollHeight;
        marg.style.marginBottom = -(margHeight / 2) + 'px';
    });
}
window.addEventListener('load', autoMarginDown);
window.addEventListener('resize', autoMarginDown);
/**
 * бургер для Aside на типичных страницах
 */
function hideAside() {
    const aside = document.querySelector('.aside-wrap');
    const asideBtn = document.querySelector('.aside-btn');
    const asideOverlay = document.querySelector('.overlay-aside');
    const asideBtnClose = document.querySelector('.aside-wrap-close');
    if (aside && (window.innerWidth < 1320)) {
        asideBtn.addEventListener('click', (e) => {
            if (aside.classList.contains('active')) {
                aside.classList.remove('active');
                asideBtn.classList.remove('active');
                asideOverlay.classList.remove('active');
                wrapper.classList.remove('_lock');
            } else {
                aside.classList.add('active');
                asideBtn.classList.add('active');
                asideOverlay.classList.add('active');
                wrapper.classList.add('_lock');
            }
        });
        asideBtnClose.addEventListener('click', (e) => {
            if (aside.classList.contains('active')) {
                aside.classList.remove('active');
                asideBtn.classList.remove('active');
                asideOverlay.classList.remove('active');
                wrapper.classList.remove('_lock');
            }
        });
        window.addEventListener('click', function (e) {
            if (!aside.contains(e.target) && !asideBtn.contains(e.target)) {
                aside.classList.remove('active');
                asideBtn.classList.remove('active');
                asideOverlay.classList.remove('active');
                wrapper.classList.remove('_lock');
            };
        });
    }
}
hideAside();
/**
 * Акордеон
 */
function accordion() {
    const accordion = document.querySelectorAll('.accordion__item');
    accordion.forEach(ac => {
        let acBtn = ac.querySelector('.accordion__item-title');
        let acBody = ac.querySelector('.accordion__item-body');
        let acBodyMaxHeight = acBody.scrollHeight + 'px';
        let acBodyMinHeight = 0 + 'px';
        acBody.style.maxHeight = acBodyMinHeight;

        acBtn.addEventListener('click', (e) => {

            if (acBody.style.maxHeight == acBodyMinHeight) {
                acBody.style.maxHeight = acBodyMaxHeight;
                ac.classList.add('active');
            } else {
                acBody.style.maxHeight = acBodyMinHeight;
                ac.classList.remove('active');
            }
        });
        window.addEventListener('click', function (e) {
            if (!ac.contains(e.target)) {
                acBody.style.maxHeight = acBodyMinHeight;
                ac.classList.remove('active');
            };
        });
    });
}
accordion();

/**
 * добавляем обертку для картинки страницы "обмена"
 */
function imageWrap() {
    const exBlock = document.querySelector('.simple-page-exchange');
    if (exBlock) {
        const exList = exBlock.querySelectorAll('ol');
        exList.forEach(ex => {
            let listItem = ex.querySelectorAll('li');
            listItem.forEach(item => {
                if (item) {
                    let listImage = item.querySelectorAll('img');
                    if (listImage) {
                        listImage.forEach(function (list) {
                            let wrapper = document.createElement('figure');
                            wrapper.className = 'exchange-item-list-image';
                            list.parentNode.insertBefore(wrapper, list);
                            wrapper.appendChild(list);

                        });
                    };
                    if (!(item.querySelector('.exchange-item-list-image'))) {
                        item.classList.add('no-image'); // если картинки нет до добавляем класс
                    }
                }

            });
        });
    }
}
imageWrap();
/**
 * Даем активный класс фильтрам Sort-by
 */
function sortBy() {
    const shopTopFilters = document.querySelector('.shopping-items-filters .orderby');
    if (shopTopFilters) {
        const panels = shopTopFilters.getElementsByTagName('a');
        const actives = shopTopFilters.getElementsByClassName('active');
        for (i = 0; panels.length > i; i++) {
            panels[i].onclick = function () {
                var currentActive = actives[0];
                if (currentActive)
                    currentActive.classList.remove("active");

                if (currentActive !== this)
                    this.classList.add("active");
            };
        }
    }
}
sortBy();
/**
 * Меняем содержимое sticky окна на странице товара
 */
function stickyChange() {
    const changingContent = document.querySelectorAll('.changing-content');
    if (changingContent) {
        changingContent.forEach(chWrap => {
            const changingItem = chWrap.querySelectorAll('.changing-content-item');
            const changeBtn = chWrap.querySelector('.sticky-card-button');
            changingItem.forEach(ch => {
                let chHeight = ch.scrollHeight;
                if (!ch.classList.contains('changing-active')) {
                    ch.style.maxHeight = 0;
                } else {
                    ch.style.maxHeight = chHeight + 'px';
                }
                changeBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (ch.classList.contains('changing-active')) {
                        ch.classList.remove('changing-active');
                        ch.style.maxHeight = 0;
                    } else {
                        setTimeout(function () {
                            ch.classList.add('changing-active');
                            ch.style.maxHeight = chHeight + 'px';
                        }, timeout);
                    }
                    changeBtn.classList.add('active');
                    setTimeout(RemoveClass, timeout);

                })

            })

            function RemoveClass() {
                changeBtn.classList.remove('active');
            }
        })
    }
}
window.addEventListener('load', stickyChange);
/**
 * Счетчик вопросов и ответов
 */
function qna() {
    questionTab = document.querySelector('.tab-questions');
    if (questionTab) {
        let qnaText = document.querySelector('.question_count');
        let questionCount = document.querySelectorAll('.cr-qna-list-q-cont').length;
        qnaText.innerHTML = '(' + questionCount + ')';
    }
}
qna();
/**
 * попап
 */
if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
        // el.onclick = function (e) {
        //     popupClose(el.closest('.popup'));
        //     e.preventDefault();
        // }
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - wrapper.offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    wrapper.style.paddingRight = lockPaddingValue;
    wrapper.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        wrapper.style.paddingRight = '0px';
        wrapper.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

(function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
        // реализуем
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();
(function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        // определяем свойство
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();


// document.addEventListener('DOMContentLoaded', createSelect, false);

// function createSelect() {
//     var select = document.getElementsByTagName('select'),
//         liElement,
//         ulElement,
//         optionValue,
//         iElement,
//         optionText,
//         selectDropdown,
//         elementParentSpan;

//     for (var select_i = 0, len = select.length; select_i < len; select_i++) {
//         //console.log('selects init');

//         select[select_i].style.display = 'none';
//         wrapElement(document.getElementById(select[select_i].id), document.createElement('div'), select_i, select[select_i].getAttribute('placeholder-text'));

//         for (var i = 0; i < select[select_i].options.length; i++) {
//             liElement = document.createElement("li");
//             optionValue = select[select_i].options[i].value;
//             optionText = document.createTextNode(select[select_i].options[i].text);
//             liElement.className = 'select-dropdown__list-item';
//             liElement.setAttribute('data-value', optionValue);
//             // window.location.href = ('data-value');
//             liElement.appendChild(optionText);
//             ulElement.appendChild(liElement);

//             liElement.addEventListener('click', function () {
//                 displyUl(this);
//             }, false);
//         }
//     }

//     function wrapElement(el, wrapper, i, placeholder) {
//         el.parentNode.insertBefore(wrapper, el);
//         wrapper.appendChild(el);

//         document.addEventListener('click', function (e) {
//             let clickInside = wrapper.contains(e.target);
//             if (!clickInside) {
//                 let menu = wrapper.getElementsByClassName('select-dropdown__list');
//                 menu[0].classList.remove('active');
//             }
//         });

//         var buttonElement = document.createElement("button"),
//             spanElement = document.createElement("span"),
//             spanText = document.createTextNode(placeholder);
//         iElement = document.createElement("i");
//         ulElement = document.createElement("ul");

//         wrapper.className = 'select-dropdown select-dropdown--' + i;
//         buttonElement.className = 'select-dropdown__button select-dropdown__button--' + i;
//         buttonElement.setAttribute('data-value', '');
//         buttonElement.setAttribute('type', 'button');
//         spanElement.className = 'select-dropdown select-dropdown--' + i;
//         iElement.className = 'zmdi zmdi-chevron-down';
//         ulElement.className = 'select-dropdown__list select-dropdown__list--' + i;
//         ulElement.id = 'select-dropdown__list-' + i;

//         wrapper.appendChild(buttonElement);
//         spanElement.appendChild(spanText);
//         buttonElement.appendChild(spanElement);
//         buttonElement.appendChild(iElement);
//         wrapper.appendChild(ulElement);
//     }

//     function displyUl(element) {

//         if (element.tagName == 'BUTTON') {
//             selectDropdown = element.parentNode.getElementsByTagName('ul');
//             //var labelWrapper = document.getElementsByClassName('js-label-wrapper');
//             for (var i = 0, len = selectDropdown.length; i < len; i++) {
//                 selectDropdown[i].classList.toggle("active");
//                 //var parentNode = $(selectDropdown[i]).closest('.js-label-wrapper');
//                 //parentNode[0].classList.toggle("active");
//             }
//         } else if (element.tagName == 'LI') {
//             var selectId = element.parentNode.parentNode.getElementsByTagName('select')[0];
//             selectElement(selectId.id, element.getAttribute('data-value'));
//             elementParentSpan = element.parentNode.parentNode.getElementsByTagName('span');
//             element.parentNode.classList.toggle("active");
//             elementParentSpan[0].textContent = element.textContent;
//             elementParentSpan[0].parentNode.setAttribute('data-value', element.getAttribute('data-value'));
//         }

//     }

//     function selectElement(id, valueToSelect) {
//         var element = document.getElementById(id);
//         element.value = valueToSelect;
//         element.setAttribute('selected', 'selected');
//     }
//     var buttonSelect = document.getElementsByClassName('select-dropdown__button');
//     for (var i = 0, len = buttonSelect.length; i < len; i++) {
//         buttonSelect[i].addEventListener('click', function (e) {
//             e.preventDefault();
//             displyUl(this);
//         }, false);
//     }
// }
// $('document').ready(function ($) {
//     // Get the comment form
//     var commentform = $('#commentform');
//     // Add a Comment Status message
//     commentform.prepend('<div id="comment-status" ></div>');
//     // Defining the Status message element 
//     var statusdiv = $('#comment-status');
//     commentform.submit(function () {
//         // Serialize and store form data
//         var formdata = commentform.serialize();
//         //Add a status message
//         statusdiv.html('<p class="ajax-placeholder">Processing...</p>');
//         //Extract action URL from commentform
//         var formurl = commentform.attr('action');
//         //Post Form with data
//         $.ajax({
//             type: 'post',
//             url: formurl,
//             data: formdata,
//             error: function (XMLHttpRequest, textStatus, errorThrown) {
//                 statusdiv.html('<p class="ajax-error" >You might have left one of the fields blank, or be posting too quickly</p>');
//             },
//             success: function (data, textStatus) {
//                 if (data == "success")
//                     statusdiv.html('<p class="ajax-success" >Thanks for your comment. We appreciate your response.</p>');
//                 else
//                     statusdiv.html('<p class="ajax-error" >Please wait a while before posting your next comment</p>');
//                 commentform.find('textarea[name=comment]').val('');
//             }
//         });
//         return false;
//     });
// });
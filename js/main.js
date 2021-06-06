"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // inputmask

    let phone = document.querySelectorAll("input[type='tel']"),
        im = new Inputmask("+7 (999) 999-99-99");
    im.mask(phone);

    // tabs 
    let list = document.querySelectorAll('#tabNav a');
    let nextStep = document.querySelectorAll('.inspection__tab-next');
    for (let i = 0; i < nextStep.length; i++) {
        nextStep[i].addEventListener('click', function (e) {
            e.preventDefault();
            list[i + 1].click();
        });
    }
    list = Array.prototype.slice.call(list, 0); // convert nodeList to Array
    list.forEach(function (el, i, ar) {
        el.addEventListener('click', function (event) {
            event.preventDefault();
            var tab = document.querySelector(el.getAttribute('href'));
            // remove "act" class
            document.querySelector('#tabNav .act')
                .classList.remove('act');
            document.querySelector('#tabsWrap .act')
                .classList.remove('act');

            // set "act"
            el.classList.add('act');
            tab.classList.add('act');
        })
    });

    //E-mail Ajax Send
    $(".form-send").submit(function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: th.serialize()
        }).done(function () {
            callbackModal.close();
            submitModal.open();
            $('.form').css('width', '100%');
            setTimeout(function () {
                // Выполнено
                th.trigger("reset");
            }, 1000);
        });
        return false;
    });

    // modals
    var submitModal = new tingle.modal({
        footer: false,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Закрыть",
        cssClass: ['submit-modal'],
    });

    submitModal.setContent('<div class="modal__content"><h2 class="title modal__title">Спасибо!</h2><span class="modal__subtitle">Мы свяжемся с вами в течение 20 минут</span></div>');

    // Загрузка видео по клику

    function findVideos() {
        let videos = document.querySelectorAll('.video');

        for (let i = 0; i < videos.length; i++) {
            setupVideo(videos[i]);
        }
    }

    function setupVideo(video) {
        let link = video.querySelector('.video__link');
        let media = video.querySelector('.video__media');
        let button = video.querySelector('.video__button');
        let id = parseMediaURL(media);

        video.addEventListener('click', () => {
            let iframe = createIframe(id);

            link.remove();
            button.remove();
            video.appendChild(iframe);
        });

        link.removeAttribute('href');
        video.classList.add('video--enabled');
    }

    function parseMediaURL(media) {
        let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
        let url = media.src;
        let match = url.match(regexp);

        return match[1];
    }

    function createIframe(id) {
        let iframe = document.createElement('iframe');

        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('src', generateURL(id));
        iframe.classList.add('video__media');

        return iframe;
    }

    function generateURL(id) {
        let query = '?rel=0&showinfo=0&autoplay=1';

        return 'https://www.youtube.com/embed/' + id + query;
    }

    findVideos();

    // sub-menu

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    const body = document.querySelector('body'),
        itemHasChildren = document.querySelectorAll('.menu-item-has-children');
    if (isMobile.any()) {
        body.classList.add('touch');
        itemHasChildren.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    } else {
        body.classList.add('mouse');
    }

    // scroll menu
    const menuBlock = document.querySelector('.header'),
        page = document.querySelector('.page');


    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= 300) {
            menuBlock.classList.add('header--fixed');
            page.classList.add('page--scroll');
        } else if (window.pageYOffset < 300) {
            menuBlock.classList.remove('header--fixed');
            page.classList.remove('page--scroll');
        }
    });

    // mobile menu

    const menuBtn = document.querySelector('.menu-btn'),
        menuClose = document.querySelector('.menu__close'),
        menu = document.querySelector('.menu__inner');

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.toggle('lock');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.toggle('active');
        body.classList.remove('lock');
    });

   //slider licenses
   const licenseSlider = new Swiper('.licenses__slider', {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    navigation: {
        nextEl: '.license-items__next',
        prevEl: '.license-items__prev',
    },
    breakpoints: {
        // when window width is >= 320px
        540: {
            slidesPerView: 2,
            spaceBetween: 20
        },
    }
});


 
});console.log(true);
"use strict";

function ibg() {
  var ibg = document.querySelectorAll(".ibg");

  for (var index = 0; index < ibg.length; index++) {
    if (ibg[index].querySelector('img')) {
      ibg[index].style.backgroundImage = 'url(' + ibg[index].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();

var slideUp = function slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (!target.classList.contains('slide')) {
    target.classList.add('slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('slide');
    }, duration);
  }
};

var slideDown = function slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (!target.classList.contains('slide')) {
    target.classList.add('slide');

    if (target.hidden) {
      target.hidden = false;
    }

    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('slide');
    }, duration);
  }
};

var slideToggle = function slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
};

var select = document.querySelectorAll('.select');
var activeSelect;

var _loop = function _loop(index) {
  var item = select[index];
  var selectOption = item.querySelectorAll('option');
  var selectOptionLength = selectOption.length;
  var selectedOption = item.querySelector('option[selected]');
  var disabledOption = item.querySelector('option[disabled]');
  var duration = 300;
  item.querySelector('select').hidden = true;
  var head = document.createElement('div');
  var text = document.createElement('span');
  head.classList.add('select__head');
  text.textContent = disabledOption ? disabledOption.textContent : selectedOption.textContent;
  head.append(text);
  item.append(head);
  var icon = item.querySelector('.select__icon');

  if (icon) {
    head.append(icon);
  }

  var selectList = document.createElement('ul');
  selectList.classList.add('select__list');
  item.append(selectList);

  if (!disabledOption) {
    var newOption = document.createElement('li');
    newOption.textContent = selectedOption ? selectedOption.textContent : selectOption[0].textContent;
    newOption.classList.add('select__item');
    newOption.dataset.value = selectedOption ? selectedOption.value : selectOption[0].textContent;
    selectList.append(newOption);
  }

  for (var _index4 = 1; _index4 < selectOptionLength; _index4++) {
    var _newOption = document.createElement('li');

    _newOption.textContent = selectOption[_index4].textContent;

    _newOption.classList.add('select__item');

    _newOption.dataset.value = selectOption[_index4].value;
    selectList.append(_newOption);
  }

  selectList.hidden = true;
  head.addEventListener('click', function (e) {
    if (!document.querySelector('.select__list.slide') && e.target.closest('.select__head')) {
      if (activeSelect && !e.target.closest('.select__head').nextElementSibling.isEqualNode(activeSelect)) {
        slideUp(activeSelect);
        activeSelect.closest('.select').querySelector('.select__head').classList.remove('active');
      }

      activeSelect = e.target.closest('.select__head').nextElementSibling;
      e.currentTarget.classList.toggle('active');
      slideToggle(selectList);
    }
  });
  selectList.addEventListener('click', function (e) {
    if (e.target.closest('.select__item')) {
      var target = e.target.closest('.select__item');
      var value = target.dataset.value;
      var newSelectedEl = item.querySelector("option[value=\"".concat(value, "\"]"));
      var oldSelectedEl = item.querySelector('option[selected]');

      if (!newSelectedEl) {
        for (var _index5 = 1; _index5 < selectOptionLength; _index5++) {
          var option = selectOption[_index5];

          if (option.textContent == value) {
            newSelectedEl = option;
          }
        }
      }

      if (oldSelectedEl) {
        oldSelectedEl.removeAttribute('selected');
      }

      if (newSelectedEl) {
        newSelectedEl.setAttribute('selected', 'selected');
        text.textContent = newSelectedEl.textContent;
      }

      head.classList.remove('active');
      activeSelect = null;
      e.target.closest('.select').querySelector('select').dispatchEvent(new Event('change'));
      slideUp(selectList);
    }
  });
};

for (var index = 0; index < select.length; ++index) {
  _loop(index);
}

window.addEventListener('click', function (e) {
  if (document.querySelector('.select__head.active') && !e.target.closest('.select') && !document.querySelector('.select__list.slide')) {
    activeSelect.closest('.select').querySelector('.select__head').classList.remove('active');
    slideUp(activeSelect);
    activeSelect = null;
  }
}); //BuildSlider

var sliders = document.querySelectorAll(".swiper");

if (sliders) {
  for (var _index = 0; _index < sliders.length; _index++) {
    var slider = sliders[_index];

    if (!slider.classList.contains('swiper-build')) {
      var slider_items = slider.children;

      if (slider_items) {
        for (var _index2 = 0; _index2 < slider_items.length; _index2++) {
          var el = slider_items[_index2];
          el.classList.add('swiper-slide');
        }
      }

      var slider_content = slider.innerHTML;
      var slider_wrapper = document.createElement("div");
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = "";
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-build');
    }

    if (slider.classList.contains('_gallery')) {//slider.data('lightGallery').destroy(true);
    }
  }

  sliders_build_callback();
}

function sliders_build_callback() {}

var spoilersArray = document.querySelectorAll("[data-spoilers]");

if (spoilersArray.length > 0) {
  // ??????????????????????????
  var initSpoilers = function initSpoilers(spoilersArray) {
    var matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    spoilersArray.forEach(function (spoilersBlock) {
      spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock;

      if (matchMedia.matches || !matchMedia) {
        spoilersBlock.classList.add("init");
        initSpoilerBody(spoilersBlock);
        spoilersBlock.addEventListener("click", setSpoilerAction);
      } else {
        spoilersBlock.classList.remove("init");
        initSpoilerBody(spoilersBlock, false);
        spoilersBlock.removeEventListener("click", setSpoilerAction);
      }
    });
  }; // ???????????? ?? ??????????????????


  var initSpoilerBody = function initSpoilerBody(spoilersBlock) {
    var hideSpoilerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var spoilerTitles = spoilersBlock.querySelectorAll("[data-spoiler]");

    if (spoilerTitles.length > 0) {
      spoilerTitles.forEach(function (spoilerTitle) {
        if (hideSpoilerBody) {
          spoilerTitle.removeAttribute("tabindex");

          if (!spoilerTitle.classList.contains("active-spoiler")) {
            spoilerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spoilerTitle.setAttribute("tabindex", "-1");
          spoilerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  };

  var setSpoilerAction = function setSpoilerAction(e) {
    var el = e.target;

    if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
      var spoilerTitle = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]');
      var spoilersBlock = spoilerTitle.closest('[data-spoilers]');
      var oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler') ? true : false;

      if (!spoilersBlock.querySelectorAll(".slide").length) {
        if (oneSpoiler && !spoilerTitle.classList.contains("active-spoiler")) {
          hideSpoilerBody(spoilersBlock);
        }

        spoilerTitle.classList.toggle("active-spoiler");
        slideToggle(spoilerTitle.nextElementSibling, 500);
      }

      e.preventDefault();
    }
  };

  var hideSpoilerBody = function hideSpoilerBody(spoilersBlock) {
    var spoilerActiveTitle = spoilersBlock.querySelector('[data-spoiler].active-spoiler');

    if (spoilerActiveTitle) {
      spoilerActiveTitle.classList.remove("active-spoiler");
      slideUp(spoilerActiveTitle.nextElementSibling, 500);
    }
  };

  // ?????????????????? ?????????????? ??????????????????
  var spoilersRegular = Array.from(spoilersArray).filter(function (item, index, self) {
    return !item.dataset.spoilers.split(",")[0];
  }); // ?????????????????????????? ?????????????? ??????????????????

  if (spoilersRegular.length > 0) {
    initSpoilers(spoilersRegular);
  } // ?????????????????? ?????????????????? ?? ?????????? ??????????????????


  var spoilersMedia = Array.from(spoilersArray).filter(function (item, index, self) {
    return item.dataset.spoilers.split(",")[0];
  }); // ?????????????????????????? ?????????????????? ?? ?????????? ??????????????????

  if (spoilersMedia.length > 0) {
    var breakpointsArray = [];
    spoilersMedia.forEach(function (item) {
      var params = item.dataset.spoilers;
      var breakpoint = {};
      var paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    }); // ???????????????? ???????????????????? ??????????????????????

    var mediaQueries = breakpointsArray.map(function (item) {
      return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }); // ???????????????? ?? ???????????? ????????????????????????

    mediaQueries.forEach(function (breakpoint) {
      var paramsArray = breakpoint.split(",");
      var mediaBreakpoint = paramsArray[1];
      var mediaType = paramsArray[2];
      var matchMedia = window.matchMedia(paramsArray[0]); // ?????????????? ?? ?????????????? ??????????????????

      var spoilersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addEventListener("change", function () {
        initSpoilers(spoilersArray, matchMedia);
      });
      initSpoilers(spoilersArray, matchMedia);
    });
  }
}

if (document.querySelector('.products__slider')) {
  var loop = document.querySelector('.products__slider').dataset.sliderLoop;
  var productsSlider = new Swiper('.products__slider', {
    speed: 800,
    loop: loop === 'on',
    spaceBetween: 40,
    slidesPerView: 1.5,
    navigation: {
      prevEl: '.products__button-prev',
      nextEl: '.products__button-next'
    },
    breakpoints: {
      1279: {
        slidesPerView: 5,
        spaceBetween: 82
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    }
  });
}

if (document.querySelector('.main-slider__slider')) {
  var mainSlider = new Swiper('.main-slider__slider', {
    autoplay: {
      delay: 8000
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    speed: 1000,
    spaceBetween: 30,
    pagination: {
      el: ".main-slider__pagination",
      clickable: true
    } // on: {
    //     init() {
    //         const slides = document.querySelectorAll('.main-slider__slider .swiper-slide');
    //         for (let index = 0; index < slides.length; index++) {
    //             const slide = slides[index]
    //             slide.querySelector('.slide-main-slider__content').dataset.index = index
    //         }
    //
    //         const activeSlide = document.querySelector('.main-slider__slider .swiper-slide.swiper-slide-active')
    //
    //         const content = document.querySelector(`.slide-main-slider__content[data-index="${this.realIndex}"]`)
    //         content.classList.add('active')
    //     },
    //     slideChange() {
    //         const activeSlide = document.querySelector('.main-slider__slider .swiper-slide.swiper-slide-active')
    //         if (activeSlide) {
    //             const activeContent = document.querySelector('.slide-main-slider__content.active')
    //             if (activeContent) {
    //                 activeContent.classList.remove('active')
    //             }
    //
    //             const content = document.querySelector(`.slide-main-slider__content[data-index="${this.realIndex}"]`)
    //             content.classList.add('active')
    //         }
    //
    //     }
    // }

  });
}

var iconMenu = document.querySelector('.icon-menu');

if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('active');
    document.querySelector('.menu').classList.toggle('active');
    document.body.classList.toggle('hidden');
    document.querySelector('.header').classList.toggle('active');
  });
}

var menuLinks = document.querySelectorAll('.menu__link');

if (menuLinks.length > 0) {
  var _loop2 = function _loop2(_index3) {
    var link = menuLinks[_index3];
    if (!link.nextElementSibling || !link.nextElementSibling.classList.contains('submenu')) return "continue";
    link.addEventListener('mouseenter', function () {
      if (!window.matchMedia("(min-width: 1279.98px)").matches) return;

      if (document.querySelector('.submenu.active')) {
        var activeSubmenu = document.querySelector('.submenu.active');
        activeSubmenu.classList.remove('active');
        activeSubmenu.classList.remove('active');
        activeSubmenu.previousElementSibling.classList.remove('active');
      }

      var submenu = link.nextElementSibling;
      submenu.classList.add('active');
      link.classList.add('active');
    });
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var submenu = link.nextElementSibling;
      submenu.classList.add('active');
      link.classList.add('active');
    });
  };

  for (var _index3 = 0; _index3 < menuLinks.length; _index3++) {
    var _ret = _loop2(_index3);

    if (_ret === "continue") continue;
  }
}

window.addEventListener('mousemove', function (e) {
  if (!window.matchMedia("(min-width: 1279.98px)").matches) return;

  if (document.querySelector('.submenu.active') && !e.target.closest('.menu__item')) {
    document.querySelector('.submenu.active').classList.remove('active');
    document.querySelector('.menu__link.active').classList.remove('active');
  }
});

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  var _this2 = this;

  var _this = this; // ???????????? ????????????????


  this.??bjects = [];
  this.daClassname = "_dynamic_adapt_"; // ???????????? DOM-??????????????????

  this.nodes = document.querySelectorAll("[data-da]"); // ???????????????????? ??bjects ????????????????

  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    var data = node.dataset.da.trim();
    var dataArray = data.split(",");
    var ??bject = {};
    ??bject.element = node;
    ??bject.parent = node.parentNode;
    ??bject.destination = document.querySelector(dataArray[0].trim());
    ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    ??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
    ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
    this.??bjects.push(??bject);
  }

  this.arraySort(this.??bjects); // ???????????? ???????????????????? ??????????-????????????????

  this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  }); // ?????????????????????? ?????????????????? ???? ??????????-????????????
  // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????

  var _loop3 = function _loop3(_i) {
    var media = _this2.mediaQueries[_i];
    var mediaSplit = String.prototype.split.call(media, ',');
    var matchMedia = window.matchMedia(mediaSplit[0]);
    var mediaBreakpoint = mediaSplit[1]; // ???????????? ???????????????? ?? ???????????????????? ????????????????????????

    var ??bjectsFilter = Array.prototype.filter.call(_this2.??bjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, ??bjectsFilter);
    });

    _this2.mediaHandler(matchMedia, ??bjectsFilter);
  };

  for (var _i = 0; _i < this.mediaQueries.length; _i++) {
    _loop3(_i);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
  if (matchMedia.matches) {
    for (var i = 0; i < ??bjects.length; i++) {
      var ??bject = ??bjects[i];
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.moveTo(??bject.place, ??bject.element, ??bject.destination);
    }
  } else {
    for (var _i2 = 0; _i2 < ??bjects.length; _i2++) {
      var _??bject = ??bjects[_i2];

      if (_??bject.element.classList.contains(this.daClassname)) {
        this.moveBack(_??bject.parent, _??bject.element, _??bject.index);
      }
    }
  }
}; // ?????????????? ??????????????????????


DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);

  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }

  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }

  destination.children[place].insertAdjacentElement('beforebegin', element);
}; // ?????????????? ????????????????


DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);

  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
}; // ?????????????? ?????????????????? ?????????????? ???????????? ????????????????


DynamicAdapt.prototype.indexInParent = function (parent, element) {
  var array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}; // ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max


DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return -1;
        }

        if (a.place === "last" || b.place === "first") {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === "first" || b.place === "last") {
          return 1;
        }

        if (a.place === "last" || b.place === "first") {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

var da = new DynamicAdapt("max");
da.init();
// IntersectionObservers
(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var elementSelector = '[data-lazy-img]'; // target elements' selector
        var elements = document.querySelectorAll(elementSelector);  // target elements
        var options = {
            root: null, //root element for relative observe
            rootMargin: '0px', // root margin
            threshold: 0, // either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
        };
        var callback = function (entries) {
            entries.forEach(function (entry) {
                var element = entry.target;

                if (entry.isIntersecting) {
                    element.onload = function () {
                        this.classList.add('loaded');
                        this.removeAttribute('data-lazy-img');
                    };
                    element.src = element.dataset.lazyImg;
                    ViewportObserver.unobserve(element);
                }
            });
        };
        var ViewportObserver = new IntersectionObserver(callback, options);

        var isIE = navigator.userAgent.indexOf("MSIE") !== -1;

        [].forEach.call(elements, function (element) {
            if (isIE) {
                element.src = element.dataset.lazyImg;
                element.removeAttribute('data-lazy-img');
            } else {
                ViewportObserver.observe(element);
            }
        });
    });
}());


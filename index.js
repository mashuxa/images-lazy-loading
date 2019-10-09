// IntersectionObservers
(function() {
    var elementSelector = '[data-lazy-img]'; // target elements' selector
    var elements = document.querySelectorAll(elementSelector);  // target elements
    var options = {
        root: null, //root element for relative observe
        rootMargin: '0px', // root margin
        threshold: 0, // either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed.
    };
    var callback = function(entries) {
        entries.forEach(entry => {
            var element = entry.target;

            if(entry.isIntersecting) {
                element.src = element.dataset.lazyImg;
                element.removeAttribute('data-lazy-img');
                ViewportObserver.unobserve(element);
            }
        });
    };
    var ViewportObserver = new IntersectionObserver(callback, options);

    [].forEach.call(elements, function(element) {
        ViewportObserver.observe(element);
    });
}());


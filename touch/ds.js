/*
 * Diesel Sweeties mockup with touch
 */

// Give a hoot, don't pollute (global namespace)
(function (document, window) {
    // !Variable declaration/definitions
    var out, comics, startX, startY, startTime, dX, dY, i, l;
    
    // Get our output for debugging
    out = document.getElementById('out');
    comics = document.getElementById('comics');
    
    // !Functions
    function debug(msg) {
        var li = document.createElement('li');
        li.innerHTML = msg;
        out.appendChild(li);
        
        // Only keep the last three or so
        while (out.childElementCount > 3) {
            out.removeChild(out.children[0]);
        }
    } // function debug(msg)
    
    // !Events
    comics.addEventListener('touchstart', function (e) {
        // Keep it from bubbling up
        e.preventDefault();
        
        // Stash some starting info
        startTime = +new Date;
        startX = e.targetTouches[0].pageX;
        startY = e.targetTouches[0].pageY;
    }, false);
    
    comics.addEventListener('touchmove', function (e) {
        // Keep it from bubbling up
        e.preventDefault();

        // Figure out how far to move and translate -- but just along X
        dX = e.targetTouches[0].pageX - startX;
        e.targetTouches[0].target.style.webkitTransform = 'translate('+dX+'px, 0px)';
    }, false);
    
    comics.addEventListener('touchend', function (e) {
        var endTime = +new Date, dT = endTime - startTime, newClassName;
        
        // Keep it from bubbling up
        e.preventDefault();
        
        // Adjust some classes to trigger up some webkit transitions
        e.target.style.webkitTransitionDelay = dT + 'ms';
        if (e.target.className == 'cur') {
            if (dX >= 0) {
                if (e.target !== comics.children[0]) {
                    e.target.className = 'next';
                    if (!!e.target.previousElementSibling) {
                        e.target.previousElementSibling.className = 'cur';
                    }
                }
            } else {
                if (e.target !== comics.children[comics.childElementCount-1]) {
                    e.target.className = 'prev';
                    if (!!e.target.nextElementSibling) {
                        e.target.nextElementSibling.className = 'cur';
                    }
                }
            }
        }
        
        // Clear out our starting point and translation
        startX = startY = dX = dY = 0;
        e.target.style.webkitTransform = '';
    }, false);
    
    // Set up the images with some classes
    for (i = 0, l = comics.childElementCount; i < l; i++) {
        comics.children[i].className = 'prev';
    }
    comics.children[l-1].className = 'cur';
})(document, window);
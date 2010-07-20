// Messing around with generated gradients
// Copyright (c) 2010 Brian Arnold
// MIT License

// Keep global space cleeeeeeean
(function () {
    function newGrad() {
        var box = document.getElementById('box'), grad = [], start, inc, end, noise, shade;

        // A few 'settings'
        start = 0.02;
        end = 1 - start;
        inc = 0.01;
        noise = start + inc;

        // Make a gradient bit by bit
        grad.push('linear');
        grad.push('left top');
        grad.push('left bottom');
        grad.push('color-stop(0, rgb(153,153,153))');
        grad.push('color-stop(' + start + ', rgb(193,193,193))');

        // Introduce some noise!
        while (noise < end) {
            // Figure out a new shade
            shade = Math.floor(Math.random() * 20) + 180;
            grad.push('color-stop(' + noise + ', rgb(' + shade + ',' + shade + ',' + shade + '))');
            //noise += Math.floor(Math.random() * 0.1);
            noise += inc;
        }

        // Finish it
        grad.push('color-stop(' + end + ', rgb(193,193,193))');
        grad.push('color-stop(1, rgb(153,153,153))');

        // Set it on the box
        box.style.backgroundImage = '-webkit-gradient(' + grad.join(', ') + ')';
    } // function newGrad

    // Events!
    document.addEventListener('DOMContentLoaded', newGrad, false);
    document.getElementById('redo').addEventListener('click', newGrad, false);
    console.log('Whee');
})();

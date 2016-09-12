var KNZ = window.KNZ || {};

KNZ.Utils.getPixels = function( context ) {
    return context.getImageData(0, 0, context.canvas.width, context.canvas.height).data;
};

KNZ.Utils.getPosition = function( event ) {
    if (event.x !== undefined && event.y !== undefined) {
        
        KNZ.MOUSE.x = event.x - KNZ.VARS.DOM.paintCanvas.offsetLeft;
        KNZ.MOUSE.y = event.y - KNZ.VARS.DOM.paintCanvas.offsetTop;

    } else if (event.pageX !== undefined && event.pageY !== undefined) {

        KNZ.MOUSE.x = event.pageX;
        KNZ.MOUSE.y = event.pageY;

    } else {

        KNZ.MOUSE.x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        KNZ.MOUSE.y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        
    }
    
    KNZ.MOUSE.x -= KNZ.VARS.DOM.container.offsetLeft;
    KNZ.MOUSE.y -= KNZ.VARS.DOM.container.offsetTop;

};

KNZ.Utils.getCssValuePrefix = function(name, value) {
    var prefixes = ['', '-o-', '-ms-', '-moz-', '-webkit-'];

    // Create a temporary DOM object for testing
    var dom = document.createElement('div');

    for (var i = 0; i < prefixes.length; i++) {
        // Attempt to set the style
        dom.style[name] = prefixes[i] + value;

        // Detect if the style was successfully set
        if (dom.style[name]) {
            return prefixes[i];
        }
        dom.style[name] = '';   // Reset the style
    }
};
var KNZ = window.KNZ || {};

KNZ.Events  = (function () {

    var _isDragging = false;

    function init(){

        var selector = document.getElementsByTagName('body')[0];

        selector.addEventListener("mousedown", function (event) {
            _isDragging = true;

            KNZ.Utils.getPosition(event);

            // KNZ.Game._startAnimation();
            
            // prevent event defaults
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);

        selector.addEventListener("mouseup", function (event) {
            _isDragging = false;

            KNZ.Utils.getPosition(event);
            // cancel the animation (save cpu power when not dragging the mouse)

            // KNZ.Game.resetFrame();
            
            // prevent event defaults
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);

        selector.addEventListener("mousemove", function (event) {
            KNZ.Utils.getPosition(event);

            // prevent event defaults
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);


        //////////////////////////////////////// TOUCH


        selector.addEventListener("touchstart", function (event) {
            _isDragging = true;

            KNZ.Utils.getPosition(event);
            
            // KNZ.Game.startAnimation();
            
            // prevent event defaults
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);

        selector.addEventListener("touchend", function (event) {
            _isDragging = false;

            KNZ.Utils.getPosition(event);
            // cancel the animation (save cpu power when not dragging the mouse)

            // KNZ.Game.resetFrame();
            
            // prevent event defaults
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);

        selector.addEventListener("touchmove", function (event) {
            KNZ.Utils.getPosition(event);

            // prevent event defaults
            event.preventDefault();
            event.stopPropagation();
            return false;
        }, false);


    //////////////////////////////////////// TOUCH


    }



    function isDragging(){
        return ( _isDragging === true ) ? true : false;
    }

    function setDragging(state){
        _isDragging = state;
    }

    return {

        init : init,
        isDragging : isDragging,
        setDragging : setDragging

    };

})();
var KNZ = window.KNZ || {};

KNZ.Resize  = (function () {

    var
        _domWrapper = document.getElementsByClassName('main_wrapper')[0],
        _domHand = document.getElementById('hand'),
        _domBG = document.getElementById('background'),
        _domHandTop = document.getElementsByClassName('hand_top')[0];
        _domHandBot = document.getElementsByClassName('hand_bot')[0];


    function init(){

        calculateLayout();

        var lazyLayout = _.debounce(calculateLayout, 100);
        $( window ).resize( lazyLayout );

    }

    function calculateLayout(){
            
        var W = $(window).width(),
            H = $(window).height(),
            aspect = W / H;
            
        _domBG.style.height = H + 'px';

        _domWrapper.style.height = H + 'px';

    }

    return {

        init : init

    };

})();

 /**
  * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
  * images to fit into a certain area.
  *
  * @param {Number} srcWidth Source area width
  * @param {Number} srcHeight Source area height
  * @param {Number} maxWidth Fittable area maximum available width
  * @param {Number} maxHeight Fittable area maximum available height
  * @return {Object} { width, heigth }
  */
function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
    ratio = Math.min(ratio[0], ratio[1]);

    return { width:srcWidth*ratio, height:srcHeight*ratio };
 }
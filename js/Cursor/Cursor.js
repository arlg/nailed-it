var KNZ = window.KNZ || {};

KNZ.Cursor  = (function () {

    var _domCursor = null,
        _domContainer = null;

var _domHand = null;
    function init(){

        _domCursor = document.getElementById('cursor');
        _domContainer = document.getElementsByClassName('main_wrapper')[0];

        _domHand = document.getElementById('hand');

    }

    function update( x, y ){
        
        _domCursor.style.top = ( y + _domHand.offsetTop- ( _domCursor.clientHeight ) ) + 'px';
        _domCursor.style.left = ( x + ( _domContainer.offsetLeft - ( _domCursor.clientWidth ) )  ) + 'px';

        if ( KNZ.Events.isDragging() === true && !(navigator.appName == "Microsoft Internet Explorer")){
            $(_domCursor).addClass('active');
        }else{
            $(_domCursor).removeClass('active');
        }

    }

    return {

        init : init,
        update : update

    };

})();
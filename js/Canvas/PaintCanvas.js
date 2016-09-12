var KNZ = window.KNZ || {};

KNZ.PaintCanvas  = (function () {

    var _domCanvas = null,
        _ctx = null,
        _imageAsset = null;

    function init(){

        _domCanvas = document.getElementById('paint');
        _ctx = _domCanvas.getContext("2d");

        _domCanvas.width= KNZ.VARS.CANVAS.width;
        _domCanvas.height = KNZ.VARS.CANVAS.height;

        _loadImageAsset();

    }

    function _loadImageAsset(){

        _imageAsset = new Image();
        _imageAsset.onload = function () {
                
            _ctx.drawImage(this, 0, 0, KNZ.VARS.CANVAS.width, KNZ.VARS.CANVAS.height);
            _ctx.globalCompositeOperation = "destination-out";

        };

        if (  KNZ.VARS.CURRENT_LAYER === 0 )
            _imageAsset.src = KNZ.Data.assetnutral;
        else{
            _imageAsset.src = KNZ.VARS.CURRENT_SET_DATA.colorassets[ KNZ.VARS.CURRENT_LAYER -1 ];
        }

    }

    function draw(x, y){
            
        _ctx.moveTo(x, y);
        var gradient = _ctx.createRadialGradient(x, y, 5, x, y, 60);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

        _ctx.arc(x, y, 10, 0, 2 * Math.PI);
        _ctx.fillStyle = gradient;
        _ctx.fill();

    }

    function clean(){

        _ctx.clearRect( 0, 0, KNZ.VARS.CANVAS.width, KNZ.VARS.CANVAS.height );

        $(_domCanvas).remove();
        _domCanvas = null;

        _domCanvas = document.createElement('canvas');
        _domCanvas.id = 'paint';
        document.getElementById('paint_canvas_wrapper').appendChild(_domCanvas);

        _ctx = _domCanvas.getContext("2d");

        _domCanvas.width= KNZ.VARS.CANVAS.width;
        _domCanvas.height = KNZ.VARS.CANVAS.height;

        _loadImageAsset();

    }

    function clearAll(){

        _ctx.clearRect( 0, 0, KNZ.VARS.CANVAS.width, KNZ.VARS.CANVAS.height );

    }

    return {

        init : init,
        draw : draw,
        clean : clean,
        clearAll : clearAll

    };

})();
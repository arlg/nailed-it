var KNZ = window.KNZ || {};

KNZ.MaskCanvas  = (function () {

    var _domCanvas = null,
        _ctx = null,
        _maskAsset = null,
        _blackPixelAmount = 0,
        _allImagePixels = 0,
        _currentPercent = 0,
        _isPixelCalculated = false;

    function init(){
        
        _domCanvas = document.createElement('canvas');
        _domCanvas.id = 'mask';

        _ctx = _domCanvas.getContext("2d");

        _domCanvas.width= KNZ.VARS.CANVAS.width;
        _domCanvas.height = KNZ.VARS.CANVAS.height;
        
        _loadImageAsset(function(){});

    }

    // Claculates the base amount of black pixel
    function _calculatePixelAmount(){
        
        _allImagePixels = KNZ.Utils.getPixels( _ctx );

        // iterate over the pixels
        for (var i = 0, n = _allImagePixels.length; i < n; i += 4) {

            // if find a black pixel, add +1 
            if (_allImagePixels[i] === 0 && _allImagePixels[i + 1] === 0 && _allImagePixels[i + 2] === 0) {
                _blackPixelAmount ++;
            }
        }

        _isPixelCalculated = true;
    
    }

    function checkCleaned(){

        if( _isPixelCalculated === false ) return;

        _allImagePixels = KNZ.Utils.getPixels( _ctx );

        // console.log('_allImagePixels' + _blackPixelAmount);

        var current = 0,
            length = _allImagePixels.length / 4;
            
        // iterate over the pixels
        for ( var i = 0, n = _allImagePixels.length; i < n; i += 4 ) {
            
            // if find a black pixel, the window is not fully cleaned
            if (_allImagePixels[i] === 0 && _allImagePixels[i + 1] === 0 && _allImagePixels[i + 2] === 0) {
                // Black Pixel
                current ++;
            }
        }

        _currentPercent = parseInt( 100 - ( ( current * 100 ) / _blackPixelAmount ), 10 );

        KNZ.Instances.counter.update( _currentPercent );

        if ( _currentPercent === 100 ){

            _isPixelCalculated = false;
            _blackPixelAmount = 0;
            _allImagePixels = 0;
            _currentPercent = 0;

            current = 0;
            return true;
        }


        return false;
        

    }

    function _loadImageAsset(  ){

        _maskAsset = new Image();
        _maskAsset.onload = function () {
            _ctx.drawImage(this, 0, 0);
            _calculatePixelAmount();
        };

        _maskAsset.src = KNZ.VARS.MASK_ASSET;

    }

    function draw(x, y){

        // clear the brush region on mask context with white color
        _ctx.moveTo(x, y);
        _ctx.arc(x, y, 15, 0, 2 * Math.PI);
        _ctx.fillStyle = "rgba(255,255,255,1)";
        _ctx.fill();

    }

    function clean(){

        $(_domCanvas).remove();
        _domCanvas = null;

        _domCanvas = document.createElement('canvas');
        _domCanvas.id = 'mask';

        _ctx = _domCanvas.getContext("2d");

        _domCanvas.width= KNZ.VARS.CANVAS.width;
        _domCanvas.height = KNZ.VARS.CANVAS.height;
        _ctx.clearRect( 0, 0, KNZ.VARS.CANVAS.width, KNZ.VARS.CANVAS.height );

        _isPixelCalculated = false;
        _blackPixelAmount = 0;
        _allImagePixels = 0;
        _currentPercent = 0;
        
        _ctx.drawImage( _maskAsset, 0, 0 );

        _calculatePixelAmount();

    }

    return {

        init : init,
        draw : draw,
        checkCleaned : checkCleaned,
        clean : clean

    };

})();
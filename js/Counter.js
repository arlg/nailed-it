var KNZ = window.KNZ || {};

KNZ.Counter  = (function () {

    var _BG = null,
        _progress = null,
        _nailSetPercent = 0,
        _prevPercent = 0;

    function init(){

        _BG = document.getElementById('background');
        _progress = document.getElementsByClassName('progress')[0];

        // Sets the bg color data
        // Run this when the page first loads
        var gradientPrefix = KNZ.Utils.getCssValuePrefix('backgroundImage',
                                       'linear-gradient(left, #fff, #fff)');
        _BG.style.background = KNZ.VARS.CURRENT_SET_DATA.topbgcolor;
        _BG.style.backgroundImage = gradientPrefix + 'linear-gradient( ' + KNZ.VARS.CURRENT_SET_DATA.topbgcolor + ', ' + KNZ.VARS.CURRENT_SET_DATA.bottombgcolor + ')';

    }

    function update( percent ){
        
        if( percent > 0 && KNZ.VARS.GAME_STARTED === false && KNZ.VARS.GAME_ENDED === false ){
            KNZ.VARS.GAME_STARTED = true;
            KNZ.Instances.game.startGame();
            
        }
          
        if ( percent < 0 || isNaN(percent) || KNZ.VARS.GAME_STARTED === false ) return;

        var current = percent - _prevPercent;

        // nailsetpercent passe de 100 à 200
        // if(_nailSetPercent < 201)
            // console.log(_nailSetPercent);

        _nailSetPercent += ( current );

        _progress.style.height = Math.floor( 100 - ( _nailSetPercent / KNZ.VARS.CURRENT_SET_LENGTH ))  + '%';

        _prevPercent = percent;

        if( percent === 100 ) _prevPercent = 0;

    }

    function reset( ){
        
    }

    return {

        init : init,
        update : update,
        reset : reset

    };

})();
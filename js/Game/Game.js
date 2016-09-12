var KNZ = window.KNZ || {};

KNZ.Game  = (function () {

    var _frame = -1,
        _visibleImage = KNZ.VisibleImage,
        _layerLength = 0,
        _timer = null;

    function init(){

        _visibleImage.changeImage();

        KNZ.Instances.counter.init();

        ANIM.Main.init();

        // start the "brush" animation
        resetFrame();
        _startAnimation();

    }

    function startGame(){
        KNZ.Instances.timer.init(); // Starts the timer
    }

    function endGame(){

        KNZ.Instances.timer.stop();
        KNZ.VARS.GAME_STARTED = false;
        KNZ.VARS.GAME_ENDED = true;

        _startAnimation(); // for the cursor

        KNZ.Instances.paintCanvas.clearAll();

        $('.ext span').addClass('blink_me');

        $('.btn_try, .right_text').addClass('active');

        var timer = setTimeout(function(){

            ANIM.Main.play();
            $('.hand_top, #paint').addClass('hidden');
            window.clearTimeout(timer);

        }, 1000);

    }

    function _draw(){

        var x = KNZ.MOUSE.x,
            y = KNZ.MOUSE.y;

        KNZ.Instances.cursor.update( x, y );
        
        if ( KNZ.Instances.events.isDragging() === true && KNZ.VARS.GAME_ENDED === false ){
            KNZ.Instances.paintCanvas.draw( x, y );
            KNZ.Instances.maskCanvas.draw( x, y );
        }
        
    }

    function animate(){

        _draw();

        if ( KNZ.Instances.maskCanvas.checkCleaned() === true && KNZ.VARS.GAME_STARTED === true ) {

            _onCurrentLayerComplete();

            return;
        }

        
        _frame = window.requestAnimationFrame( KNZ.Instances.game.animate );
    }

    function getFrame(){
        return _frame;
    }

    function resetFrame(){
        window.cancelAnimationFrame( _frame );
        _frame = -1;
    }

    function _startAnimation(){
        if ( _frame === -1 ) {
            _frame = window.requestAnimationFrame( KNZ.Instances.game.animate );
        }

    }

    function _onCurrentLayerComplete(){

        KNZ.Instances.events.setDragging(false);
        resetFrame();

        KNZ.VARS.CURRENT_LAYER ++;

        if( KNZ.VARS.CURRENT_LAYER === KNZ.VARS.CURRENT_SET_LENGTH  ){

            endGame();

            return;

        }

        KNZ.Instances.maskCanvas.clean();

        KNZ.Instances.paintCanvas.clean();

        _visibleImage.changeImage();

        animate();

    }


    return {

        init : init,
        animate : animate,
        getFrame : getFrame,
        resetFrame : resetFrame,
        startGame : startGame,
        _startAnimation : _startAnimation

    };

})();
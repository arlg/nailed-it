var KNZ = window.KNZ || {};

KNZ.Timer  = (function () {

    var _startTime = 0,
        _currentTime = 0,
        _timeout,
        _domM = null,
        _domS = null,
        _domMs = null,
        _M, _S, _MS;

    function init(){
        
        _startTime = new Date().getTime() / 1000;

        _domM = document.getElementById('m');
        _domS = document.getElementById('s');
        _domMs = document.getElementById('ms');
        
        start();

    }

    function start(){
        _timeout = window.setTimeout(function(){

            onTick();

        }, 80);
    }

    function stop(){
        window.clearTimeout( _timeout );
    }

    function onTick(){

        _currentTime = new Date().getTime() / 1000;

        var timespent = _currentTime - _startTime;
        
        _MS = ( timespent % 1 ).toFixed(2).toString().split(".")[1];
        _domMs.innerHTML = _MS;

        _S = Math.floor( timespent % 60 );
        if( _S < 10 )
            _S = '0' + _S;
        _domS.innerHTML = _S;

        _M = Math.floor( timespent / 60 );
        if( _M < 10 )
            _M = '0' + _M;
        _domM.innerHTML = _M;

        start();

    }

    function getFinalTime(){
        return _M + ':' + _S + ':' + _MS;
    }

    return {

        init : init,
        start : start,
        stop : stop,
        getFinalTime : getFinalTime

    };

})();
var KNZ = window.KNZ || {};

KNZ.VisibleImage  = (function () {

    var
        _image = document.getElementsByClassName('hand_top')[0];

    function changeImage( id ){

        // takes the image to load into the json
        var currentImageLayer = KNZ.VARS.CURRENT_SET_DATA.colorassets[ KNZ.VARS.CURRENT_LAYER ];

        _image.setAttribute('src', currentImageLayer);

    }

    return {

        changeImage : changeImage

    };

})();
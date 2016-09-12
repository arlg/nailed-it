var KNZ = window.KNZ || {};

KNZ.VARS = {

    DOM : {
        container : document.getElementById("hand"),
        paintCanvas : document.getElementById("paint")
    },

    CANVAS : {
        width : 467,
        height: 471
    },

    MASK_ASSET : 'assets/650/hand-hitarea.png',

    CURRENT_SET : 0,

    CURRENT_SET_DATA : '',

    CURRENT_SET_LENGTH : 0,
    
    CURRENT_LAYER : 0,

    GAME_STARTED : false,
    GAME_ENDED : false,

};

KNZ.MOUSE = {
    x: 0,
    y: 0
};

/*
* Gif Sequence for Christmas Experiments #6 - http://christmasexperiments.com
* @author Aurelien Gantier http://www.arlg.me
* Loads images and show them like a gif
*/

var ANIM = window.ANIM || {};

ANIM.Main = {

    //Vars
    images: [],
    imagesLength: 40,
    imagesPath: "",
    imagesExt: ".png",
    canvas: document.getElementById("animationcanvas"),
    CANVAS_WIDTH: KNZ.VARS.CANVAS.width,
    CANVAS_HEIGHT: KNZ.VARS.CANVAS.height,
    FPS : 30,
    ctx:'',
    current : 0,
    preloaded : 0,
    preloadedId : document.getElementById("number"),
    preloadedWrapper : document.getElementById("preload"),
    time : null,


    init: function() {

        this.imagesPath = KNZ.VARS.CURRENT_SET_DATA.sequencepath;

        ANIM.Main.initCanvas();
        ANIM.Main.loadImages();
    },

    loadImages: function() {
        for(var i = -1; i < ANIM.Main.imagesLength; i++) {
            var image = new Image();
            image.src = ANIM.Main.imagesPath + (i + 1) + ANIM.Main.imagesExt;
            
            image.onload = function() {
                ANIM.Main.onLoaded();
            };
            ANIM.Main.images[i] = image;
        }
    },

    initCanvas: function() {
        
        ANIM.Main.canvas.width = ANIM.Main.CANVAS_WIDTH;
        ANIM.Main.canvas.height = ANIM.Main.CANVAS_HEIGHT;
        ANIM.Main.ctx = ANIM.Main.canvas.getContext('2d');

        
    },

    onLoaded: function(){
        ANIM.Main.preloaded++;
        // ANIM.Main.preloadedId.innerHTML = (ANIM.Main.preloaded * 100) / ANIM.Main.imagesLength;
        if(ANIM.Main.preloaded == ANIM.Main.imagesLength){
            // ANIM.Main.preloadedWrapper.style.visibility = 'hidden';
            $('.loader').addClass('ishidden').fadeOut(2000, function(){
                $('.loader').remove();
            });
        }
    },

    loop : function(){

        //Clear
        ANIM.Main.ctx.clearRect( 0, 0, ANIM.Main.CANVAS_WIDTH, ANIM.Main.CANVAS_HEIGHT );

        if(ANIM.Main.current == ANIM.Main.imagesLength) ANIM.Main.current = 0;

        ANIM.Main.ctx.drawImage(ANIM.Main.images[ANIM.Main.current], 0, 0);

        ANIM.Main.current++;

        //next
        time = setTimeout(ANIM.Main.loop, 1000 / ANIM.Main.FPS);

    },

    play : function(){
        ANIM.Main.loop();
    }

};
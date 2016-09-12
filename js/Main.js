/********************
    KNZ NAIL TUTORIAL
    @author Aurelien Gantier
    @site http://www.arlg.me
*********************/

// App namespace
var KNZ = window.KNZ || {};

KNZ.Instances = {};
KNZ.Utils = {};
KNZ.Main = {};
KNZ.Data = {};

//Entry point
$(function() {

    KNZ.Main.init();

});

KNZ.Main = {


    init:  function(){
        
        var _this = this;

        this.loadData(function(){

            _this.onDataLoaded();

        });

    },

    loadData : function( callback ){
        $.getJSON( "json/data.json", function( data ) {
            KNZ.Data = data;
            callback();
        });
    },

    onDataLoaded:function(){
        
        // Init
        KNZ.Instances.counter = KNZ.Counter;

        // Canvas
        KNZ.Instances.maskCanvas = KNZ.MaskCanvas;
        KNZ.Instances.maskCanvas.init();

        KNZ.Instances.paintCanvas = KNZ.PaintCanvas;
        KNZ.Instances.paintCanvas.init();

        KNZ.Instances.game = KNZ.Game;
        
        KNZ.Instances.timer = KNZ.Timer;

        KNZ.Instances.cursor = KNZ.Cursor;
        KNZ.Instances.cursor.init();

        KNZ.Instances.events = KNZ.Events;
        KNZ.Instances.events.init();

        this.build();

        KNZ.Resize.init();

        KNZ.ButtonsEvents.init();
        
    },

    build : function(){
        
        // Gets the url hash
        if( window.location.hash ) {
            
            var hash = window.location.hash;
            hash = hash.replace('#', '');
                    
            for (var i = KNZ.Data.nailsets.length - 1; i >= 0; i--) {
                
                if( KNZ.Data.nailsets[i].id === hash ){
                        
                    KNZ.VARS.CURRENT_SET_DATA = KNZ.Data.nailsets[i];
                    KNZ.VARS.CURRENT_SET_LENGTH = KNZ.VARS.CURRENT_SET_DATA.colorassets.length;

                    KNZ.Instances.game.init();

                    // launch the game with appropriate assets
                    return;

                }

            }

            //Else
            this.hashNotFound();

        } else {
          
            this.hashNotFound();

        }


    },

    hashNotFound : function(){

        //Loads the default hash page

        var URL = window.location.href.replace(window.location.hash.substring(1), '');

        URL = URL.replace('#', '');

        URL += ( '#' + KNZ.Data.nailsets[0].id ) ;

        document.location.href = URL;

    }

};
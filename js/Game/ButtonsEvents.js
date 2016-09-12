var KNZ = window.KNZ || {};

KNZ.ButtonsEvents  = {

    init: function(){

        this.initEvents();

    },

    initEvents : function(){

        var _this = this;

        $('.btn_try').on('click touchstart', function(){

            window.location.reload();

        });

    },

};
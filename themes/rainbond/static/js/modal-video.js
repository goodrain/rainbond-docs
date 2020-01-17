
(function(win){
    function ModalVideo(option){
        this.option = Object.assign({}, {
            width:700,
            height: 400
        }, option);
        this._init();
    }
    ModalVideo.prototype = {
        _init: function(){
            this._create();
            this.bind();
        },
        _create: function(){
            this.$wrap = document.createElement('div');
            this.$wrap.className = "modal-video-wrap";
            this.$wrap.innerHTML = "<div class='bg'></div><div class='modal-video video-js'><span class='close'></span></div>";
            $('body').append(this.$wrap);
            $(this.$wrap).find('.modal-video').css({width: this.option.width, height: this.option.height})
        },
        show: function(option){
            var self = this;
            $(this.$wrap).show().find('.modal-video').append('<video id="modal-video-player" controls autoplay preload="auto" width="'+this.option.width+'" height="'+this.option.height+'"><source src="'+option.url+'" type="video/mp4"></video>');
            this.player = videojs('modal-video-player');
			videojs('modal-video-player').ready(function(){
				self.player.play();
			});
        },
        hide: function(){
            $(this.$wrap).hide();
            this.player.dispose();
            $(this.$wrap).find('video').remove();
            this.player = null;
        },
        bind: function(){
            var self = this;
            $(this.$wrap).delegate('.close', 'click', function(){
                self.hide();
            })
        }

    }
    win.ModalVideo = ModalVideo;
})(window)
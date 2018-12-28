// JavaScript source code
$(function () {
    var slider = {
        slides: document.querySelectorAll('#slides .slide'),
        currentSlide: 0,
        pauseButton: document.getElementById('pauseButton'),
        playing: true,

        nextSlide: function () {
            this.slides[this.currentSlide].className = 'slide';
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.slides[this.currentSlide].className = 'slide showing';
        },
        previousSlide: function () {
            this.slides[this.currentSlide].className = 'slide';
            this.currentSlide = (this.currentSlide + (this.slides.length - 1)) % this.slides.length;
            this.slides[this.currentSlide].className = 'slide showing';
        },


        pauseSlideshow: function () {
            pauseButton.innerHTML = 'Play';
            this.playing = false;
            clearInterval(slideInterval);
        },

        playSlideshow: function () {
            pauseButton.innerHTML = 'Pause';
            this.playing = true;
        },

    };


    var slideInterval = setInterval(function () { slider.nextSlide(); }, 5000);

    pauseButton.onclick = function () {
        if (slider.playing) { slider.pauseSlideshow(); }
        else {
            slider.playSlideshow();
            slideInterval = setInterval(function () { slider.nextSlide(); }, 5000);
        }
    };

    $('#nextSlide').click(function () { slider.nextSlide(); });
    $('#prevSlide').click(function () { slider.previousSlide(); });

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '37') {
            slider.previousSlide();//left
        }
        else if (e.keyCode == '39') {
            slider.nextSlide();//right
        }
    };

});


// JavaScript source code
$(function () {
    var canvas = {
        moncanvas: document.getElementById('canvas'),
        en_dessin: false,
        effacerBtn: document.getElementById('effacer'),
        width: 480,
        height: 360,


        init: function () {
            this.ctx = this.moncanvas.getContext('2d');
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 4;
            // Evenements souris
            this.moncanvas.addEventListener("mousedown", this.mouseDown.bind(this));
            this.moncanvas.addEventListener("mousemove", this.mouseMove.bind(this));
            this.moncanvas.addEventListener("mouseup", this.mouseUp.bind(this));
            // Evenements tactiles
            this.moncanvas.addEventListener("touchstart", this.touchStart.bind(this));
            this.moncanvas.addEventListener("touchend", this.touchEnd.bind(this));
            this.moncanvas.addEventListener('touchmove', this.touchMove.bind(this));
            this.moncanvas.addEventListener('touchcancel', this.touchCancel.bind(this));
            // Evenements bouton effacer
            this.effacerBtn.addEventListener('click', this.clearCanvas.bind(this));
        },

        mouseDown: function (e) {
            // Bouton de souris activé
            // Dessin activé
            this.en_dessin = true;
            // Repositionnement du début du tracé
            this.ctx.moveTo(e.offsetX, e.offsetY);
        },

        mouseMove: function (e) {
            // Mouvement de souris 
            if (this.en_dessin) this.dessiner(e.offsetX, e.offsetY);
        },

        mouseUp: function (e) {
            // Bouton de souris relâché 
            // Dessin désactivé
            this.en_dessin = false;
        },
        // Ajoute un segment au tracé 
        dessiner: function (x, y) {
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        },
        // Fonction Effacer le canvas 
        clearCanvas: function () {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.beginPath();
            this.en_dessin = false;
        },
        // Fonction pour le tactile
        touchStart: function (e) {
            this.en_dessin = true;
            this.ctx.moveTo(e.offsetX, e.offsetY);
        },
        touchEnd: function (e) {
            this.en_dessin = false;
        },
        touchMove: function (e) {
            var rect = this.moncanvas.getBoundingClientRect();
            this.x = e.touches[0].clientX - rect.left;
            this.y = e.touches[0].clientY - rect.top;
            if (this.en_dessin) this.dessiner(this.x, this.y);

        },
        touchCancel: function (e) {
            this.en_dessin = false;

        },
    };
    canvas.init();

    // Bloque le scroll sur le Canvas
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

});
// JavaScript source code
$(function () {
    var resa = {
        deadline: undefined,
        total: 0,
        minute: 0,
        seconde: 0,

        init: function () {
            $('#prenom').val(localStorage.getItem('prenom'));//prenom
            $('#nom').val(localStorage.getItem('nom'));//nom
            var oklm = new Date(sessionStorage.getItem('deadline')).getTime();//deadline en ms pour la comparer au moment du boot
            var compareDate = new Date();// date actuelle en ms
            if (oklm != undefined && oklm >= compareDate) {// si la deadline n'est pas indefinie et que deadline > date actuelle ==> lancer le décompte
                var address = sessionStorage.getItem('stationaddress');
                var number = sessionStorage.getItem('stationnumber');
                $('#infoderesa').html(address + number);
                return 1;
            }
            else { sessionStorage.clear(); }
        },

        sessionStorageSetup: function () {
            var temp = $('#number').text();
            var temp1 = $('#address').text();
            sessionStorage.setItem('stationaddress', temp1);
            sessionStorage.setItem('stationnumber', temp);
            $('#infoderesa').html("Votre V&#233;lo est station&#233; " + temp1 + ", Station N&#176; " + temp);
        },

        getTimeRemaining: function () {
            this.total = Date.parse(this.deadline) - Date.parse(new Date());//deadline - date du present
            this.seconde = Math.floor((this.total / 1000) % 60);// /1000 pour recup en secondes, %60 car l'on veut le reste des minutes
            this.minute = Math.floor((this.total / 1000 / 60) % 60);// /60 car on veut des heures et encore %60 pour en recup le reste en secondes
        },

        initializeClock: function () {
            var deadlineTest = sessionStorage.getItem('deadline');
            if (deadlineTest != undefined) {
                this.deadline = deadlineTest;
                var address = sessionStorage.getItem('stationaddress');
                var number = sessionStorage.getItem('stationnumber');
                $('#infoderesa').html("Votre V&#233;lo est station&#233; " + address + ", Station N&#176; " + number);
            } else {
                this.deadline = new Date(new Date().getTime() + 20 * 60 * 1000);
                this.sessionStorageSetup();// mise en memoire de l'adresse et du numero de la station
            }

            sessionStorage.setItem('deadline', this.deadline);// mise en memoire de la deadline

        },

        timer: function () {
            if (this.total >= 1) {//si deadline est inferieur a temps present et qu'un reset n'a pas été call alors affiche xxx
                $('#clockdiv').html("La reservation au nom de " + localStorage.getItem('nom') + " " + localStorage.getItem('prenom'))
                $('#clockdiv2').html('expire dans ' + this.minute + ' minutes et ' + this.seconde + ' secondes');
            }
            //else if (exec != "ok") {clearInterval(timeinterval);}//sinon si le reset a été call il arete la fonction
            else {//sinon il laisse le temps s'ecouler jusque 0 et l'affiche
                $('#clockdiv').html('La reservation est expir&#233;e');
                $('#clockdiv2').html('');//Vide un paragraphe
                $('#infoderesa').html('Vous n\'avez plus de r&#233;servation en cours');
                return 1;
            }
        },

        scrollDown: function () {
            window.scrollBy(0, 200);
        },

        submit: function (event) {
            event.preventDefault();
            var chooseStation = document.getElementById("chooseStation");
            var entrerNom = document.getElementById("enterName");
            if ($('#number').is(':empty')) { chooseStation.style.display = "block"; }
            else if ($('#nom').val().length == 0) {
                chooseStation.style.display = "none";
                entrerNom.style.display = "block";
            }
            else {
                chooseStation.style.display = "none";
                entrerNom.style.display = "none";
                var nom = $('#nom').val();
                var prenom = $('#prenom').val();
                localStorage.setItem('nom', nom);
                localStorage.setItem('prenom', prenom);
                sessionStorage.clear();
                var address = $('#address').text();
                var number = $('#number').text();

                $('#resaWarning').html('Reservation au nom de ' + nom + '\ ' + prenom + '.');
                $('#resaInfoStation').html('Station N&#176: ' + number + ' Lieu : ' + address + '.');
                var canvas = document.getElementById("floatinItem");
                canvas.style.display = "block";
            }
        },

        closeCanvas: function () {
            var canvas = document.getElementById("floatinItem");
            canvas.style.display = "none";
        },

        validSignature: function () {
            var canvas = document.getElementById("floatinItem");
            canvas.style.display = "none";
        },


    };
    var oki = resa.init();
    if (oki == 1) {
        resa.initializeClock();
        setTimeout(resa.scrollDown, 1001);
        var timeinterval = setInterval(function () {//setInterval(xxx,1000); pour call getTimeRemaining() 
            resa.getTimeRemaining();
            var stopTime = resa.timer();
            if (stopTime == 1) {
                clearInterval(timeinterval);
            }
        }, 1000);

    }

    $('#submit').click(resa.submit);
    $('#closeCanvas').click(resa.closeCanvas);
    $('#sig-submitBtn').click(function () {
        resa.initializeClock();
        var timeinterval = setInterval(function () {//setInterval(xxx,1000); pour call getTimeRemaining() 
            resa.getTimeRemaining();
            var stopTime = resa.timer();
            if (stopTime == 1) {
                clearInterval(timeinterval);
            }
        }, 1000);
        resa.validSignature();
        setTimeout(resa.scrollDown, 1000);
    });
});
// JavaScript source code
$(function () {
    var deadline;
    var name12 = 0;

    // Pour de boot de la page
    var oklm = new Date(sessionStorage.getItem('deadline')).getTime();//deadline en ms
    var compareDate = new Date();// date actuelle en ms
    var nom = localStorage.getItem('nom');
    var prenom = localStorage.getItem('prenom');

    $('#prenom').val(prenom);  //prenom
    $('#nom').val(nom);//nom
    if (oklm != undefined && oklm >= compareDate) {// si la deadline n'est pas indefinie et que deadline > date actuelle ==> lancer le décompte
        var address = sessionStorage.getItem('stationaddress');
        var number = sessionStorage.getItem('stationnumber');
        $('#infoderesa').html(address + number);
        initializeClock();
    }
    else { sessionStorage.clear();}
    
    function SessionStorageSetup() {
        var temp = $('#number').text();
        var temp1 = $('#address').text();
        sessionStorage.setItem('stationaddress', temp1);
        sessionStorage.setItem('stationnumber', temp);
        $('#infoderesa').html("Votre V&#233;lo est station&#233; " + temp1 + " Station N&#176; " + temp);
    }

    function getTimeRemaining() {
        var t = Date.parse(deadline) - Date.parse(new Date());//deadline - date du present
        var seconds = Math.floor((t / 1000) % 60);// /1000 pour recup en secondes, %60 car l'on veut le reste des minutes
        var minutes = Math.floor((t / 1000 / 60) % 60);// /60 car on veut des heures et encore %60 pour en recup le reste en secondes
        return {'total': t, 'minutes': minutes, 'seconds': seconds};
    }

    function initializeClock() {
        var deadlineTest = sessionStorage.getItem('deadline', deadline);
        if (deadlineTest != undefined) {
            deadline = deadlineTest;
            var address = sessionStorage.getItem('stationaddress');
            var number = sessionStorage.getItem('stationnumber');
            $('#infoderesa').html("Votre V&#233;lo est station&#233; " + address + " Station N&#176; " + number);
        } else {
            deadline = new Date(new Date().getTime() + 20 * 60 * 1000);
            SessionStorageSetup();// mise en memoire de l'adresse et du numero de la station
        }
        
        sessionStorage.setItem('deadline', deadline);// mise en memoire de la deadline

        var timeinterval = setInterval(function () {//setInterval(xxx,1000); pour call getTimeRemaining() 
            var t = getTimeRemaining();
            if (t.total >= 1) {//si deadline est inferieur a temps present et qu'un reset n'a pas été call alors affiche xxx
                $('#clockdiv').html("La reservation au nom de " + localStorage.getItem('nom') + " " + localStorage.getItem('prenom') )
                $('#clockdiv2').html('expire dans ' + t.minutes + ' minutes et ' + t.seconds + ' secondes');
            }
            //else if (exec != "ok") {clearInterval(timeinterval);}//sinon si le reset a été call il arete la fonction
            else {//sinon il laisse le temps s'ecouler jusque 0 et l'affiche
                $('#clockdiv').html('La reservation est expirée');
                $('#clockdiv2').html('');//Vide un paragraphe
                $('#infoderesa').html('Vous n\'avez plus de reservation en cours');
                clearInterval(timeinterval);
            }
        }, 1000);
    }

    function scrollDown() {
        window.scrollBy(0, 200);
    }
    
    $('#submit').click(function (event) {
        event.preventDefault();
        var chooseStation = document.getElementById("chooseStation");
        var entrerNom = document.getElementById("enterName");
        if ($('#number').is(':empty')) { chooseStation.style.display = "block"; }
        else if ($('#nom').val().length == 0) {
            chooseStation.style.display = "none";
            entrerNom.style.display = "block";}
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
    })
    $('#closeCanvas').click(function oki() {
        var canvas = document.getElementById("floatinItem");
        canvas.style.display = "none";
    })
    $('#sig-submitBtn').click(function () {

        initializeClock();
        var canvas = document.getElementById("floatinItem");
        canvas.style.display = "none";
        setTimeout(scrollDown, 1000);
        
    })
    
});

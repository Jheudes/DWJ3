// JavaScript source code
$(function () {
    var deadline;
    function DeadLineSetup() {
        var temporary;
        temporary = sessionStorage.getItem('deadline', deadline);
        $('#oki').html(deadline);
        if (Date.parse(temporary) - Date.parse(new Date()) >= 1) { deadline = temporary; }
        else { deadline = new Date(new Date().getTime() + 20 * 60 * 1000);}
    }
    function SessionStorageSetup() {
        var temp = $('#number').text();
        var temp1 = $('#address').text();
        sessionStorage.setItem('stationnumber', temp);
        sessionStorage.setItem('stationaddress', temp1);
    }
    function getTimeRemaining() {
        var t = Date.parse(deadline) - Date.parse(new Date());//deadline - date du present
        var seconds = Math.floor((t / 1000) % 60);// /1000 pour recup en secondes, %60 car l'on veut le reste des minutes
        var minutes = Math.floor((t / 1000 / 60) % 60);// /60 car on veut des heures et encore %60 pour en recup le reste
        return {'total': t, 'minutes': minutes, 'seconds': seconds};
    }
    function initializeClock() {
        $('#infoderesa').html($('#address').text() + $('#number').text());//permet d'afficher le numero de station
        SessionStorageSetup();// mise en memoire de l'adresse et du numero de la station
        DeadLineSetup();//set/reset de la deadline
        sessionStorage.setItem('deadline', deadline);// mise en memoire de la deadline

        var timeinterval = setInterval(function () {//setInterval(xxx,1000); pour call getTimeRemaining() 
            var t = getTimeRemaining();
            if (t.total >= 1) {//si deadline est inferieur a temps present et qu'un reset n'a pas été call alors affiche xxx
                $('#clockdiv').html('La reservation expire dans ' + t.minutes + ' minutes et ' + t.seconds + ' secondes');
            }
            //else if (exec != "ok") {clearInterval(timeinterval);}//sinon si le reset a été call il arete la fonction
            else {//sinon il laisse le temps s'ecouler jusque 0 et l'affiche
                $('#clockdiv').html('La reservation est expiree');
                clearInterval(timeinterval);
            }
        }, 1000);
    }
    
    $('#clickMe').click(initializeClock);// lance la fonction au moment du click sur valider
    $('#clickMe2').click(function oki() { $('#oki').html(sessionStorage.getItem('deadline')); })
    $('#clickMe3').click(function oki() { sessionStorage.removeItem('deadline'); })
    $('#clickMe4').click(function oki() { oki111(); })
    function oki111() {
        var temp = document.getElementById('prenom');
        temp.addEventListener('input', function () { $('#oki4').html(temp.value);})
    }

     
});

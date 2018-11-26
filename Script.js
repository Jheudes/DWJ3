// JavaScript source code
$(function () {//la base !
    
    var map = L.map('mapid').setView([47.218, -1.553], 13);//mise en place de la map dans #mapid

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);//chargement de la map
    
        var req = new XMLHttpRequest();
        req.open("GET", 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=31e816253b8b5ed7a7a05f17d9f53e813aae3439');//ouverture d'une requete
        req.addEventListener("load", function () {//s'il recoit la requette lance la fonction
            var donnee = (JSON.parse(req.responseText));//transformation des données en text puis json
            donnee.map(a => {
                L.marker([a.position.lat, a.position.lng]).addTo(map)
                    .on('click', markerOnClick);//appel a la fonction lors du click sur un marker
                function markerOnClick() {//fonction rangée ici pour profiter de l'appel direct aux "objets" station
                    $('#number').html(a.number);
                    $('#address').html(a.address);
                    $('#bike_stands').html(a.bike_stands);
                    $('#available_bike_stands').html(a.available_bike_stands);
                    $('#available_bikes').html(a.available_bikes);
                    var date = new Date(a.last_update).toLocaleTimeString();
                    $('#last_update').html(date);
                    oklm(a.status);
                    function oklm(a) {
                        if (a == 'OPEN') { $('#status').html('OUVERTE'); }//petite traduction, un open sur un site francais est assez moyen
                        else { $('#status').html('FERMEE'); }
                    }
                }
            });
        });
        req.send(null);

    });


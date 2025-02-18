// Join Now knop functie
function joinNow() {
    window.open("https://servers.fivem.net/servers/detail/7zdmob", "_blank"); // Opent Discord in nieuw tabblad
}

// Simulatie van het ophalen van het aantal spelers (Vervang dit met een echte API-call indien mogelijk)
function updatePlayerCount() {
    // Hier zou je een echte API-call kunnen maken naar je FiveM-server om het actuele spelersaantal op te halen.
    let maxPlayers = 264;
    let currentPlayers = Math.floor(Math.random() * maxPlayers); // Simulatie: willekeurig getal tussen 0 en max

    document.getElementById("player-count").textContent = `${currentPlayers}/${maxPlayers}`;
}

// Roep de functie aan bij het laden van de pagina en ververst elke 30 seconden
document.addEventListener("DOMContentLoaded", updatePlayerCount);
setInterval(updatePlayerCount, 30000); // Vernieuw elke 30 seconden

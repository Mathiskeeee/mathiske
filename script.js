// Join Now knop functie
function joinNow() {
    window.open("https://servers.fivem.net/servers/detail/7zdmob", "_blank"); // Opent Discord in nieuw tabblad
}

// Simulatie van het ophalen van het aantal spelers (Vervang dit met een echte API-call indien mogelijk)
const SERVER_IP = "185.228.82.235"; // Vervang dit met je server IP
const SERVER_PORT = "30120"; // Vervang dit met je serverpoort
const MAX_PLAYERS = 264; // Maximum spelers op de server

async function updatePlayerCount() {
    try {
        const response = await fetch(`http://185.228.82.235:30120/players.json`);
        if (!response.ok) {
            throw new Error("Kan geen verbinding maken met de server.");
        }
        const players = await response.json();
        const currentPlayers = players.length; // Aantal huidige spelers
        
        document.getElementById("player-count").textContent = `${currentPlayers}/${MAX_PLAYERS}`;
    } catch (error) {
        console.error("Fout bij ophalen spelersaantal:", error);
        document.getElementById("player-count").textContent = "Niet beschikbaar";
    }
}

// Roep de functie aan bij het laden van de pagina en ververst elke 30 seconden
document.addEventListener("DOMContentLoaded", updatePlayerCount);
setInterval(updatePlayerCount, 30000); // Vernieuw elke 30 seconden

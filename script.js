// Join Now knop functie
function joinNow() {
    window.open("https://servers.fivem.net/servers/detail/7zdmob", "_blank"); // Opent Discord in nieuw tabblad
}

const SERVER_ID = "7zdmob"; // Je FiveM Server ID
const MAX_PLAYERS = 264; // Max aantal spelers

async function updatePlayerCount() {
    const playerCountElement = document.getElementById("player-count");

    try {
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/7zdmob`);
        if (!response.ok) throw new Error(`Server reageerde met status: ${response.status}`);

        const data = await response.json();
        const currentPlayers = data.Data.players.length;

        // Update de tekst
        playerCountElement.innerHTML = `<b>Spelers: ${currentPlayers}/${MAX_PLAYERS}</b>`;
    } catch (error) {
        console.error("Fout bij ophalen spelersaantal:", error);
        playerCountElement.innerHTML = `<b>Spelers: 0/264</b>`;
    }
}

// Roep de functie aan bij het laden en update elke 30 sec
document.addEventListener("DOMContentLoaded", updatePlayerCount);
setInterval(updatePlayerCount, 30000);

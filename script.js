// Join Now knop functie
function joinNow() {
    window.open("https://servers.fivem.net/servers/detail/7zdmob", "_blank"); // Opent Discord in nieuw tabblad
}

const SERVER_ID = "7zdmob"; // Je FiveM Server ID
const MAX_PLAYERS = 264; // Max aantal spelers

async function updatePlayerCount() {
    const playerCountElement = document.getElementById("player-count");

    try {
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_ID}`);
        if (!response.ok) throw new Error(`Server reageerde met status: ${response.status}`);

        const data = await response.json();
        const currentPlayers = data.Data.players.length;

        // Controleer of het aantal spelers is veranderd voordat je de tekst bijwerkt
        if (playerCountElement.textContent !== `Spelers: ${currentPlayers}/${MAX_PLAYERS}`) {
            playerCountElement.style.opacity = 0; // Fade-out effect
            setTimeout(() => {
                playerCountElement.innerHTML = `<b>Spelers: ${currentPlayers}/${MAX_PLAYERS}</b>`;
                playerCountElement.style.opacity = 1; // Fade-in effect
            }, 300);
        }
    } catch (error) {
        console.error("Fout bij ophalen spelersaantal:", error);
        playerCountElement.innerHTML = `<b>Spelers: Niet Beschikbaar</b>`;
    }
}

// ✅ Start direct na het laden van de pagina en update elke 30 seconden
document.addEventListener("DOMContentLoaded", () => {
    updatePlayerCount(); // Directe eerste update
    setInterval(updatePlayerCount, 30000); // Vernieuw elke 30 seconden
});


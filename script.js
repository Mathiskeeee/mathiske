// Join Now knop functie
function joinNow() {
    window.open("https://servers.fivem.net/servers/detail/7zdmob", "_blank"); // Opent Discord in nieuw tabblad
}

const SERVER_ID = "7zdmob"; // Je FiveM Server ID
const MAX_PLAYERS = 264; // Max aantal spelers
let lastPlayerCount = null; // Bewaart het vorige aantal spelers

async function updatePlayerCount() {
    const playerCountElement = document.getElementById("player-count");

    try {
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_ID}`);
        if (!response.ok) throw new Error(`Server reageerde met status: ${response.status}`);

        const data = await response.json();
        const currentPlayers = data.Data.players.length;
        let differenceText = ""; // Variabele voor +X / -X

        if (lastPlayerCount !== null) {
            let difference = currentPlayers - lastPlayerCount;
            if (difference > 0) {
                differenceText = ` <span class="player-change up">+${difference}</span>`;
            } else if (difference < 0) {
                differenceText = ` <span class="player-change down">${difference}</span>`;
            }
        }

        // Update de tekst alleen als het veranderd is
        if (playerCountElement.innerHTML !== `<b>Spelers: ${currentPlayers}/${MAX_PLAYERS}${differenceText}</b>`) {
            playerCountElement.style.opacity = 0; // Fade-out effect
            setTimeout(() => {
                playerCountElement.innerHTML = `<b>Spelers: ${currentPlayers}/${MAX_PLAYERS}${differenceText}</b>`;
                playerCountElement.style.opacity = 1; // Fade-in effect

                // Laat +X / -X na 5 sec verdwijnen
                if (differenceText !== "") {
                    setTimeout(() => {
                        playerCountElement.innerHTML = `<b>Spelers: ${currentPlayers}/${MAX_PLAYERS}</b>`;
                    }, 5000);
                }
            }, 300);
        }

        lastPlayerCount = currentPlayers; // Bewaar het huidige aantal spelers
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


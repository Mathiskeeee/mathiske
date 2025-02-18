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

const DISCORD_SERVER_ID = "1333935685840797786";

async function fetchDiscordMembers() {
    try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (!response.ok) throw new Error("Kan geen verbinding maken met Discord.");

        const data = await response.json();
        const membersList = document.getElementById("discord-members");

        membersList.innerHTML = ""; // Maak lijst leeg voor update

        data.members.forEach(member => {
            const memberItem = document.createElement("li");
            memberItem.innerHTML = `<img src="${member.avatar_url}" alt="${member.username}" width="25"> ${member.username}`;
            membersList.appendChild(memberItem);
        });
    } catch (error) {
        console.error("Fout bij ophalen Discord leden:", error);
        document.getElementById("discord-members").innerHTML = "Kan ledenlijst niet ophalen.";
    }
}

// ✅ Update elke 30 seconden
document.addEventListener("DOMContentLoaded", () => {
    fetchDiscordMembers();
    setInterval(fetchDiscordMembers, 30000);
});


// ✅ Start direct na het laden van de pagina en update elke 30 seconden
document.addEventListener("DOMContentLoaded", () => {
    updatePlayerCount(); // Directe eerste update
    setInterval(updatePlayerCount, 30000); // Vernieuw elke 30 seconden
});

document.documentElement.style.scrollBehavior = 'smooth';

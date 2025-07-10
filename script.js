// --- FONCTIONS EXISTANTES DANS VOTRE SCRIPT.JS (conservez les autres fonctions de votre fichier) ---

// Fonctions de calcul et de mise à jour modifiées
async function validatePayments() {
    // Vérification initiale pour s'assurer qu'il y a des participants
    if (participants.length === 0) {
        alert("Aucun participant dans la rotation. Veuillez ajouter des participants d'abord.");
        return;
    }

    const jour = currentDay;
    
    // Logique de calcul du pool total basée sur le nombre de participants
    let baseMultiplier;
    // Si le nombre TOTAL de participants inscrits dans la rotation est <= 5
    if (participants.length <= 5) {
        baseMultiplier = 10; // Le pool est basé sur 10 contributions individuelles
    } else {
        baseMultiplier = 11; // Au-delà de 5 participants, le pool est basé sur 11 contributions
    }
    
    // Utilisation de la variable 'dailyInvest' du HTML pour la contribution individuelle
    // Assurez-vous que 'dailyInvest' est bien un nombre (initialisé à 10 dans votre HTML)
    const dailyInvest = parseFloat(document.getElementById("dailyInvest").value) || 10; 
    
    const total = baseMultiplier * dailyInvest; // Calcul du pool total

    const oneThird = total / 3; // 1/3 du pool total
    const tenPercent = oneThird * 0.1; // 10% de ce 1/3
    const retained = oneThird - tenPercent; // Le montant retenu

    const payout = total - retained; // Ce que le bénéficiaire reçoit

    // Détermination du bénéficiaire du jour (le reste du code est inchangé)
    const beneficiaryIndex = (jour - 1) % participants.length;
    const beneficiary = participants[beneficiaryIndex].name;
    const dateTime = new Date().toLocaleString("fr-FR", { hour12: false, timeZone: 'America/Port-au-Prince' }); // Ajoutez le fuseau horaire si pertinent pour Haïti

    // Envoi des données à l'API Google Sheets
    try {
        await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
                action: "addHistory",
                jour,
                beneficiary,
                total: total.toFixed(2), // Formatage à 2 décimales pour l'affichage
                oneThird: oneThird.toFixed(2),
                tenPercent: tenPercent.toFixed(2),
                retained: retained.toFixed(2),
                payout: payout.toFixed(2),
                dateTime
            })
        });
        currentDay++; // Incrémente le jour après une validation réussie
        await loadData(); // Recharge les données pour mettre à jour l'interface
        alert(`Paiement validé pour le Jour ${jour}. Le bénéficiaire ${beneficiary} a reçu $${payout.toFixed(2)}.`);
    } catch (error) {
        console.error("Erreur lors de la validation du paiement:", error);
        alert("Erreur lors de la validation du paiement. Veuillez vérifier la console.");
    }
}


function updateStats() {
    const stats = document.getElementById("stats");
    if (participants.length === 0) {
        stats.innerHTML = "<p>Aucune donnée de participant pour les statistiques.</p>";
        return;
    }
    
    const jour = currentDay;
    
    // Logique de calcul du pool total basée sur le nombre de participants
    let baseMultiplier;
    if (participants.length <= 5) {
        baseMultiplier = 10;
    } else {
        baseMultiplier = 11;
    }

    const dailyInvest = parseFloat(document.getElementById("dailyInvest").value) || 10;
    const total = baseMultiplier * dailyInvest;
    
    const oneThird = total / 3;
    const tenPercent = oneThird * 0.1;
    const retained = oneThird - tenPercent;
    const payout = total - retained;
    
    // Vérifier si le tableau des participants a des éléments avant d'accéder à l'index
    const beneficiary = participants.length > 0 ? participants[(jour - 1) % participants.length].name : "N/A";
    
    stats.innerHTML = `<strong>Jour ${jour} :</strong> ${beneficiary} (prévu)<br>
        Total Collecté (Pool): $${total.toFixed(2)}, <br>
        1/3 Retenu Init.: $${oneThird.toFixed(2)}, <br>
        10% du 1/3 (Frais/Réserve): $${tenPercent.toFixed(2)}, <br>
        Montant Retenu Final: $${retained.toFixed(2)}, <br>
        Gain Net du Bénéficiaire: <strong>$${payout.toFixed(2)}</strong>`;
}

// --- LES AUTRES FONCTIONS DE VOTRE SCRIPT.JS DOIVENT ÊTRE GARDÉES ICI AUSSI ---
// Par exemple: loadData(), renderParticipants(), renderHistory(), addParticipant(), etc.
// N'oubliez pas de garder toutes vos autres fonctions JavaScript dans ce fichier !
// Comme checkAdminStep1, checkAdminStep2, loadData, renderParticipants, renderHistory, 
// addParticipant, nextDay, exportToExcel, resetData, etc.

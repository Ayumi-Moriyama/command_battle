const damageRange = 0.3;

const playerData = {
    name: "わたし",
    hp: 100,
    attack: 5,
    deffence: 2
}

const enemyData = {
    name: "ねむけ",
    hp: 50,
    attack: 4,
    deffence: 1
}

function insertText(id, text) {
    document.getElementById(id).textContent = text;
}

function damageCaluculation(attack, deffence) {
    const maxDamage = attack * (1 + damageRange),
        minDamage = attack * (1 - damageRange),
        attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) * minDamage);

    const damage = attackDamage - deffence;

    if (damage < 1) {
        return 0
    } else {
        return damage;
    }
}
// console.log(damageCaluculation(playerData["attack"],enemyData["deffence"]));

insertText("playerName", playerData["name"]);
insertText("currentPlayerHp", playerData["hp"]);
insertText("maxPlayerHp", playerData["hp"]);

insertText("enemyName", enemyData["name"]);
insertText("currentEnemyHp", enemyData["hp"]);
insertText("maxEnemyHp", enemyData["hp"]);

document.getElementById("attack").addEventListener("click", function () {
    let endGame = false;

    const playerDamage = damageCaluculation(playerData["attack"], enemyData["deffence"]),
        enemyDamage = damageCaluculation(enemyData["attack"], playerData["deffence"])

    enemyData["hp"] -= playerDamage;
    playerData["hp"] -= enemyDamage;

    insertText("currentEnemyHp", enemyData["hp"]);
    insertText("currentPlayerHp", playerData["hp"]);

    if (enemyData["hp"] <= 0) {
        alert("勝利!");
        endGame = true;

        enemyData["hp"] = 0;
        insertText("currentEnemyHp", enemyData["hp"]);

    } else if (playerData["hp"] <= 0) {
        alert("敗北...");
        endGame = true;

        playerData["hp"] = 0;
        insertText("currentEnemyHp", playerData["hp"]);
    }

    if (endGame) {
        this.classList.add("deactive");
    }

});
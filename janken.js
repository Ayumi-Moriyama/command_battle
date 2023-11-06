// プレイヤー情報
const playerStatus_1 = {
    name: "プログラマーのたまご",
    level: 1,
    hp: 30,
    mp: 5,
    jisouryoku: 2,
    p2p: 3,
    ikinuki: 1,
    detox: 3,
};

const playerStatus_2 = {
    name: "ひよっこプログラマー",
    level: 2,
    hp: 40,
    mp: 5,
    jisouryoku: 3,
    p2p: 4,
    tutor: 5,
    ikinuki: 2,
    detox: 4,
};

const playerStatus_3 = {
    name: "半人前プログラマー",
    level: 3,
    hp: 50,
    mp: 10,
    jisouryoku: 4,
    p2p: 5,
    tutor: 6,
    ikinuki: 3,
    detox: 5,
    nomikai: 5,
};

// 敵の情報
const enemyStatus_1 = {
    name: "ねむけ",
    hp: 20,
    attack: 1,
};

const enemyStatus_2 = {
    name: "ゆうわく",
    hp: 30,
    attack: 2,
};

const enemyStatus_3 = {
    name: "謎エラー",
    hp: 50,
    attack: 3,
};

// 画像の入れ替えに必要
$("selecter").attr("name", "value");

// 負けた回数をカウント
let losecount = 0;

// ゲームスタート時の処理
$(level1_start).on("click", function () {
    let endGame = false;
    $("#playerName").text("プログラマーのたまご");
    $("#enemyName").text("ねむけ");
    $("#jikkyou").text("攻撃ボタンのどれかを押したら戦闘開始");
    $("#currentEnemyHp").val(enemyStatus_1["hp"]);
    $("#currentPlayerHp").val(playerStatus_1["hp"]);
    $("#currentPlayerMp").val(playerStatus_1["mp"]);
    $("#enemyImage").attr("src", "./images/nemui.png");
    console.log("わたしのスタート時の体力は" + playerStatus_1["hp"]);
    console.log("ねむけのスタート時の体力は" + enemyStatus_1["hp"]);
});

//バトル1
// 攻撃（自走力）
$(jisouryoku).on("click", function () {
    // ゲーム終了条件を満たさない場合に攻撃可
    let endGame = false;

    console.log("自走力を使った");

    // プレイヤーの攻撃
    const attack_jisou_1 = playerStatus_1["jisouryoku"] * playerStatus_1["level"] * losecount + 0.5;
    console.log("わたしの攻撃力" + attack_jisou_1);
    //  敵の攻撃
    const min = 1;
    const max = 10;
    const enemy_attack_1 = Math.floor(Math.random() * 4) + 1;
    console.log("ねむけの攻撃力" + enemy_attack_1);
    // ダメージ計算
    const enemyDamage = attack_jisou_1 - enemy_attack_1;
    const playerDamage = enemy_attack_1 - attack_jisou_1;
    // 判定
    if (attack_jisou_1 > enemy_attack_1) {
        enemyStatus_1["hp"] -= enemyDamage;
        $("#jikkyou").text("わたしは" + "ねむけに" + enemyDamage + "ダメージを与えた");
        console.log("わたしは" + "ねむけに" + enemyDamage + "ダメージを与えた");
        $("#currentEnemyHp").val(enemyStatus_1["hp"]);
        $("#currentPlayerHp").val(playerStatus_1["hp"]);
        console.log("わたしの今の体力は" + playerStatus_1["hp"]);
        console.log("ねむけの今の体力は" + enemyStatus_1["hp"]);


    } else if (attack_jisou_1 === enemy_attack_1) {
        $("#jikkyou").text("攻撃は当たらなかった");
        console.log("攻撃は当たらなかった");

    } else {
        playerStatus_1["hp"] -= playerDamage;
        $("#jikkyou").text("わたしは" + "ねむけから" + playerDamage + "ダメージを受けた");
        console.log("わたしは" + "ねむけから" + playerDamage + "ダメージを受けた");
        $("#currentEnemyHp").val(enemyStatus_1["hp"]);
        $("#currentPlayerHp").val(playerStatus_1["hp"]);
        console.log("わたしの今の体力は" + playerStatus_1["hp"]);
        console.log("ねむけの今の体力は" + enemyStatus_1["hp"]);

        losecount++;
        $(lose).text(losecount);
        console.log("負けた数は" + losecount);
    }

    // ゲーム終了条件
    if (enemyStatus_1["hp"] < 0) {
        alert("勝利！");
        endGame = true;
        // 敵の体力が０以下になったら、敵の体力を０に再定義
        enemyStatus_1["hp"] = 0;
        $("#currentEnemyHp").val(enemyStatus_1["hp"]);

    } else if (playerStatus_1["hp"] < 0) {
        alert("敗北...");
        endGame = true;
        // プレイヤーの体力が０以下になったら、体力を０に再定義
        playerStatus_1["hp"] = 0;
        $("#currentPlayerHp").val(playerStatus_1["hp"]);

    } else if (losecount > 6) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }

    // ゲーム終了したらボタン押せなくなる・・・ここはまだ効いてない
    if (endGame) {
        this.classList.add("deactive");
    }
    // 自走力攻撃の最後のかっこ
});

// 攻撃（p2p）
$(p2p).on("click", function () {
    console.log("P2Pを使った");
    // プレイヤーの攻撃
    const attack_p2p_1 = playerStatus_1["p2p"] * playerStatus_1["level"] * losecount + 0.5;
    console.log("わたしの攻撃力" + attack_p2p_1);
    //  敵の攻撃
    const min = 1;
    const max = 10;
    const enemy_attack_1 = Math.floor(Math.random() * 4) + 1;
    console.log("ねむけの攻撃力" + enemy_attack_1);
    // ダメージ計算
    const enemyDamage = attack_p2p_1 - enemy_attack_1;
    const playerDamage = enemy_attack_1 - attack_p2p_1;

    // 判定
    if (attack_p2p_1 > enemy_attack_1) {
        enemyStatus_1["hp"] -= enemyDamage;
        $("#jikkyou").text("わたしは" + "ねむけに" + enemyDamage + "ダメージを与えた");
        console.log("わたしは" + "ねむけに" + enemyDamage + "ダメージを与えた");
        $("#currentEnemyHp").val(enemyStatus_1["hp"]);
        $("#currentPlayerHp").val(playerStatus_1["hp"]);
        console.log("わたしの今の体力は" + playerStatus_1["hp"]);
        console.log("ねむけの今の体力は" + enemyStatus_1["hp"]);


    } else if (attack_p2p_1 === enemy_attack_1) {
        $("#jikkyou").text("攻撃は当たらなかった");
        console.log("攻撃は当たらなかった");

    } else {
        playerStatus_1["hp"] -= playerDamage;
        $("#jikkyou").text("わたしは" + "ねむけから" + playerDamage + "ダメージを受けた");
        console.log("わたしは" + "ねむけから" + playerDamage + "ダメージを受けた");
        $("#currentEnemyHp").val(enemyStatus_1["hp"]);
        $("#currentPlayerHp").val(playerStatus_1["hp"]);
        console.log("わたしの今の体力は" + playerStatus_1["hp"]);
        console.log("ねむけの今の体力は" + enemyStatus_1["hp"]);

        losecount++;
        $(lose).text(losecount);
        console.log("負けた数は" + losecount);
    }

    // ゲーム終了条件
    if (enemyStatus_1["hp"] < 0) {
        alert("勝利！");
        endGame = true;
        // 敵の体力が０以下になったら、敵の体力を０に再定義
        enemyStatus_1["hp"] = 0;
        $("#currentEnemyHp").val(enemyStatus_1["hp"]);

    } else if (playerStatus_1["hp"] < 0) {
        alert("敗北...");
        endGame = true;
        // プレイヤーの体力が０以下になったら、体力を０に再定義
        playerStatus_1["hp"] = 0;
        $("#currentPlayerHp").val(playerStatus_1["hp"]);

    } else if (losecount > 6) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }

    // p2p攻撃の最後のかっこ
});

// 回復（デジタルデトックス）
$(detox).on("click", function () {
    const recovery_detox_1 = playerStatus_1["detox"] * playerStatus_1["level"];
    console.log("わたしの回復力" + recovery_detox_1);
    // HPを増やす処理
    playerStatus_1["hp"] += recovery_detox_1;
    $("#jikkyou").text("わたしの体力が" + recovery_detox_1 + "回復した");
    console.log("わたしの体力が" + recovery_detox_1 + "回復した");
    $("#currentPlayerHp").val(playerStatus_1["hp"]);
    console.log("わたしの今の体力は" + playerStatus_1["hp"]);

    // デジタルデトックスの最後のかっこ
});
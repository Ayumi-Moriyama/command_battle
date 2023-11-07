// プレイヤー情報
const playerStatus_1 = {
    name: "プログラマーのたまご",
    level: 1,
    hp: 30,
    mp: 5,
    jisouryoku: 2,
    p2p: 3,
    ikinuki: 1,
};
const playerStatus_2 = {
    name: "ひよっこプログラマー",
    level: 2,
    hp: 40,
    mp: 5,
    jisouryoku: 3,
    p2p: 4,
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

// バトル１スタート時の処理
$(level1_start).on("click", function () {
    let endGame = false;
    $("#playerName").text(playerStatus_1["name"]);
    $("#enemyName").text(enemyStatus_1["name"]);
    $("#jikkyou").text("攻撃ボタンのどれかを押したら戦闘開始");
    $("#currentEnemyHp").val(enemyStatus_1["hp"]);
    $("#currentPlayerHp").val(playerStatus_1["hp"]);
    $("#currentPlayerMp").val(playerStatus_1["mp"]);
    $("#enemyImage").attr("src", "./images/nemui.png");
    console.log("わたしのスタート時の体力は" + playerStatus_1["hp"]);
    console.log("わたしのスタート時のやる気は" + playerStatus_1["mp"]);
    console.log("ねむけのスタート時の体力は" + enemyStatus_1["hp"]);
});

// 攻撃（自走力Lv1）
$(jisouryoku_1).on("click", function () {
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

    } else if (losecount > 3) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }

    // ゲーム終了したらボタン押せなくなる・・・ここはまだ効いてない
    if (endGame) {
        this.classList.add("deactive");
    }
    // 自走力Lv1攻撃の最後のかっこ
});

// 回復（息抜きLv1） 
$(ikinuki_1).on("click", function () {
    console.log("息抜きを使った");
    const recovery_ikinuki_1 = playerStatus_1["ikinuki"] * playerStatus_1["level"];
    // MPを減らす処理
    playerStatus_1["mp"] -= 1;
    $("#currentPlayerMp").val(playerStatus_1["mp"]);
    console.log("MPが" + playerStatus_1["mp"] + "になった");
    // HPを増やす処理
    playerStatus_1["hp"] += recovery_ikinuki_1;
    $("#jikkyou").text("わたしの体力が" + recovery_ikinuki_1 + "回復した");
    $("#currentPlayerHp").val(playerStatus_1["hp"]);
    console.log("わたしの今の体力は" + playerStatus_1["hp"]);
    // 息抜きLv1の最後のかっこ
});


// バトル2スタート時の処理
$(level2_start).on("click", function () {
    let endGame = false;
    $("#playerName").text(playerStatus_2["name"]);
    $("#enemyName").text(enemyStatus_2["name"]);
    $("#jikkyou").text("攻撃ボタンのどれかを押したら戦闘開始");
    $("#currentEnemyHp").val(enemyStatus_2["hp"]);
    $("#currentPlayerHp").val(playerStatus_2["hp"]);
    $("#currentPlayerMp").val(playerStatus_2["mp"]);
    $("#enemyImage").attr("src", "./images/nemui.png");
    console.log("わたしのスタート時の体力は" + playerStatus_2["hp"]);
    console.log("ゆうわくのスタート時の体力は" + enemyStatus_2["hp"]);
});

// 攻撃（自走力Lv2）
$(jisouryoku_2).on("click", function () {
    // ゲーム終了条件を満たさない場合に攻撃可
    let endGame = false;

    console.log("自走力を使った");
    // プレイヤーの攻撃
    const attack_jisou_2 = playerStatus_2["jisouryoku"] * playerStatus_2["level"] * losecount + 0.5;
    console.log("わたしの攻撃力" + attack_jisou_2);

    //  敵の攻撃
    const min = 1;
    const max = 10;
    const enemy_attack_2 = Math.floor(Math.random() * 4) + 1;
    console.log("ゆうわくの攻撃力" + enemy_attack_2);

    // ダメージ計算
    const enemyDamage = attack_jisou_2 - enemy_attack_2;
    const playerDamage = enemy_attack_2 - attack_jisou_2;

    // 判定
    if (attack_jisou_2 > enemy_attack_2) {
        enemyStatus_2["hp"] -= enemyDamage;
        $("#jikkyou").text("わたしは" + "ゆうわくに" + enemyDamage + "ダメージを与えた");
        $("#currentEnemyHp").val(enemyStatus_2["hp"]);
        $("#currentPlayerHp").val(playerStatus_2["hp"]);
        console.log("わたしの今の体力は" + playerStatus_2["hp"]);
        console.log("ゆうわくの今の体力は" + enemyStatus_2["hp"]);

    } else if (attack_jisou_2 === enemy_attack_2) {
        $("#jikkyou").text("攻撃は当たらなかった");
        console.log("攻撃は当たらなかった");

    } else {
        playerStatus_2["hp"] -= playerDamage;
        $("#jikkyou").text("わたしは" + "ゆうわくから" + playerDamage + "ダメージを受けた");
        $("#currentEnemyHp").val(enemyStatus_2["hp"]);
        $("#currentPlayerHp").val(playerStatus_2["hp"]);
        console.log("わたしの今の体力は" + playerStatus_2["hp"]);
        console.log("ゆうわくの今の体力は" + enemyStatus_2["hp"]);

        losecount++;
        $(lose).text(losecount);
        console.log("負けた数は" + losecount);
    }

    // ゲーム終了条件
    if (enemyStatus_2["hp"] < 0) {
        alert("勝利！");
        endGame = true;
        // 敵の体力が０以下になったら、敵の体力を０に再定義
        enemyStatus_2["hp"] = 0;
        $("#currentEnemyHp").val(enemyStatus_2["hp"]);

    } else if (playerStatus_2["hp"] < 0) {
        alert("敗北...");
        endGame = true;
        // プレイヤーの体力が０以下になったら、体力を０に再定義
        playerStatus_2["hp"] = 0;
        $("#currentPlayerHp").val(playerStatus_2["hp"]);

    } else if (losecount > 4) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }

    // ゲーム終了したらボタン押せなくなる・・・ここはまだ効いてない
    if (endGame) {
        this.classList.add("deactive");
    }
    // 自走力Lv2攻撃の最後のかっこ
});


// 攻撃（p2p）
$(p2p_2).on("click", function () {
    console.log("P2Pを使った");
    // プレイヤーの攻撃
    const attack_p2p_2 = playerStatus_2["p2p"] * playerStatus_2["level"] * losecount + 0.5;
    console.log("わたしの攻撃力" + attack_p2p_2);
    //  敵の攻撃
    const min = 1;
    const max = 10;
    const enemy_attack_2 = Math.floor(Math.random() * 4) + 1;
    console.log("ゆうわくの攻撃力" + enemy_attack_2);
    // ダメージ計算
    const enemyDamage = attack_p2p_2 - enemy_attack_2;
    const playerDamage = enemy_attack_2 - attack_p2p_2;

    // 判定
    if (attack_p2p_2 > enemy_attack_2) {
        enemyStatus_2["hp"] -= enemyDamage;
        $("#jikkyou").text("わたしは" + "ゆうわくに" + enemyDamage + "ダメージを与えた");
        $("#currentEnemyHp").val(enemyStatus_2["hp"]);
        $("#currentPlayerHp").val(playerStatus_2["hp"]);
        console.log("わたしの今の体力は" + playerStatus_2["hp"]);
        console.log("ゆうわくの今の体力は" + enemyStatus_2["hp"]);

    } else if (attack_p2p_2 === enemy_attack_2) {
        $("#jikkyou").text("攻撃は当たらなかった");
        console.log("攻撃は当たらなかった");

    } else {
        playerStatus_2["hp"] -= playerDamage;
        $("#jikkyou").text("わたしは" + "ゆうわくから" + playerDamage + "ダメージを受けた");
        $("#currentEnemyHp").val(enemyStatus_2["hp"]);
        $("#currentPlayerHp").val(playerStatus_2["hp"]);
        console.log("わたしの今の体力は" + playerStatus_2["hp"]);
        console.log("ゆうわくの今の体力は" + enemyStatus_2["hp"]);

        losecount++;
        $(lose).text(losecount);
        console.log("負けた数は" + losecount);
    }

    // ゲーム終了条件
    if (enemyStatus_2["hp"] < 0) {
        alert("勝利！");
        endGame = true;
        // 敵の体力が０以下になったら、敵の体力を０に再定義
        enemyStatus_2["hp"] = 0;
        $("#currentEnemyHp").val(enemyStatus_2["hp"]);

    } else if (playerStatus_2["hp"] < 0) {
        alert("敗北...");
        endGame = true;
        // プレイヤーの体力が０以下になったら、体力を０に再定義
        playerStatus_2["hp"] = 0;
        $("#currentPlayerHp").val(playerStatus_2["hp"]);

    } else if (losecount > 4) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }
    // p2p攻撃の最後のかっこ
});

// 回復（息抜きLv2）
$(ikinuki_2).on("click", function () {
    console.log("息抜きを使った");
    const recovery_ikinuki_2 = playerStatus_2["ikinuki"] * playerStatus_2["level"];
    // HPを増やす処理
    playerStatus_2["hp"] += recovery_ikinuki_2;
    $("#jikkyou").text("わたしの体力が" + recovery_ikinuki_2 + "回復した");
    $("#currentPlayerHp").val(playerStatus_2["hp"]);
    console.log("わたしの今の体力は" + playerStatus_2["hp"]);
    // 息抜きLv2の最後のかっこ
});

// 回復（デジタルデトックスLv2）
$(detox_2).on("click", function () {
    console.log("デジタルデトックスを使った");
    const recovery_detox_2 = playerStatus_2["detox"] * playerStatus_2["level"];
    // HPを増やす処理
    playerStatus_2["hp"] += recovery_detox_2;
    $("#jikkyou").text("わたしの体力が" + recovery_detox_2 + "回復した");
    $("#currentPlayerHp").val(playerStatus_2["hp"]);
    console.log("わたしの今の体力は" + playerStatus_2["hp"]);
    // デジタルデトックスの最後のかっこ
});


// バトル3スタート時の処理
$(level3_start).on("click", function () {
    let endGame = false;
    $("#playerName").text(playerStatus_3["name"]);
    $("#enemyName").text(enemyStatus_3["name"]);
    $("#jikkyou").text("攻撃ボタンのどれかを押したら戦闘開始");
    $("#currentEnemyHp").val(enemyStatus_3["hp"]);
    $("#currentPlayerHp").val(playerStatus_3["hp"]);
    $("#currentPlayerMp").val(playerStatus_3["mp"]);
    $("#enemyImage").attr("src", "./images/nemui.png");
    console.log("わたしのスタート時の体力は" + playerStatus_3["hp"]);
    console.log("謎エラーのスタート時の体力は" + enemyStatus_3["hp"]);
});

// 攻撃（自走力Lx3）
$(jisouryoku_3).on("click", function () {
    // ゲーム終了条件を満たさない場合に攻撃可
    let endGame = false;

    console.log("自走力を使った");
    // プレイヤーの攻撃
    const attack_jisou_3 = playerStatus_3["jisouryoku"] * playerStatus_3["level"] * losecount + 0.5;
    console.log("わたしの攻撃力" + attack_jisou_3);

    //  敵の攻撃
    const min = 1;
    const max = 10;
    const enemy_attack_3 = Math.floor(Math.random() * 4) + 1;
    console.log("謎エラーの攻撃力" + enemy_attack_3);

    // ダメージ計算
    const enemyDamage = attack_jisou_3 - enemy_attack_3;
    const playerDamage = enemy_attack_3 - attack_jisou_3;

    // 判定
    if (attack_jisou_3 > enemy_attack_3) {
        enemyStatus_3["hp"] -= enemyDamage;
        $("#jikkyou").text("わたしは" + "謎エラーに" + enemyDamage + "ダメージを与えた");
        $("#currentEnemyHp").val(enemyStatus_3["hp"]);
        $("#currentPlayerHp").val(playerStatus_3["hp"]);
        console.log("わたしの今の体力は" + playerStatus_3["hp"]);
        console.log("謎エラーの今の体力は" + enemyStatus_3["hp"]);

    } else if (attack_jisou_3 === enemy_attack_3) {
        $("#jikkyou").text("攻撃は当たらなかった");
        console.log("攻撃は当たらなかった");

    } else {
        playerStatus_3["hp"] -= playerDamage;
        $("#jikkyou").text("わたしは" + "謎エラーから" + playerDamage + "ダメージを受けた");
        $("#currentEnemyHp").val(enemyStatus_3["hp"]);
        $("#currentPlayerHp").val(playerStatus_3["hp"]);
        console.log("わたしの今の体力は" + playerStatus_3["hp"]);
        console.log("謎エラーの今の体力は" + enemyStatus_3["hp"]);

        losecount++;
        $(lose).text(losecount);
        console.log("負けた数は" + losecount);
    }

    // ゲーム終了条件
    if (enemyStatus_3["hp"] < 0) {
        alert("勝利！");
        endGame = true;
        // 敵の体力が０以下になったら、敵の体力を０に再定義
        enemyStatus_3["hp"] = 0;
        $("#currentEnemyHp").val(enemyStatus_3["hp"]);

    } else if (playerStatus_3["hp"] < 0) {
        alert("敗北...");
        endGame = true;
        // プレイヤーの体力が０以下になったら、体力を０に再定義
        playerStatus_3["hp"] = 0;
        $("#currentPlayerHp").val(playerStatus_3["hp"]);

    } else if (losecount > 6) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }

    // ゲーム終了したらボタン押せなくなる・・・ここはまだ効いてない
    if (endGame) {
        this.classList.add("deactive");
    }
    // 自走力Lv3攻撃の最後のかっこ
});


// 攻撃（p2p）Lv3
$(p2p_3).on("click", function () {
    console.log("P2Pを使った");
    // プレイヤーの攻撃
    const attack_p2p_3 = playerStatus_3["p2p"] * playerStatus_3["level"] * losecount + 0.5;
    console.log("わたしの攻撃力" + attack_p2p_3);
    //  敵の攻撃
    const min = 1;
    const max = 10;
    const enemy_attack_3 = Math.floor(Math.random() * 4) + 1;
    console.log("謎エラーの攻撃力" + enemy_attack_3);
    // ダメージ計算
    const enemyDamage = attack_p2p_3 - enemy_attack_3;
    const playerDamage = enemy_attack_3 - attack_p2p_3;

    // 判定
    if (attack_p2p_3 > enemy_attack_3) {
        enemyStatus_3["hp"] -= enemyDamage;
        $("#jikkyou").text("わたしは" + "謎エラーに" + enemyDamage + "ダメージを与えた");
        $("#currentEnemyHp").val(enemyStatus_3["hp"]);
        $("#currentPlayerHp").val(playerStatus_3["hp"]);
        console.log("わたしの今の体力は" + playerStatus_3["hp"]);
        console.log("謎エラーの今の体力は" + enemyStatus_3["hp"]);

    } else if (attack_p2p_3 === enemy_attack_3) {
        $("#jikkyou").text("攻撃は当たらなかった");
        console.log("攻撃は当たらなかった");

    } else {
        playerStatus_3["hp"] -= playerDamage;
        $("#jikkyou").text("わたしは" + "謎エラーから" + playerDamage + "ダメージを受けた");
        $("#currentEnemyHp").val(enemyStatus_3["hp"]);
        $("#currentPlayerHp").val(playerStatus_3["hp"]);
        console.log("わたしの今の体力は" + playerStatus_3["hp"]);
        console.log("謎エラーの今の体力は" + enemyStatus_3["hp"]);

        losecount++;
        $(lose).text(losecount);
        console.log("負けた数は" + losecount);
    }

    // ゲーム終了条件
    if (enemyStatus_3["hp"] < 0) {
        alert("勝利！");
        endGame = true;
        // 敵の体力が０以下になったら、敵の体力を０に再定義
        enemyStatus_3["hp"] = 0;
        $("#currentEnemyHp").val(enemyStatus_3["hp"]);

    } else if (playerStatus_3["hp"] < 0) {
        alert("敗北...");
        endGame = true;
        // プレイヤーの体力が０以下になったら、体力を０に再定義
        playerStatus_3["hp"] = 0;
        $("#currentPlayerHp").val(playerStatus_3["hp"]);

    } else if (losecount > 6) {
        $(lose).text(losecount);
        endGame = true;
        console.log("大先生の教えにより敵に打ち勝った！");

    }
    // p2p攻撃Lv3の最後のかっこ
});

// 回復（息抜きLv3）
$(ikinuki_3).on("click", function () {
    console.log("息抜きを使った");
    const recovery_ikinuki_3 = playerStatus_3["ikinuki"] * playerStatus_3["level"];
    // HPを増やす処理
    playerStatus_3["hp"] += recovery_ikinuki_3;
    $("#jikkyou").text("わたしの体力が" + recovery_ikinuki_3 + "回復した");
    $("#currentPlayerHp").val(playerStatus_3["hp"]);
    console.log("わたしの今の体力は" + playerStatus_3["hp"]);
    // 息抜きLv2の最後のかっこ
});

// 回復（デジタルデトックスLv3）
$(detox_3).on("click", function () {
    console.log("デジタルデトックスを使った");
    const recovery_detox_3 = playerStatus_3["detox"] * playerStatus_3["level"];
    // HPを増やす処理
    playerStatus_3["hp"] += recovery_detox_3;
    $("#jikkyou").text("わたしの体力が" + recovery_detox_3 + "回復した");
    $("#currentPlayerHp").val(playerStatus_3["hp"]);
    console.log("わたしの今の体力は" + playerStatus_3["hp"]);
    // デジタルデトックスの最後のかっこ
});
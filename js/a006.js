//おまじない
enchant();

//変数宣言
var game;



// todo webviewでアプリ化しないと、横向き固定などはできない


//Webページが読み込まれたら
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Game(320, 320);

	var alert = new Scene();
	alert.backgroundColor = 'black';

	var message = new Label('横向きにしてね');
	message.color = 'white';
	message.font = '18px "Arial"';
	message.textAlign = 'center';
	message.x = (game.width - message._boundWidth) / 2;

	alert.addChild(message);

	if (window.innerHeight > window.innerWidth) {
		game.replaceScene(alert);
	}

	var label = new Label('横向きヨシ！');
	game.rootScene.addChild(label);

	//ゲームスタート
	game.start();
});

addEventListener("orientationchange", function () {
	// 向き切り替え時の処理
	// todo 警告とゲーム進行の一時停止、とか？
	var label = new Label('おや？');
	game.rootScene.addChild(label);

});
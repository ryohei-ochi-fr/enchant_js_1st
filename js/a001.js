//おまじない
enchant();
 
//変数宣言
var game;
 
//Webページが読み込まれたら
addEventListener( 'load', function() {
	//ゲームオブジェクトの作成
	var game = new Game(320, 320); 

	var label = new Label('Hello, enchant.js!');
	game.rootScene.addChild(label);

	//ゲームスタート
    game.start();
} );
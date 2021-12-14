// 参考
// 初めてのenchant.js 011イベント;(ENTER_FRAME)[JavaScript] - yama-log
// https://info.yama-lab.com/%e5%88%9d%e3%82%81%e3%81%a6%e3%81%aeenchant-js-011%e3%82%a4%e3%83%99%e3%83%b3%e3%83%88enter_framejavascript/

//おまじない
enchant();

//変数宣言
var game;

//Webページが読み込まれたら
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Game(640, 360);

	game.preload(
		'wav/se0012.wav'
	);

	// ゲームの準備が整ったらメインの処理を実行します
	game.onload = function () {
		game.scale = 1;
		game.fps = 30;
		// fps = 30 * 5sec
		var countFrame = 30 * 5;

		var createSceneS010 = function () {
			var scene = new Scene();
			scene.backgroundColor = '#ececec';

			var title = new Label('チームロゴ');
			title.textAlign = 'center';
			title.color = '#000000';
			title.x = 0;
			title.y = 96;
			title.font = '28px sans-serif';
			scene.addChild(title);

			var memo = new Label('5秒後に次画面へ遷移');
			scene.addChild(memo);

			// タッチイベントを設定
			title.addEventListener(Event.TOUCH_START, function (e) {
				// 現在表示しているシーンを次のシーンに置き換える
				game.replaceScene(createSceneS020());
			});

			game.addEventListener(Event.ENTER_FRAME,function () {
				if(countFrame == 90){
					// ユーザが操作していないところでの音出しはできない
					game.assets['wav/se0012.wav'].play();
				}
				if(countFrame == 0){
					game.replaceScene(createSceneS020());
				}else{
					countFrame--;
				}
			});

			// シーンを返す
			return scene;
		}

		var createSceneS020 = function () {
			var scene = new Scene();
			scene.backgroundColor = '#fcc800';

			var title = new Label('注意書き');
			title.textAlign = 'center';
			title.color = '#ffffff';
			title.x = 0;
			title.y = 96;
			title.font = '28px sans-serif';

			scene.addChild(title);

			// シーンを返す
			return scene;
		}

		// 現在表示しているシーンを次のシーンに置き換える
		game.replaceScene(createSceneS010());
	}

	// var label = new Label('Hello, enchant.js!');
	// game.rootScene.addChild(label);

	//ゲームスタート
	game.start();
});


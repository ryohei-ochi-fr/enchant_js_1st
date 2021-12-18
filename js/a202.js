//おまじない
enchant();

//変数宣言
var game;
const SCREEN_WIDTH = 640;
const SCREEN_HEIGHT = 360;
const CORE_FPS = 60;

// 外部jsにする
/*
 enchantの中でHTML要素として画面に表示される要素に対して、
 elementプロパティでelementを取り出せるようにする。
*/
enchant.Entity.prototype.element = function () {
	return this._element;
}
enchant.Scene.prototype.element = function () {
	return this._element;
};
enchant.Surface.prototype.element = function () {
	return this._element;
};

//Webページが読み込まれたら
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Core(SCREEN_WIDTH, SCREEN_HEIGHT);

	game.fps = CORE_FPS;
	var countFrame = 0;


	game.preload(
		'mp3/se0028.mp3',
		'img/s010_ashita_logo.png'
	);

	// ゲームの準備が整ったらメインの処理を実行します
	game.onload = function () {

		// todo リソース(ファイル)構成としては、シーン毎にjsに書き出すで良い？
		var createSceneS010 = function () {
			var scene = new Scene();
			scene.backgroundColor = '#ffffff';

			var logo = new Sprite(200, 200);
			logo.image = game.assets['img/s010_ashita_logo.png'];
			logo.x = SCREEN_WIDTH / 2 - logo.width / 2;
			logo.y = SCREEN_HEIGHT / 2 - logo.height / 2 - 50;
			scene.addChild(logo);

			var title = new Label('was want to be flying in the blue sky');
			title.textAlign = 'center';
			title.color = '#606060';
			title.width = game.width;
			title.x = 0;
			title.y = 255;
			title.font = "24px 'Vujahday Script',cursive";
			scene.addChild(title);

			// サウンドロゴ
			game.assets['mp3/se0028.mp3'].play();

			// シーンを返す
			return scene;
		}

		// 現在表示しているシーンを次のシーンに置き換える
		var currentScene = createSceneS010();
		game.replaceScene(currentScene);

		currentScene.addEventListener(Event.ENTER_FRAME, function () {
			if (countFrame == CORE_FPS * 4.5) {
				// jQueryでフェードアウト
				$(currentScene.element()).fadeOut(500);
			}
			if (countFrame == CORE_FPS * 6) {
				// game.replaceScene(createSceneS020());
				// console.log("next");
			} else {
				countFrame++;
			}
		});

		// jQueryでフェードイン
		$(currentScene.element()).fadeIn(500);

	}

	//ゲームスタート
	game.start();

});
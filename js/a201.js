//おまじない
enchant();

// ローディング画面を上書き
enchant.LoadingScene = enchant.Class.create(enchant.Scene, {
	initialize: function () {
		enchant.Scene.call(this);
		this.backgroundColor = 'white';

		// ローディングゲージ
		var sprite = new Sprite(440, 200);
		// Surfaceオブジェクトを生成しスプライトに連結
		var surface = new Surface(440, 200);
		sprite.image = surface;

		// 四角形を描く
		surface.context.fillStyle = "#82B1FF";
		surface.context.fillRect(0, 0, 440, 200);
		sprite.x = 100;
		sprite.y = 80;

		// ゲージ 縮小の原点
		sprite.originX = 0;
		sprite.originY = 0;
		// ゲージ X方向の縮小
		sprite.scaleX = 1;

		this.addChild(sprite);

		// こんなこと、いちいちやってられん	
		// var font = '18px "Noto Sans JP",sans-serif';
		// var width = 640;
		// var label = new Label('produced by');
		// label.font = font;
		// label.textAlign = "center";
		// label.width = width;
		// label.x = 0;
		// label.y = 0;
		// this.addChild(label);

		var stringAssets = [
			// [0:string, 1:color, 2:aligin, 3:x, 4:y, 5:fontsize]
			['produced by', '#606060', 'center', 0, 45, '18px'],
			['Ashita', '#FFD600', 'left', 120, 100, '36px'],
			['Karaage', '#FFFFFF', 'center', 0, 150, '64px'],
			['wo', '#FFFFFF', 'left', 490, 190, '24px'],
			['Tabetai', '#FFD600', 'left', 160, 230, '36px'],
			['NOW LOADING...', '#606060', 'left', 400, 310, '18px'],
			// パーセンテージは、textプロパティーを書き換えるので、一番最後に定義
			['', '#606060', 'left', 560, 310, '18px'],
		]
		var font = ' ' + '"Noto Sans JP",sans-serif';
		var width = 640;

		var label;

		stringAssets.forEach(asset => {
			label = new Label(asset[0]);
			label.color = asset[1];
			label.textAlign = asset[2];
			label.width = width;
			label.x = asset[3];
			label.y = asset[4];
			label.font = asset[5] + font;
			this.addChild(label);
		});

		var progress = 0;
		var progressBefore = 0;
		var offset = -0.2
		this.addEventListener('progress', function (e) {
			progressBefore = progress;
			progress = e.loaded / e.total;
		});

		this.addEventListener('enterframe', function () {

			var min = 1;
			var max = 10 - progressBefore * 10;
			label.text = Math.floor(progressBefore * 100) + '%';
			// console.log(progressBefore, progress);
			// ゲージが100%になる直前のアニメーション
			// ↓ アホらしいバグ
			// if (progress = 1) {
			if (progress == 1) {
				if (progress < progressBefore) {
					progress = 0;
				}else{
					var effect = (Math.random() * max) / 100;
					// console.log(effect);
					sprite.scaleX = progressBefore + effect;
				}

				progressBefore += 0.001;
			} else {
				// ゲージをX方向に拡大していくアニメーション
				if (progress > progressBefore) {
					if(progressBefore < offset){
						sprite.scaleX = progressBefore + offset;
					}else{
						sprite.scaleX = progressBefore;
					}
					progressBefore += 0.01;
				}
			}

			// 100%になるところが描画されない
			// 原因は、100%になるとloadイベントが発火して、ゲームに遷移するから(あたりまえ)

		});

		this.addEventListener('load', function (e) {
			// nミリ秒後に画面遷移
			setTimeout(function () {
				var core = enchant.Core.instance;
				core.removeScene(core.loadingScene);
				core.dispatchEvent(e);
			}, 3000);

		});
	}
});


//変数宣言
var game;

//Webページが読み込まれたら
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Game(640, 360);
	game.fps = 60;

	game.preload(
		'mp3/taiko04.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/001_Hatsune_Miku_Tell_Your_World_short.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/001_syaning_star.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/002_still.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/003_where_you_are.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/004_harujion.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/005_vegalost.mp3',
		'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/006_sekai_ga_bokurani_yurerumade.mp3',
		// 'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/002_Hatsune_Miku_Tell_Your_World_short.mp3',
		// 'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/003_Hatsune_Miku_Tell_Your_World_short.mp3',
		// 'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/004_Hatsune_Miku_Tell_Your_World_short.mp3',
		// 'https://natalie.davidovich-pompo.net/userdir/ochi/sandbox/loading/005_Hatsune_Miku_Tell_Your_World_short.mp3',
		'img/s100_sample.png'
	);

	game.onload = function () {
		// 背景を生成
		var bg = new Sprite(640, 360);
		bg.image = game.assets['img/s100_sample.png'];
		game.rootScene.addChild(bg);

		// 判定ゾーンを生成
		var sprite = new Sprite(450, 50);
		// Surfaceオブジェクトを生成しスプライトに連結
		var surface = new Surface(450, 50);
		sprite.image = surface;
		game.rootScene.addChild(sprite);

		// 赤い四角形を描く
		surface.context.fillStyle = "#E7B3FA";
		surface.context.fillRect(0, 0, 450 - 1, 50);
		sprite.x = 95 + 1
		sprite.y = 285

		// タッチイベントを設定
		sprite.addEventListener(Event.TOUCH_START, function (e) {
			// 和太鼓どん
			game.assets['mp3/taiko04.mp3'].play();

		});

	}

	//ゲームスタート
	game.start();

});
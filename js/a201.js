//おまじない
enchant();

//変数宣言
var game;

//Webページが読み込まれたら
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Game(640, 360);
	game.fps = 60;

	game.LoadingScene = enchant.Class.create(enchant.Scene, {
		initialize: function() {
			enchant.Scene.call(this);
			this.backgroundColor = 'red';
			// ...
			this.addEventListener('progress', function(e) {
				progress = e.loaded / e.total;
			});
			this.addEventListener('enterframe', function() {
				// animation
			});
		}
	});

	game.preload(
		'mp3/taiko04.mp3',
		'mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3',
		'img/s100_sample.png'
	);

	game.onload = function () {
		// 背景を生成
		var bg = new Sprite(640, 360);
		bg.image = game.assets['img/s100_sample.png'];
		game.rootScene.addChild(bg);

		// // イベントのログ表示
		// var status = new Label("");
		// status._log = [];
		// status.add = function (str) {
		// 	this._log.unshift(str);
		// 	this._log = this._log.slice(0, 20);
		// 	this.text = this._log.join('<br />');
		// };

		// var round = function (num) {
		// 	return Math.round(num * 1e3) / 1e3;
		// };

		// game.rootScene.on('touchstart', function (evt) {
		// 	status.add('touchstart (' + round(evt.x) + ', ' + round(evt.y) + ')');
		// });
		// game.rootScene.on('touchmove', function (evt) {
		// 	status.add('touchmove (' + round(evt.x) + ', ' + round(evt.y) + ')');
		// });
		// game.rootScene.on('touchend', function (evt) {
		// 	status.add('touchend (' + round(evt.x) + ', ' + round(evt.y) + ')');
		// });

		// game.rootScene.addChild(status);

		// 譜面を描画
		// スプライトを生成 300px x 63sec
		var sprite1 = new Sprite(450, 18900 * 3);
		// Surfaceオブジェクトを生成しスプライトに連結
		var surface1 = new Surface(450, 18900 * 3);
		sprite1.image = surface1;
		game.rootScene.addChild(sprite1);

		// ノーツを描く
		surface1.context.fillStyle = "#B1CFFC";
		// サーフェース左上
		// surface.context.fillRect(0, 0, 149, 50);
		// sprite.x = 95 + 1
		
		// surface1.context.fillRect(0, 18900 - 50, 149, 50);
		// 譜面の初期位置
		sprite1.x = 95 + 1
		sprite1.y = 0 - 18900 * 3

		var lane = 0
		midiData.forEach(note => {
			// midiの1音のデータ(ノーツ)を書き出してみる
			// console.log(note.midi, note.time, note.duration, note.name);
			// console.log(note[0] + ",", note[1]);
			switch (note[0]) {
				case 48:
					lane = 0;
					break;
				case 50:
					lane = 150;
					break;
				case 52:
					lane = 300;
					break;
			}
			timming = note[1] * 300 
			console.log(timming + ",", lane);

			surface1.context.fillStyle = "#B1CFFC";
			surface1.context.fillRect(lane, 18900 * 3 - timming - 50, 149, 50);

			// game.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].play();

		})

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

		// var label = new Label('MidiPaeser');
		// game.rootScene.addChild(label);
		// game.rootScene.backgroundColor = '#ececec';

		// タッチイベントを設定
		sprite.addEventListener(Event.TOUCH_START, function (e) {
			// 和太鼓どん
			game.assets['mp3/taiko04.mp3'].play();
			
		});



		var callFps = 0;
		var callFlag = true;

		sprite1.on('enterframe', function (evt) {
			if(callFlag){
				if(callFps > 60){
					callFlag = false;
					game.assets['mp3/001_Hatsune_Miku_Tell_Your_World_short.mp3'].play();
				}
			}
			// this.y += 10 / 4;
			this.y += 10 / 2;
			// this.y += 10;
			// this.y += 10 * 2;

			if (this.y > 18900) {
				this.y = 0;
			}

			callFps++
		});

	}

	//ゲームスタート
	game.start();

});
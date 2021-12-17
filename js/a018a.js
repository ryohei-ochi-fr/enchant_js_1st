//おまじない
enchant();

//変数宣言
var game;

var midiData = [
	[52, 0],
	[48, 3.2],
	[50, 6.4],
	[52, 9.6],
	[48, 12.8],
	[50, 16],
	[52, 19.2],
	[48, 22.4],
	[52, 22.4],
	[48, 22.8],
	[48, 23.2],
	[48, 23.6],
	[48, 24],
	[48, 24.4],
	[48, 24.8],
	[48, 25.2],
	[50, 25.6],
	[50, 26],
	[50, 26.4],
	[50, 26.8],
	[50, 27.2],
	[50, 27.6],
	[50, 28],
	[50, 28.4],
	[48, 28.8],
	[48, 29.2],
	[48, 29.6],
	[48, 30],
	[48, 30.4],
	[48, 30.8],
	[48, 31.2],
	[48, 31.6],
	[50, 32],
	[50, 32.4],
	[50, 32.8],
	[50, 33.2],
	[52, 33.6],
	[52, 34],
	[52, 34.4],
	[52, 34.8],
	[48, 35.2],
	[52, 35.2],
	[48, 35.6],
	[48, 36],
	[48, 36.4],
	[48, 36.8],
	[48, 37.2],
	[48, 37.6],
	[48, 38],
	[52, 38.4],
	[52, 38.8],
	[52, 39.2],
	[52, 39.6],
	[52, 40],
	[52, 40.4],
	[52, 40.8],
	[52, 41.2],
	[48, 41.6],
	[48, 42],
	[48, 42.4],
	[48, 42.8],
	[50, 43.2],
	[50, 43.6],
	[50, 44],
	[50, 44.4],
	[52, 44.8],
	[52, 45.2],
	[52, 45.6],
	[52, 46],
	[50, 46.4],
	[50, 46.8],
	[50, 47.2],
	[50, 47.6],
	[50, 48],
	[48, 49.6],
	[48, 50.4],
	[48, 51.2],
	[50, 52.2],
	[52, 52.8],
	[52, 53.6],
	[52, 54.4],
	[50, 55.4],
	[48, 56],
	[48, 56.8],
	[48, 57.6],
	[50, 58.6],
	[48, 59.2],
	[48, 60],
	[50, 60.8],
	[50, 61],
	[50, 61.2],
	[50, 61.4],
	[50, 61.6],
	[48, 62.4],
	[48, 63.2],
	[48, 64],
	[50, 65],
	[52, 65.6],
	[52, 66.4],
	[52, 67.2],
	[50, 68.2],
	[48, 68.8],
	[48, 69.6],
	[48, 70.4],
	[50, 71.4],
	[48, 72],
	[48, 72.8],
	[50, 73.6],
	[50, 73.8],
	[50, 74],
	[50, 74.2],
	[50, 74.4],
	[48, 75.2],
	[48, 76],
	[48, 76.8],
	[50, 77.8],
	[52, 78.4],
	[52, 79.2],
	[52, 80],
	[50, 81],
	[48, 81.6],
	[48, 82.4],
	[50, 83.2],
	[50, 84],
	[48, 84.8],
	[48, 85.6],
	[48, 86.4],
	[48, 87.2],
	[48, 87.6],
	[48, 88],
	[50, 91.2],
	[52, 91.2],
	[48, 91.2],
]

//Webページが読み込まれたら
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Game(640, 360);
	game.fps = 60;

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
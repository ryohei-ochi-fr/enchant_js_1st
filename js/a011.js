//おまじない
enchant();

//変数宣言
var game;

async function fetchData() {
	console.log("loading midi");
	var smf = "midi/001_Hatsune_Miku_Tell_Your_World_short.mid";
	const midi = await Midi.fromUrl(smf);

	// const midiData = fs.readFileSync("test.mid")
	// const midi = new Midi(midiData)

	console.log("loaded midi");
};

console.log("load midi");
fetchData();


//Webページが読み込まれたら
addEventListener('load', function () {

	// console.log("load midi");
	// fetchData();

	//ゲームオブジェクトの作成
	var game = new Game(640, 360);
	game.fps = 30;

	game.preload(
		// 'midi/001_Hatsune_Miku_Tell_Your_World_short.mid',
		// 'midi/bach_846.mid',
		'mp3/taiko04.mp3',
		'img/s100_sample.png'
	);

	// console.log("load assets midi");
	// const midiData = game.assets['midi/001_Hatsune_Miku_Tell_Your_World_short.mid']
	// const midi = new Midi(midiData)

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
		surface.context.fillRect(0, 0, 450, 50);
		sprite.x = 95
		sprite.y = 285

		// var label = new Label('MidiPaeser');
		// game.rootScene.addChild(label);
		// game.rootScene.backgroundColor = '#ececec';

		// タッチイベントを設定
		sprite.addEventListener(Event.TOUCH_START, function (e) {
			// 和太鼓どん
			game.assets['mp3/taiko04.mp3'].play();
		});

		// イベントのログ表示
		var status = new Label("");
		status._log = [];
		status.add = function (str) {
			this._log.unshift(str);
			this._log = this._log.slice(0, 20);
			this.text = this._log.join('<br />');
		};

		var round = function (num) {
			return Math.round(num * 1e3) / 1e3;
		};

		game.rootScene.on('touchstart', function (evt) {
			status.add('touchstart (' + round(evt.x) + ', ' + round(evt.y) + ')');
		});
		game.rootScene.on('touchmove', function (evt) {
			status.add('touchmove (' + round(evt.x) + ', ' + round(evt.y) + ')');
		});
		game.rootScene.on('touchend', function (evt) {
			status.add('touchend (' + round(evt.x) + ', ' + round(evt.y) + ')');
		});

		game.rootScene.addChild(status);

		// ここからMIDIファイルパースの検証 Tone.js
		var label = new Label('MidiPaeser');
		label.x = 300;
		game.rootScene.addChild(label);

		// var synths = new Tone.Synth().toMaster();

		// タッチイベントを設定
		// document.querySelector('#btnPlay').addEventListener('click', (e) => {
		// label.addEventListener(Event.TOUCH_START, function (e) {
		// label.addEventListener(Event.TOUCH_START, (e) => {
		// 	console.log("midi load start");

		// 	enchant.Deferred.next(function () {
		// 		console.log("called function");
		// 		var smf = "midi/001_Hatsune_Miku_Tell_Your_World_short.mid";
		// 		const midi = Midi.fromUrl(smf)
		// 	})

		// 	// var synth = new Tone.PolySynth(16).toMaster();

		// 	// MidiConvert.load(smf, function(midi) {
		// 	// 	console.log("called midiconvert");

		// 	// });
		// });
		// const synths = []

		// 	Midi.fromUrl(smf).then(midi => {
		// 		//synth playback
		// 		// const playing = e.detail
		// 		const playing = true;

		// 		if (playing) {

		// 			// パースしたmidiデータを表示する
		// 			console.log(midi);

		// 			// 時間単位(分解能) ppq = 480
		// 			console.log(midi.header.ppq);
		// 			console.log(midi.header.tempos[0].bpm);

		// 			midi.tracks.forEach(track => {
		// 				// トラックの情報を書き出す
		// 				// console.log(track.channel, track.instrument.name, track.instrument.number);
		// 				console.log(track);

		// 				track.notes.forEach(note => {
		// 					// midiの1音のデータ(ノーツ)を書き出してみる
		// 					// console.log(note.midi, note.time, note.duration, note.name);

		// 				})
		// 			});


		// 			// // Tone.js で音を鳴らす
		// 			// const now = Tone.now() + 0.5
		// 			// midi.tracks.forEach(track => {
		// 			// 	//create a synth for each track
		// 			// 	const synth = new Tone.PolySynth(10, Tone.Synth, {
		// 			// 		envelope: {
		// 			// 			attack: 0.02,
		// 			// 			decay: 0.1,
		// 			// 			sustain: 0.3,
		// 			// 			release: 1
		// 			// 		}
		// 			// 	}).toMaster()
		// 			// 	synths.push(synth)
		// 			// 	//schedule all of the events
		// 			// 	track.notes.forEach(note => {
		// 			// 		synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
		// 			// 	})
		// 			// })
		// 		} else {
		// 			//dispose the synth and make a new one
		// 			while (synths.length) {
		// 				const synth = synths.shift()
		// 				synth.dispose()
		// 			}
		// 		}
		// 	})
		// })

	};
	// ここまでMIDIファイルパース



	// ゲームスタート
	game.start();


});
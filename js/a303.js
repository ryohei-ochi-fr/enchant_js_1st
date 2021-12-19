// SkyWay TURN Server
// const Peer = window.Peer;

(async function main() {
	const localVideo = document.getElementById('js-local-stream');
	const remoteVideos = document.getElementById('js-remote-streams');

	const localStream = await navigator.mediaDevices
		.getUserMedia({
			audio: true,
			video: false,
		})
		.catch(console.error);

	// SkyWay TURN Server
	const Peer = window.Peer;
	const peer = (window.peer = new Peer({
		key: 'b78ac2d3-b7c3-4ccd-8a39-01b2b0ba9f74',
		debug: 3,
	}));

	var roomId = {
		value: "debugroom"
	};

	peer.on('open', () => {

		console.log("Peer.EVENTS.open");

		const room = peer.joinRoom(roomId.value, {
			mode: "mesh",
			stream: localStream,
		});

		room.once('open', () => {
			console.log('=== You joined ===');
		});

		room.on('peerJoin', peerId => {
			console.log(`=== ${peerId} joined ===`);
		});

		room.on('data', ({ data, src }) => {
			// Show a message sent to the room and who sent
			console.log(`${src}: ${data}`);
		});


		// Render remote stream for new peer join in the room
		room.on('stream', async stream => {
			const newVideo = document.createElement('video');
			newVideo.srcObject = stream;
			newVideo.playsInline = true;
			// mark peerId to find it later at peerLeave event
			newVideo.setAttribute('data-peer-id', stream.peerId);
			remoteVideos.append(newVideo);
			await newVideo.play().catch(console.error);
		});

		// for closing room members
		room.on('peerLeave', peerId => {
			const remoteVideo = remoteVideos.querySelector(
				`[data-peer-id="${peerId}"]`
			);
			remoteVideo.srcObject.getTracks().forEach(track => track.stop());
			remoteVideo.srcObject = null;
			remoteVideo.remove();

			console.log(`=== ${peerId} left ===`);
		});


	});
})();

//おまじない
enchant();

//変数宣言
var game;



//Webページが読み込まれたら
addEventListener('load', function () {

	// SkyWay TURN Server へ接続

	//ゲームオブジェクトの作成
	var game = new Game(640, 360);
	game.fps = 30;

	game.preload(
		'mp3/taiko04.mp3',
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

		console.log("game.rootScene.addChild");


		console.log("next");


	}

	//ゲームスタート
	game.start();

	console.log("game.start");

});
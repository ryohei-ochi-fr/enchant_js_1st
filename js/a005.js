//おまじない
enchant();

//変数宣言
var game;

//Webページが読み込まれたら
addEventListener('load', function () {

	//ゲームオブジェクトの作成
	var game = new Game(320, 320);
	game.rootScene.backgroundColor = 'black';

	// 最大化、中央配置
	var CenterMove = function (core) {
		var scale = Math.min(window.innerWidth / core.width, window.innerHeight / core.height);
		core.scale = scale;

		var stage = document.getElementById('enchant-stage');
		stage.style.position = 'absolute';
		stage.style.top = (window.innerHeight - (core.height * core.scale)) / 2 + 'px';
		stage.style.left = (window.innerWidth - (core.width * core.scale)) / 2 + 'px';
		core._pageX = (window.innerWidth - (core.width * core.scale)) / 2;
		core._pageY = (window.innerHeight - (core.height * core.scale)) / 2;
	};

	setTimeout(function () {
		CenterMove(game);
	}, 55);

	//ゲームスタート
	game.start();
});

// 最大化ボタン
function goFullScreen() {
	var stage = document.getElementById('enchant-stage');

	fullScreen(stage);
}

// Full Screen
function fullScreen(target){
	//Chrome15+, Safari5.1+, Opera15+
	if (target.webkitRequestFullscreen) {
		target.webkitRequestFullscreen(); 
	}
	//FF10+
	else if (target.mozRequestFullScreen) {
		target.mozRequestFullScreen(); 
	}
	//IE11+
	else if (target.msRequestFullscreen) {
		target.msRequestFullscreen(); 
	}
	// HTML5 Fullscreen API仕様
	else if (target.requestFullscreen) {
		target.requestFullscreen(); 
	}
	// 未対応
	else {
		alert('ご利用のブラウザはフルスクリーン操作に対応していません');
	}
}
 
// Cancel Full Screen
function cancelFullScreen(target){
	//Chrome15+, Safari5.1+, Opera15+
	if (document.webkitRequestFullscreen) {
		document.webkitCancelFullScreen(); 
	}
	//FF10+
	else if (document.mozRequestFullScreen) {
		document.mozCancelFullScreen(); 
	}
	//IE11+
	else if (document.msRequestFullscreen) {
		document.msExitFullscreen(); 
	}
	// HTML5 Fullscreen API仕様
	else if (document.requestFullscreen) {
		document.cancelFullScreen(); 
	}
}
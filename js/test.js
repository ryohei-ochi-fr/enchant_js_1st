//ロゴ画面
enchant();

var game;
let countFrame = 30 * 5;

//ロードイベント
addEventListener('load', function () {
	//ゲームオブジェクトの作成
	var game = new Game(640, 360);

    // game.preload(
    //     //'BGM'
    // );

    game.onload = function () {
        game.scale = 1;
        game.fps = 30;
        // game.touched = false;
                //スタートページ
                var createSceneS030 = function () {
                    let scene = new Scene();
        
                    //scene.preload()
                    let button = new button();
                    button.x = 320;
                    button.y = 180;
                    button.backGroundColor ='#000000';
                    scene.backGroundColor = '#ececec';

        
                    return scene;
                }
        


        let createSceneS010 = function () {
            let scene = new Scene();

            scene.backGroundColor = '#ececec';

            //画面にテキストを表示する際はラベルオブジェクトを召喚する
            //→リンクなども同様では？
            let title = new Label('チームロゴ');

            title.textAlign = 'center';
            title.color = '#000000';
            title.x = 0;
            title.y = 96;
            title.font = '28px sans-serif';
            scene.addChild(title);

            let memo = new Label('5秒後に次画面へ遷移');
            scene.addChild(memo);

            // let link = new location.href('https://docs.google.com/spreadsheets/d/1ffpECL2976CS2pNRKMRoErRHAR5ZV5GNDdkNtXO4PJ0/edit#gid=770544253');
            // scene.addchild(link);

            title.addEventListener(Event.TOUCH_START, function (e) {
                game.replaceScene(createSceneS020());
            });

            game.addEventListener(Event.ENTER_FRAME, function () {


                if (countFrame == 90) {
                    //game.assets['何か音']

                }
                if (countFrame == 0) {
                    game.replaceScene(createSceneS020());
                }
                else {
                    countFrame--;
                }

            });

            return scene;

        }
        
        var createSceneS020 = function () {
            //シーンごとにsceneを宣言
            let scene = new Scene();
            scene.backgroundColor = '#fcc800';

            let title1 = new Label('ひゃっはー');
            title1.textAlign = 'center';
            title1.color = '#ffffff';
            title1.x = 0;
            title1.y = 96;
            title1.font = '28px sans-serif';

            scene.addChild(title1);




        
        }
        game.replaceScene(createSceneS030);
    }



    game.start();

}

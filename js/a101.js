
var value;

// ex.1 async で Promise を返す 関数
async function funcEx1(/*引数*/) {
	// 処理
	value = 'hoge';
	return value;
}

// ex.2 async を使わない関数の書き方
// ex.1 と同じ処理になり、Promise を返す 
function funxEx2(/*引数*/) {
	return new Promise((resolve, reject) => {
		resolve(value);
	});
}


console.log('非同期処理で hoge が出力される');

// then() で return の値を受け取ることができる
funcEx1().then(value => console.log(value));

// 書き方の一例
funcEx1().then(value => {
	console.log(value);
	console.log(value);
});


// 約一秒後、受け取った値を2倍で返す非同期関数
const promiseFunc = value => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(value);
			resolve(value * 2);
		}, 1000);
	});
};

// 非同期関数
async function asyncFunc() {
	// await 式によって順番に処理される
	const a = await promiseFunc(1);
	const b = await promiseFunc(2);
	const c = await promiseFunc(3);

	// 1*2 + 2*2 + 3*2 = 12 
	return a + b + c;
}

asyncFunc().then(value => {
	 // 1秒待つを3回、3秒経過後 12 が出力される
	console.log(value);
});
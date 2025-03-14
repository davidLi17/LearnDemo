// hello.js
module.exports = function () {
    let hello = document.createElement('div')
    console.log("src/hello.js hello::", hello);
    hello.innerHTML = 'hello.js:::welcome to China!'
    return hello
}
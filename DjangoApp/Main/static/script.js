
let btn = document.getElementById("btn");
let JSON = document.getElementById("JSON");
let JS = document.getElementById("JS");
let CSS = document.getElementById("CSS");

let obj;

function onChange(event) {
    var reader = new FileReader();
    console.log("json triggers")
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoad(event){
    console.log(event.target.result);
    JSON.value = event.target.result;
}
document.getElementById('JSON-input').addEventListener('change', onChange);




function onChangeJavascript(event) {
    var reader = new FileReader();
    console.log("javascript triggers")
    reader.onload = onReaderLoadJavascript;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoadJavascript(event){
    console.log(event.target.result);
    JS.value = event.target.result;

}
document.getElementById('JS-input').addEventListener('change', onChangeJavascript);



function onChangeCSS(event) {
    var reader = new FileReader();
    console.log("CSS triggers")
    reader.onload = onReaderLoadJavascript;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoadCSS(event){
    console.log(event.target.result);
    CSS.value = event.target.result;

}
document.getElementById('CSS-input').addEventListener('change', onChangeCSS);






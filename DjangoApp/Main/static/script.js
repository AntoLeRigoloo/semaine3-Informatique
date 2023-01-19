let btn = document.getElementById("btn");

let boxJSON = document.getElementById("boxJSON");
let JSON = document.getElementById("JSON");

function onDragAndDropJSON(event){
    event.preventDefault();
    let fileType = event.dataTransfer.files[0].type;
    if (fileType != "application/json") {
        alert("Please drop a json file");
        boxJSON.style.backgroundColor = "white";
        return;
    }
    else{
        file = event.dataTransfer.items[0].getAsFile();
        let fileReader = new FileReader();
        fileReader.onload = onReaderLoadJSON;
        fileReader.readAsText(file);
    }
}
function onChangeJSON(event) {
    var reader = new FileReader();
    console.log("json triggers")
    reader.onload = onReaderLoadJSON;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoadJSON(event){
    console.log(event.target.result);
    JSON.value = event.target.result;
}
document.getElementById('JSON-input').addEventListener('change', onChangeJSON);
boxJSON.addEventListener("drop", onDragAndDropJSON);
boxJSON.addEventListener("dragover", (event)=>{event.preventDefault(); boxJSON.style.backgroundColor = "red";});
boxJSON.addEventListener("dragleave", ()=>{boxJSON.style.backgroundColor = "white";});
  


let JS = document.getElementById("JS");
let boxJS = document.getElementById("boxJS");

function onDragAndDropJS(event){
    event.preventDefault();
    let fileType = event.dataTransfer.files[0].type;
    if (fileType != "text/javascript") {
        alert("Please drop a javascript file");
        boxJS.style.backgroundColor = "white";
        return;
    }
    else{
        file = event.dataTransfer.items[0].getAsFile();
        let fileReader = new FileReader();
        fileReader.onload = onReaderLoadJS;
        fileReader.readAsText(file);
    }
}
function onChangeJS(event) {
    var reader = new FileReader();
    console.log("js triggers")
    reader.onload = onReaderLoadJS;
    reader.readAsText(event.target.files[0]);
}
function onReaderLoadJS(event){
    console.log(event.target.result);
    JS.value = event.target.result;
}
document.getElementById('JS-input').addEventListener('change', onChangeJS);
boxJS.addEventListener("drop", onDragAndDropJS);
boxJS.addEventListener("dragover", (event)=>{event.preventDefault(); boxJS.style.backgroundColor = "red";});
boxJS.addEventListener("dragleave", ()=>{boxJS.style.backgroundColor = "white";});
  









































  
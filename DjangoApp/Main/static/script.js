let boxJSON = document.getElementById("boxJSON"); // Get the box where the user can drop the json file
let JSON = document.getElementById("JSON"); // l'input hidden qui contiendra le json une fois le fichier déposé

function onDragAndDropJSON(event){ // fonction qui s'execute quand on dépose un fichier dans la box
    event.preventDefault(); // empeche le navigateur de faire ce qu'il veut (ouvrir le fichier par exemple)
    let fileType = event.dataTransfer.files[0].type; // on prend le type du fichier ex : "application/json" ou "text/javascript"
    if (fileType != "application/json") { // on test si le fichier est du bon type
        alert("Please drop a json file"); // si ce n'est pas le cas on affiche un message d'erreur
        boxJSON.style.backgroundColor = "white"; // on remet la couleur de fond de la box à blanc
        return;
    }
    else{
        file = event.dataTransfer.items[0].getAsFile(); // on recupere le fichier déposé
        let fileReader = new FileReader(); 
        fileReader.onload = onReaderLoadJSON; // on appelle la fonction onReaderLoadJSON quand le fichier est chargé
        fileReader.readAsText(file); // on charge le fichier comme etant un texte et non comme un fichier image par exemple
    }
}
function onChangeJSON(event) { // fonction qui s'execute quand on change le fichier dans l'input dans la box
    let reader = new FileReader();
    console.log("json triggers")
    reader.onload = onReaderLoadJSON; // on appelle la fonction onReaderLoadJSON quand le fichier est chargé
    reader.readAsText(event.target.files[0]); // on charge le fichier comme etant un texte et non comme un fichier image par exemple
}
function onReaderLoadJSON(event){
    console.log(event.target.result);
    JSON.value = event.target.result; // on met le contenu du fichier dans l'input hidden lié au json
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
  









































  
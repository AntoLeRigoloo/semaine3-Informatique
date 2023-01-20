
function ouverte(json,form,index){
    let div = document.createElement("div"); // Create a div element
    div.className = "question";

    let spanQuestion = document.createElement("span");
    spanQuestion.className = "span-question"; // Create a span element et ecris l'ennoncé de la question
    spanQuestion.innerHTML = "Question "+index+" : " + json.Question;

    let input = document.createElement("input"); // Create a input element
    input.type = "text";
    input.name = "Question"+index;
    input.className = "input-text";

    form.appendChild(div); // Append the div to the form
    div.appendChild(spanQuestion); // Append the span to the div
    div.appendChild(input); // Append the input to the div
}




function qcm(json,form,index){
    let div = document.createElement("div"); // Create a div element
    div.className = "question-qcm";

    let spanQuestion = document.createElement("span"); // Create a span element et ecris l'ennoncé de la question
    spanQuestion.className = "span-question";
    spanQuestion.innerHTML = "Question "+index+" : " + json.Question;
    form.appendChild(div);
    div.appendChild(spanQuestion);

    let inputHidden = document.createElement("input"); // Create a input element qui contriendra la reponse
    inputHidden.type = "hidden"; // C'est un input caché
    inputHidden.name = "Question"+index;
    inputHidden.value = " ";
    div.appendChild(inputHidden);

    for(let i=0; i < json.Choix.length; i++){ // Boucle pour créer le bon nombre de proposition
        let divProposition = document.createElement("div"); // Create a div element
        divProposition.className = "div-proposition";

        let input = document.createElement("input"); // Create a input element liée à une proposition pour l'utilisateur
        input.type = "radio";
        input.name = "QCM"+index;
        input.className = "input-radio";

        let spanProposition = document.createElement("span"); // Create a span element et ecris la proposition a coté de l'input
        spanProposition.className = "span-proposition";
        spanProposition.innerHTML = json.Choix[i];
        spanProposition.id = "Question"+index+"Choix"+i;

        divProposition.onclick = function(){ // Quand on clique sur une proposition, on met la valeur de la proposition (ce qui est ecrit dans le span lié a la proposition) dans l'input caché
            let IDvalue = document.getElementById("Question"+index+"Choix"+i);
            input.checked = true;
            inputHidden.value = IDvalue.innerHTML;
        }; 

        div.appendChild(divProposition);
        divProposition.appendChild(input);
        divProposition.appendChild(spanProposition);     
    }

}


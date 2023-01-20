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

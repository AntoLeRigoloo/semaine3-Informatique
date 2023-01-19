function ouverte(json,form,index){
    let div = document.createElement("div");
    div.className = "question";

    let spanQuestion = document.createElement("span");
    spanQuestion.className = "span-question";
    spanQuestion.innerHTML = "Question "+index+" :" + json.Question;

    let input = document.createElement("input");
    input.type = "text";
    input.name = "Question"+index;
    input.className = "input-text";

    form.appendChild(div);
    div.appendChild(spanQuestion);
    div.appendChild(input);
}


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




function qcm(json,form,index){
    let div = document.createElement("div");
    div.className = "question-qcm";

    let spanQuestion = document.createElement("span");
    spanQuestion.className = "span-question";
    spanQuestion.innerHTML = "Question "+index+" :" + json.Question;
    form.appendChild(div);
    div.appendChild(spanQuestion);

    let inputHidden = document.createElement("input");
    inputHidden.type = "hidden";
    inputHidden.name = "Question"+index;
    inputHidden.value = " ";
    div.appendChild(inputHidden);

    for(let i=0; i < json.Choix.length; i++){
        let divProposition = document.createElement("div");
        divProposition.className = "div-proposition";

        let input = document.createElement("input");
        input.type = "radio";
        input.name = "QCM"+index;
        input.className = "input-radio";

        let spanProposition = document.createElement("span");
        spanProposition.className = "span-proposition";
        spanProposition.innerHTML = json.Choix[i];
        spanProposition.id = "Question"+index+"Choix"+i;

        divProposition.onclick = function(){
            let IDvalue = document.getElementById("Question"+index+"Choix"+i);
            input.checked = true;
            inputHidden.value = IDvalue.innerHTML;
        }; 

        div.appendChild(divProposition);
        divProposition.appendChild(input);
        divProposition.appendChild(spanProposition);     
    }

}


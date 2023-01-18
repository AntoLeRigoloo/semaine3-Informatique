from django.shortcuts import render
import json
import openai
from .forms import QuestionForm
from .models import Question
import os

openai.api_key = "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"

def CallChatGpt(question,reponse):
    questionAposer = "Partons du principe que tu es un professeur ayant realise un examen. a la question comportant la consigne : {}. ton eleve a repondu : {}. est-ce que cette réponse est correcte ou incorrecte ? Réponds uniquement en un seul mot sans utilisation de points à la fin de ta phrase".format(question,reponse)
    res = str(openai.Completion.create(
        model="text-davinci-003",
        prompt = questionAposer,
        max_tokens=5,
        temperature=0
    ))
    res = json.loads(res)
    res = res["choices"][0]["text"]
    return res

    





# def index(request):
#     if request.method == "POST": #check if request is POST
#         form = QuestionForm(request.POST, request.FILES) #get the form from the request using the model
#         if form.is_valid():
#             if os.listdir("media/question"): #check if there is a file in the folder
#                 for file in os.listdir("media/question"): 
#                     os.remove("media/question/"+file) #remove all files in the folder
#             form.save() #save the new file in the folder
#             os.rename("media/question/"+os.listdir("media/question")[0],"media/question/data.json") #rename the file to data.json
#     else :
#         form = QuestionForm()

#     return render(request, 'main/index.html', {'form': form})
def index(request):
    if request.method == "POST": #check if request is POST
        form = QuestionForm(request.POST, request.FILES) #get the form from the request using the model
        if form.is_valid():
            file = request.FILES.dict()['ListeQuestion']
            #give me the content of file in json format
            jsonfile = json.loads(file.read().decode('utf-8'))
            json_object = json.dumps(jsonfile, ensure_ascii=False, indent=4)
            with open("media/question/data.json", "w") as outfile:
                outfile.truncate(0)
                outfile.write(json_object)
            
            
    else :
        form = QuestionForm()

    return render(request, 'main/index.html', {'form': form})






def Configuration(request):
    if request.method == "POST":
        with open("main/static/functiontest.js", "w") as outfile:
            outfile.truncate(0)
            outfile.write(request.POST.dict()["JS"])
        
        file = json.loads(request.POST.dict()["JSON"])
        json_object = json.dumps(file, ensure_ascii=False, indent=4)
        with open("media/question/data.json", "w") as outfile:
            outfile.truncate(0)
            outfile.write(json_object)

        with open("main/static/styleQuestionnaire.css", "w") as outfile:
            outfile.truncate(0)
            outfile.write(request.POST.dict()["CSS"])

        

        

        


    return render(request, 'main/configuration.html')


def Questionnaire(request):
    with open("media/question/data.json") as json_file:
        jsonfile = json.dumps(json.load(json_file))

    if request.method == "POST":
        print(request.POST)
        
    
    context = {
        "jsonfile" : jsonfile,
    }
    
    return render(request, 'main/questionnaire.html',context)










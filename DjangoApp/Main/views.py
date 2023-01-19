from django.shortcuts import render
import json
import openai
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



def Configuration(request):
    if request.method == "POST":
        print (request.POST.dict())
        try :
            if request.post.dict()["JS"] != "":
                with open("main/static/functiontest.js", "w") as outfile:
                    outfile.truncate(0)
                    outfile.write(request.POST.dict()["JS"])
        except:
            pass
        

        try :
            file = json.loads(request.POST.dict()["JSON"])
            json_object = json.dumps(file, ensure_ascii=False, indent=4)
            with open("media/question/data.json", "w") as outfile:
                outfile.truncate(0)
                outfile.write(json_object)
        except:
            pass
    return render(request, 'main/configuration.html')


def Questionnaire(request):
    with open("media/question/data.json") as json_file:
        jsonfile = json.dumps(json.load(json_file))    
    context = {
        "jsonfile" : jsonfile,
    }
    
    return render(request, 'main/questionnaire.html',context)


def Note(liste_reponse):
    '''prend en argument une liste de [".Correcte",".Incorrecte"] de la longueure du nombre de question
    retourne un liste avec [nombre de point, total points du questionnaire, note sur 20]'''

    with open("media/question/data.json") as json_file:
        data = json.load(json_file)

    # access the QCM section
    qcm_data = data['QCM']
    total_points = []
    bareme = 0
    reponse = 0
    for question in qcm_data.values() :
        bareme += int(question['Points'])
        if (liste_reponse[reponse]=='.\n\nCorrecte'):
            total_points.append(int(question['Points']))
        reponse += 1

    return [sum(total_points),bareme,sum(total_points)*20/bareme]

def Correction(request):
    with open("media/question/data.json") as json_file:
        jsonfile = json.load(json_file)

    nombre_question=len(jsonfile["QCM"])
    question=[]
    reponse_list=[]

    for o in range (nombre_question):
        question.append(jsonfile["QCM"]["{}".format(o+1)]["Question"])

    if request.method == "POST": 
        Correction=[]
        reponsePost = request.POST.dict()

        for i in range (nombre_question):
            Correction.append(CallChatGpt(question[i],reponsePost["Question{}".format(i+1)]))

        for i in range (nombre_question):
            reponse_list.append(reponsePost["Question{}".format(i+1)])

        note=Note(Correction)[2]
        ElementsQuestion=zip(question,Correction,reponse_list)
        context = {'ElementsQuestion':ElementsQuestion}
        context['note'] = note
        print(Correction)

    return render(request,'main/correction.html',context)







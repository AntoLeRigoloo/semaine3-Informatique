from django.shortcuts import render
import json
import openai
import os





def CallChatGpt(question,reponse, ApiKey):
    '''Cette fonction permet d'envoyer a 'chat GPT' un texte predefini,
    celui-ci est formaté pour que l'IA comprenne bien le contexte de la question et retourne une reponse 
    predefini en 'binaire' (.\n\nCorrecte ,  .\n\nIncorrect) qui nous permettra par la suite de l'ananlyser
    '''
    questionAposer = "Partons du principe que tu es un professeur ayant realise un examen. a la question comportant la consigne : {}. ton eleve a repondu : {}. est-ce que cette réponse est correcte ou incorrecte ? Réponds uniquement en un seul mot sans utilisation de points à la fin de ta phrase".format(question,reponse)
    #la phrase transmise a chat GPT
    openai.api_key = str(ApiKey)

    res = str(openai.Completion.create(
        model="text-davinci-003",
        prompt = questionAposer,
        max_tokens=5,   #on 'filtre la reponse pour ne resortir que les 5premier tokens, ici '.\n\nCorrecte'
        temperature=0
    ))
    res = json.loads(res)
    res = res["choices"][0]["text"]
    return res






def Configuration(request):
    '''
    Cette fonction sert à générer la page /configuration
    On recupere ici les fichiers de configuration : JSON et les fonctions JS à ajouter
    si des fichiers ont ete rendus, on efface ceux deja present dans le projet pour pouvoir deposer les nouveaux
    On met le JS dans les statics pour pouvoir les importer dans les fichiers HTML
    On met le JSON dans un dossier dans la racine du projet 
    '''
    if request.method == "POST":
        # print (request.POST.dict())
        try :
            if request.POST.dict()["JS"] != "":
                with open("main/static/functiontest.js", "w") as outfile:
                    outfile.truncate(0)
                    outfile.write(request.POST.dict()["JS"])
        except:
            pass
        try :
            file = json.loads(request.POST.dict()["JSON"])
            with open('media/question/data.json', 'w', encoding='utf-8') as outfile:
                json_object = json.dumps(file, ensure_ascii=False, indent=4)
                print("sucess to open")                                     #debug
                outfile.truncate(0)
                print("success to truncate")   
                try :                                                                     #debug
                    outfile.write(str(json_object))
                    print("sucess to write")                                 #debug
                except : 
                    print("probleme to write")
                    pass
            pass
        except:
            pass
        

       
    return render(request, 'main/configuration.html')





def Questionnaire(request):
    '''
    On recupère le JSON et on le transmet au javascript via la page HTML
    '''
    with open("media/question/data.json") as json_file:     #On récupère les infos du json et on les stoques dans jsonfile
        jsonfile = json.dumps(json.load(json_file))    
    context = {
        "jsonfile" : jsonfile,  #On met toutes les info dans le context pour l'envoyer dans questionnaire.html
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
    for question in qcm_data.values() :     #question va parcourir tout les question du json
        bareme += int(question['Points'])   #on implemente le bareme/ nombre de points total du questionnaire
        if (liste_reponse[reponse]=='.\n\nCorrecte'):
            total_points.append(int(question['Points']))    #on rajoute toutes les notes dans une liste en vu d'afficher le nombre de points reussi sur chaques questions
        reponse += 1 #+1 pour augmenter la boucle

    return [sum(total_points),bareme,sum(total_points)*20/bareme]





def Correction(request):
    '''
    Cette fonction sert à générer la page /correction
    Elle permet d'envoyer toutes les informations nécessaires pour que le prof puisse corriger l'élève
    '''
    with open("media/question/data.json") as json_file:     #On récupère les infos du json et on les stoques dans jsonfile
        jsonfile = json.load(json_file)                     

    nombre_question=len(jsonfile["QCM"])    #représente le nombre de question dans le json
    ApiKey = jsonfile["ApiKey"]             #représente l'API key du json
    question=[]
    reponse_list=[]
    points=[]

    for o in range (nombre_question):
        question.append(jsonfile["QCM"]["{}".format(o+1)]["Question"])      #on met dans la liste "question" tous les énoncés des question du json
        points.append(jsonfile["QCM"]["{}".format(o+1)]["Points"])          #on met dans la liste "points" tous les points de chaque question du json

    if request.method == "POST":    #sert à verifier que l'élève a envoyé son formulaire
        Correction=[]
        reponsePost = request.POST.dict()       #représente les réponses de l'élève

        for i in range (nombre_question):
            Correction.append(CallChatGpt(question[i],reponsePost["Question{}".format(i+1)],ApiKey))       #ajoute à la liste Correction la réponse de l'élève si elle est correcte/incorret

        for i in range (nombre_question):
            reponse_list.append(reponsePost["Question{}".format(i+1)])      #ajoute à la liste reponse_list les réponses de l'élève

        note=Note(Correction)[2]        #C'est la note de l'élève
        ElementsQuestion=zip(question,Correction,reponse_list,points)      #On met dans ce zip tous les énoncés des questions, les corrections et les réponses de l'élève.
        context = {'ElementsQuestion':ElementsQuestion} 
        context['note'] = note      #met la note dans le contexte
        print(Correction)

    return render(request,'main/correction.html', context )


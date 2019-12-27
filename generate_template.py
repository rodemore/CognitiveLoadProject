import shutil
import os
from random import choice

def generate_template(n_tasks,type_tsk,level, dir_name):
    path = create_directory(type_tsk,level)
    templates = os.listdir(path)
    template_name = "template"+ str(len(templates)+1)
    template_path = path+"/"+ template_name
    os.mkdir(template_path)
    
    file = open(template_path+"/info_"+template_name+type_tsk+"_"+level+"_"+".csv", "w")
    file.write("id,answer\n")
    archivos = os.listdir(dir_name)
    i = 0
    ids = set()
    while i<n_tasks:
        task = choice(archivos)
        id_tsk,subid,answ = task.split(".")[0].split("_")
        if i not in ids:
            ids.add(id_tsk)
            shutil.copy(dir_name+"/"+task, template_path+"/"+str(i+1)+".PNG")
            archivos.remove(task)
            i+=1
            line = str(i)+","+answ+"\n"
            file.write(line)
    file.close()
            
def create_directory(type_tsk, level):
    if not os.path.exists("./templates"):
        os.mkdir("./templates")
    if not os.path.exists("./templates/"+type_tsk):
        os.mkdir("./templates/"+type_tsk)
        
    path = "./templates/"+type_tsk+"/"+level
    if not os.path.exists(path):
        os.mkdir(path)
    return path
    
generate_template(10,"numeric","hard","./tasks/numerico/easy" )
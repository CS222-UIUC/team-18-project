from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as p
import numpy as np

#need to make a post request in frontend and call this function to get the classes data
#remove chemistry, statistics
#loop through dictionary and calculate credit hours completed for each minor
@api_view(["POST"])

def classNames(self): 
    gpaFile = p.read_csv(r'.\BackEnd-cs222-project\course-catalog.csv')
    return gpaFile["courseName"].to_list()
def minor_progress(request):
    #variables
    inputted_classes = request.data.get("classes", [])
    percentage_complete = {
        "Business": 0,
        "Computer Science": 0,
        "Math": 0,
        "Data Science": 0,
        "Economics": 0,
        "Chemistry": 0, 
        "Statistics": 0, 
        "Communications": 0,
        "Spanish": 0,
        "Physics": 0
    }

    credit_hours = {
        "Business": 18,
        "Computer Science": 16,
        "Math": 18,
        "Data Science": 21,
        "Economics": 18,
        "Chemistry": 20, 
        "Statistics": 12, 
        "Communications": 19,
        "Spanish": 18,
        "Physics": 21
    }

    minors_required = {
        #how to account for different headers of class
        #account for the or factor
        "Business": ["BADM 310", "BADM 320", "FIN 221"],
        "Computer Science": ["CS 124", "CS 128", "CS 173", "CS 225"],
        "Math": ["MATH 241"],
        "Data Science": ["STAT 107", "STAT 207", "CS 307"],
        "Economics": ["ECON 102", "ECON 202", "ECON 203", "ECON 302"],
        "Chemistry": [], #need to account for regular or accelerated version #change this
        "Statistics": [], #have a variety to chose from
        "Communications": ["CMN 102"],
        "Spanish": ["SPAN 228"],
        "Physics": ["PHYS 211", "PHYS 212", "PHYS 225", "PHYS 325"]
    }
    minors_electives = {
        "Business": [],
        "Computer Science": [],
        "Math": [],
        "Data Science": [],
        "Economics": [],
        "Chemistry": [],
        "Statistics": [], 
        "Communications": [],
        "Spanish": [],
        "Physics": []
    }

    current_credit = {
        "Business": [],
        "Computer Science": [],
        "Math": [],
        "Data Science": [],
        "Economics": [],
        "Chemistry": [],
        "Statistics": [], 
        "Communications": [],
        "Spanish": [],
        "Physics": []
    }

    #check all the electives

    #business
    minors_electives["Business"] = [
        item for item in inputted_classes 
        if (item.startswith("BADM 3") or item.startswith("BADM 4")) 
        and item not in [
            "BADM 275", "BADM 300", "BADM 311", "BADM 312", "BADM 313", "BADM 314", 
            "BADM 323", "BADM 326", "BADM 340", "BADM 350", "BADM 380", "BADM 381", "BDI 367",
            "BDI 411", "BDI 475", "BDI 477", "FIN 230", "FIN 241", "FIN 435"
        ]
    ]

    #computer science
    minors_electives["Computer Science"] = [
        item for item in inputted_classes 
        if (item.startswith("CS 3") or item.startswith("CS 4")) 
        and item not in [
            "CS 397", "CS 398", "CS 400", "CS 401", "CS 402", "CS 403", 
            "CS 413", "CS 491", "CS 492", "CS 493", "CS 494", "CS 497", "CS 499"
        ]
    ]

    #spanish
    minors_electives["Spanish"] = [
        item for item in inputted_classes 
        if (item.startswith("SPAN 2") and (item.startswith("SPAN 3") or item.startswith("SPAN 4")))
    ]

    #physics
    minors_electives["Physics"] = [
        item for item in inputted_classes 
        if (item.startswith("PHYS 3") or item.startswith("PHYS 4")) and item not in [
            "PHYS 419", "PHYS 420"
        ]
    ]
    
    for minor in minors_required:
        #if inputed classes equals core classes add to percentage of classes that have been compleeted
        #list of classes completed for a minor
        common_elements = list(set(inputted_classes) & set(minors_required[minor]))
        percentage_complete[minor] = (len(minors_electives)+len(common_elements))*3/credit_hours[minor]

    # calculating credit hours

    gpaFile = p.read_csv(r'.\BackEnd-cs222-project\course-catalog.csv')
    for minor in minors_electives:
        current_credit[minor] = 0;
        for classes in minors_electives[minor]:
            firstIndex = (gpaFile["courseName"] == classes).idxmax()  
            firstRow = gpaFile.loc[firstIndex]
            creditRow = gpaFile.loc[firstRow, "courseName"]
            check = "OR"
            if check in creditRow:
                creditRow = int(check[0:1])
            else:
                creditRow = int(creditRow)
            current_credit[minor] = current_credit[minor] + creditRow

    return Response(percentage_complete) #return the percentage completed

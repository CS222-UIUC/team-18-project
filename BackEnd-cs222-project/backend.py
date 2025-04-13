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

@api_view(["POST"])
def minor_progress(request, major):
    #variables
    inputted_classes = request.data.get("classes", [])
    percentage_complete = {
        "Business": 0,
        "Business Analytics": 0,
        "Technology & Management": 0,
        "Computer Science": 0,
        "Math": 0,
        "Data Science": 0,
        "Economics": 0,
        "Statistics": 0, 
        "Spanish": 0,
        "Physics": 0
    }

    credit_hours = {
        "Business": 18,
        "Business Analytics": 18,
        "Technology & Management": 20,
        "Computer Science": 19,
        "Math": 19,
        "Data Science": 21,
        "Economics": 18,
        "Statistics": 17, 
        "Spanish": 18,
        "Physics": 21
    }

    minors_required = {
        #how to account for different headers of class
        #account for the or factor
        "Business": ["BADM 310", "BADM 320", "FIN 221"],
        "Busines Anlytics": ["BADM 352", "BADM 356", "BADM 358", "BADM 373", "BADM 374"],
        "Technology & Management": [],
        "Computer Science": ["CS 124", "CS 128", "CS 173", "CS 225"],
        "Math": ["MATH 241"],
        "Data Science": ["STAT 107", "STAT 207", "CS 307"],
        "Economics": ["ECON 102", "ECON 202", "ECON 203", "ECON 302"],
        "Statistics": [], 
        "Spanish": ["SPAN 228"],
        "Physics": ["PHYS 211", "PHYS 212", "PHYS 225", "PHYS 325"]
    }
    minors_electives = {
        "Business": [],
        "Business Analytics": [],
        "Technology & Management": [],
        "Computer Science": [],
        "Math": [],
        "Data Science": [],
        "Economics": [],
        "Statistics": [], 
        "Spanish": [],
        "Physics": []
    }

    current_credit = {
        "Business": 0,
        "Business Analytics": 0,
        "Technology & Management": 0,
        "Computer Science": 0,
        "Math": 0,
        "Data Science": 0,
        "Economics": 0,
        "Statistics": 0, 
        "Spanish": 0,
        "Physics": 0
    }

    #check all the electives

    #business
    minors_electives["Business"] = [
        item for item in inputted_classes 
        if (item in [
            "BADM 275", "BADM 300", "BADM 311", "BADM 312", "BADM 313", "BADM 314", 
            "BADM 323", "BADM 326", "BADM 340", "BADM 350", "BADM 380", "BADM 381", 
            "BDI 367", "BDI 411", "BDI 475", "BDI 477", "FIN 230", "FIN 241", "FIN 435"
        ][:2]) 
        or (item == "ACCY 200" or (item in ["ACCY 201", "ACCY 202"] and all(sub in inputted_classes for sub in ["ACCY 201", "ACCY 202"])))
    ]

    # business analytics
    minors_electives["Business Analytics"] = [
        item for item in inputted_classes
        if item in [
            "BADM 336", "BADM 351", "BADM 361", "BADM 362", "BADM 379", "BADM 453",
            "ACCY 302", "FIN 464"
        ]
    ][:1]

    # technology & management
    if "engineering" in major.lower():
        # Required courses for Engineering students
        minors_required["Technology & Management"] = [
            "BADM 365",  
            "ACCY 200",  
            "FIN 221", 
        ]
    else:
        # Required courses for Business students
        minors_required["Technology & Management"] = [
            "MSE 101",  
            "ECE 317",  
            "TAM 201",
        ]

    # Required courses taken by both Engineering and Business students together
    minors_required["Technology & Management"] += [
        "TMGT 367", 
        "TMGT 366",  
        "TMGT 460", 
        "TMGT 461", 
    ]
    minors_electives["Technology & Management"] = list(set(minors_required["Technology & Management"]))

    #computer science
    minors_electives["Computer Science"] = [
        item for item in inputted_classes 
        if (item.startswith("CS 3") or item.startswith("CS 4")) 
        and item not in [
            "CS 397", "CS 398", "CS 400", "CS 401", "CS 402", "CS 403", 
            "CS 413", "CS 491", "CS 492", "CS 493", "CS 494", "CS 497", "CS 499"
        ]
    ][:2]

    #math
    minors_electives["Math"] = [
        item for item in inputted_classes 
        if item in {
            "ASRM 406", "MATH 257", "MATH 415", "MATH 416", "MATH 417", "MATH 418", "MATH 427", "MATH 453",
            "MATH 412", "MATH 413", "MATH 414", "MATH 482", "MATH 284", "MATH 285", "MATH 424", "MATH 425", 
            "MATH 441", "MATH 442", "MATH 444", "MATH 446", "MATH 447", "MATH 448", "CS 450", "MATH 484", 
            "MATH 487", "MATH 489", "MATH 347", "MATH 402", "MATH 403", "MATH 423", "MATH 428", "MATH 432", 
            "MATH 481", "MATH 461", "STAT 400"
        } 
        or (item in {"STAT 410", "STAT 420"} and not {"STAT 410", "STAT 420"}.issubset(inputted_classes))
    ] [:5]

    #data science
    minors_electives["Data Science"] = [
        item for item in inputted_classes
        if item in {
            "ATMS 207", "CS 416", "CS 441", "GGIS 407", 
            "IS 357", "IS 417", "IS 445", "LING 406", "MATH 467", "STAT 432", 
            "STAT 440", "STAT 447", "STAT 480"
        } or (item in {"CS 225", "CS 277"} and not {"CS 225", "CS 277"}.issubset(inputted_classes))][:2] + 
        [item for item in inputted_classes 
        if item in {"IS 467", "IS 477"}][:1]
    
    #economics
    #microeconomics track
    if any(item in inputted_classes for item in ["ECON 411", "ECON 414", "ECON 440", "ECON 450", "ECON 451", "ECON 452", "ECON 480", "ECON 481", "ECON 483", "ECON 482", "ECON 484", "ECON 490"]):
        minors_electives["Economics"] = [
            item for item in inputted_classes 
            if item in {
                "ECON 411", "ECON 414", "ECON 440", "ECON 450", "ECON 451", "ECON 452", 
                "ECON 480", "ECON 481", "ECON 483", "ECON 482", "ECON 484", "ECON 490"
            }
        ][:2]
    #macroeconomics track
    elif any(item in inputted_classes for item in ["ECON 103", "ECON 303", "ECON 420", "ECON 425", "ECON 452", "ECON 490"]):
        minors_electives["Economics"] = [
            "ECON 103", "ECON 303"
        ] + [
            item for item in inputted_classes 
            if item in {"ECON 420", "ECON 425", "ECON 452", "ECON 490"}
        ][:1]
    #econometrics track
    elif any(item in inputted_classes for item in ["ECON 471", "ECON 465", "ECON 490"]):
        minors_electives["Economics"] = [
            item for item in inputted_classes 
            if item in {"ECON 471", "ECON 465", "ECON 490"}
        ]


    # statistics
    minors_electives["Statistics"] = [
        item for item in inputted_classes
        if item in [
            "CPSC 241", "ECON 202", "EPSY 280", "PSYC 235", "STAT 100", "STAT 107", "SOC 280"
        ]
    ][:1] + [
        item for item in inputted_classes
        if item in [
            "STAT 200", "STAT 207", "STAT 212", "ECON 203"
        ]
    ][:1] + [
        item for item in inputted_classes
        if item in [
            "MATH 225", "MATH 257", "MATH 415"
        ]
    ][:1] + [
        item for item in inputted_classes
        if item in [
            "STAT 400", "STAT 408", "MATH 461"
        ]
    ][:1] + [
        item for item in inputted_classes
        if item in [
            "STAT 409", "STAT 410", "STAT 420", "STAT 424", "STAT 425", "STAT 426", "STAT 427", 
            "STAT 428", "STAT 429", "STAT 430", "STAT 431", "STAT 432", "STAT 433", "STAT 434", 
            "STAT 437", "STAT 440", "STAT 443", "STAT 447", "STAT 448", "STAT 480"
        ]
    ][:2]

    #spanish
    minors_electives["Spanish"] = [
        [item for item in inputted_classes if item.startswith("SPAN 2")][:3] +
            [item for item in inputted_classes if item.startswith("SPAN 3") or item.startswith("SPAN 4")][:3]
    ]

    #physics
    minors_electives["Physics"] = (
        [item for item in inputted_classes 
        if (item.startswith("PHYS 3") or item.startswith("PHYS 4")) and item not in ["PHYS 419", "PHYS 420"]][:2]
        + [item for item in inputted_classes if item in ["PHYS 213", "PHYS 214"]][:1]
    )
    
    gpaFile = p.read_csv(r'.\BackEnd-cs222-project\course-catalog.csv')
    #calculate credit hours from electives
    for minor in minors_electives:
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

    #calculate credit hours from required courses
    common_elements = list(set(inputted_classes) & set(minors_required[minor]))
    for classes in common_elements:
        firstIndex = (gpaFile["courseName"] == classes).idxmax()  
        firstRow = gpaFile.loc[firstIndex]
        creditRow = gpaFile.loc[firstRow, "courseName"]
        check = "OR"
        if check in creditRow:
            creditRow = int(check[0:1])
        else:
            creditRow = int(creditRow)
        current_credit[minor] = current_credit[minor] + creditRow


    #calculate the percentage completed
    for minor in minors_required:
        percentage_complete[minor] = 100*(current_credit[minor])/(credit_hours[minor])

    return Response(percentage_complete) #return the percentage completed

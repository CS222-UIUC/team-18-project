from rest_framework.decorators import api_view
from rest_framework.response import Response

#need to make a post request in frontend and call this function to get the classes data
@api_view(["POST"])
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

    #check all the electives

    #computer science
    minors_electives["Computer Science"] = [
        item for item in inputted_classes 
        if (item.startswith("CS 3") or item.startswith("CS 4")) 
        and item not in [
            "CS 397", "CS 398", "CS 400", "CS 401", "CS 402", "CS 403", 
            "CS 413", "CS 491", "CS 492", "CS 493", "CS 494", "CS 497", "CS 499"
        ]
    ]
    
    for minor in minors_required:
        #if inputed classes equals core classes add to percentage of classes that have been compleeted
        #list of classes completed for a minor
        common_elements = list(set(inputted_classes) & set(minors_required[minor]))
        percentage_complete[minor] = (len(minors_electives)+len(common_elements))*3/credit_hours[minor]
    # right now this does not account for credit hours, need to change that

    return Response(percentage_complete) #return the percentage completed

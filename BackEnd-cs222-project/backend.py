from rest_framework.decorators import api_view
from rest_framework.response import Response


#variables
percentage_complete = [0] * 10
minors_required = {
    #how to account for different headers of class
    #account for the or factor
    "Business": ["BADM 310", "BADM 320", "FIN 221"],
    "Computer Science": ["CS 124", "CS 128", "CS 173", "CS 225"],
    "Math": ["MATH 241"],
    "Data Science": ["STAT 107", "STAT 207", "CS 307"],
    "Economics": ["ECON 102", "ECON 202", "ECON 203", "ECON 302"],
    "Chemistry": [], #need to account for regular or accelerated version
    "Statistics": [], #have a variety to chose from
    "Communications": ["CMN 102"],
    "Spanish": ["SPAN 228"],
    "Physics": ["PHYS 211", "PHYS 212", "PHYS 225", "PHYS 325"]
}

for key in minors_required:
    #if inputed classes equals core classes add to percentage of classes that have been compleeted

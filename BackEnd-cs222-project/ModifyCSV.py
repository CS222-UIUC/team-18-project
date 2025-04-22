import pandas as p
import numpy as np
import os

gpaFile = p.read_csv(r'.\BackEnd-cs222-project\course-catalog.csv')
inputted_classes = ["CS 128","CS 124", "CS 173"]

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
    "Business": ["BADM 310", "BADM 320", "FIN 221"],
    "Business Analytics": ["BADM 352", "BADM 356", "BADM 358", "BADM 373", "BADM 374"],  # Fixed typo
    "Technology & Management": [],
    "Computer Science": ["CS 124", "CS 128", "CS 173", "CS 225"],
    "Math": ["MATH 241"],
    "Data Science": ["STAT 107", "STAT 207", "CS 307"],
    "Economics": ["ECON 102", "ECON 202", "ECON 203", "ECON 302"],
    "Statistics": [], 
    "Spanish": ["SPAN 228"],
    "Physics": ["PHYS 211", "PHYS 212", "PHYS 225", "PHYS 325"]
}

# minors_electives = {
#     "Business": [],
#     "Business Analytics": [],
#     "Technology & Management": [],
#     "Computer Science": [],
#     "Math": [],
#     "Data Science": [],
#     "Economics": [],
#     "Statistics": [], 
#     "Spanish": [],
#     "Physics": []
# }

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

for minor in minors_required:
    common_elements = list(set(inputted_classes) & set(minors_required[minor]))
    for cls in common_elements:
        try:
            firstIndex = (gpaFile["courseName"] == cls).idxmax()
            if not gpaFile["courseName"].eq(cls).any():
                print(f"Course {cls} not found in CSV")
                continue
            creditRow = gpaFile.loc[firstIndex, "creditHours"]
            creditRow = int(float(str(creditRow).replace(' hours.', ''))) if pd.notna(creditRow) else 0
            current_credit[minor] += creditRow
        except (KeyError, ValueError) as e:
            print(f"Error calculating required credits for {cls}: {e}")
            continue


# courseName = []

# for val in range(len(gpaFile["Subject"])):
#     courseName.append(gpaFile.loc[val, "Subject"] + " " + str(gpaFile.loc[val, "Number"]))

# gpaFile["courseName"] = courseName
# gpaFile.to_csv(r".\BackEnd-cs222-project\course-catalog.csv", index=False)

print(gpaFile["courseName"])

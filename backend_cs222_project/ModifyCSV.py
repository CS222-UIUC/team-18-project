import pandas as p
import numpy as np
import os

gpaFile = p.read_csv(r'.\BackEnd-cs222-project\course-catalog.csv')

courseName = []

for val in range(len(gpaFile["Subject"])):
    courseName.append(gpaFile.loc[val, "Subject"] + " " + str(gpaFile.loc[val, "Number"]))

gpaFile["courseName"] = courseName
gpaFile.to_csv(r".\BackEnd-cs222-project\course-catalog.csv", index=False)

print(gpaFile["courseName"])

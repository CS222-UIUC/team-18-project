import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import numpy as np
from JobInfoAPI import get_career_choices_for_major_minor


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Project root (BackEnd-cs222-project/)
CSV_PATH = os.path.join(BASE_DIR, 'course-catalog.csv')

@api_view(["GET"])
def home(request):
    return Response({"message": "Welcome to the Minor Progress API! Available endpoints: /api/classNames/, /api/minor_progress/"})

@api_view(["GET", "POST"])
def classNames(request): 
    gpaFile = pd.read_csv(CSV_PATH)
    return Response(gpaFile["courseName"].drop_duplicates().tolist())

@api_view(["GET", "POST"])
def subjectNames(request): 
    gpaFile = pd.read_csv(CSV_PATH)
    return Response(gpaFile["Subject"].dropna().drop_duplicates().tolist())

@api_view(["POST"])
def job_recommendations(request):
    major = request.data.get("major", "")
    minor = request.data.get("minor", "")
    current_keyword_index = int(request.data.get("current_keyword_index", 0))
    current_page = int(request.data.get("current_page", 1))
    
    if not major or not minor:
        return Response({"error": "Missing required fields: 'major' and 'minor'", "jobs": []}, status=400)
    
    try:
        jobs = get_career_choices_for_major_minor(
            major=major,
            minor=minor,
            location="gb",
            results_per_page=5,
            max_pages=10,
            jobs_per_batch=5,
            current_keyword_index=current_keyword_index,
            current_page=current_page
        )
        return Response(jobs)
    except Exception as e:
        print(f"Error fetching job recommendations: {e}")
        return Response({"error": "Failed to fetch job recommendations", "jobs": []}, status=500)
    
@api_view(["GET", "POST"])  
def minor_progress(request):
    # Variables
    inputted_classes = request.data.get("classes", [])
    major = request.data.get("major", "")
    
    if not inputted_classes or not major:
        return Response({"error": "Missing required fields: 'classes' and 'major'"}, status=400)

    percentage_complete = {
        "Business": 0,
        "Business Analytics": 0,
        "Biology": 0,
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
        "Biology": 16,
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
        "Biology": [],
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
        "Biology": [],
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
        "Biology": 0,
        "Computer Science": 0,
        "Math": 0,
        "Data Science": 0,
        "Economics": 0,
        "Statistics": 0, 
        "Spanish": 0,
        "Physics": 0
    }

    # Business electives
    minors_electives["Business"] = [
        item for item in inputted_classes 
        if (item in [
            "BADM 275", "BADM 300", "BADM 311", "BADM 312", "BADM 313", "BADM 314", 
            "BADM 323", "BADM 326", "BADM 340", "BADM 350", "BADM 380", "BADM 381", 
            "BDI 367", "BDI 411", "BDI 475", "BDI 477", "FIN 230", "FIN 241", "FIN 435"
        ][:2]) 
        or (item == "ACCY 200" or (item in ["ACCY 201", "ACCY 202"] and all(sub in inputted_classes for sub in ["ACCY 201", "ACCY 202"])))
    ]

    # Business Analytics electives
    minors_electives["Business Analytics"] = [
        item for item in inputted_classes
        if item in [
            "BADM 336", "BADM 351", "BADM 361", "BADM 362", "BADM 379", "BADM 453",
            "ACCY 302", "FIN 464"
        ]
    ][:1]

    # Biology
    minors_electives["Biology"] = [
        item for item in inputted_classes if item in [
            "IB 150", "IB 103", "IB 104"
        ][:1]  
    ] + [
        item for item in inputted_classes if item in [
            "IB 202", "IB 203", "IB 204", "IB 302"
        ][:2]  
    ] + [
        item for item in inputted_classes if item.startswith("IB 3") or item.startswith("IB 4")
    ][:2]
    

    # Computer Science electives
    minors_electives["Computer Science"] = [
        item for item in inputted_classes 
        if (item.startswith("CS 3") or item.startswith("CS 4")) 
        and item not in [
            "CS 397", "CS 398", "CS 400", "CS 401", "CS 402", "CS 403", 
            "CS 413", "CS 491", "CS 492", "CS 493", "CS 494", "CS 497", "CS 499"
        ]
    ][:2]

    # Math electives
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
    ][:5]

    # Data Science electives
    minors_electives["Data Science"] = [
        item for item in inputted_classes
        if item in {
            "ATMS 207", "CS 416", "CS 441", "GGIS 407", 
            "IS 357", "IS 417", "IS 445", "LING 406", "MATH 467", "STAT 432", 
            "STAT 440", "STAT 447", "STAT 480"
        } or (item in {"CS 225", "CS 277"} and not {"CS 225", "CS 277"}.issubset(inputted_classes))
    ][:2] + [
        item for item in inputted_classes 
        if item in {"IS 467", "IS 477"}
    ][:1]

    # Economics electives
    if any(item in inputted_classes for item in ["ECON 411", "ECON 414", "ECON 440", "ECON 450", "ECON 451", "ECON 452", "ECON 480", "ECON 481", "ECON 483", "ECON 482", "ECON 484", "ECON 490"]):
        minors_electives["Economics"] = [
            item for item in inputted_classes 
            if item in {
                "ECON 411", "ECON 414", "ECON 440", "ECON 450", "ECON 451", "ECON 452", 
                "ECON 480", "ECON 481", "ECON 483", "ECON 482", "ECON 484", "ECON 490"
            }
        ][:2]
    elif any(item in inputted_classes for item in ["ECON 103", "ECON 303", "ECON 420", "ECON 425", "ECON 452", "ECON 490"]):
        minors_electives["Economics"] = [
            "ECON 103", "ECON 303"
        ] + [
            item for item in inputted_classes 
            if item in {"ECON 420", "ECON 425", "ECON 452", "ECON 490"}
        ][:1]
    elif any(item in inputted_classes for item in ["ECON 471", "ECON 465", "ECON 490"]):
        minors_electives["Economics"] = [
            item for item in inputted_classes 
            if item in {"ECON 471", "ECON 465", "ECON 490"}
        ]

    # Statistics electives
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

    # Spanish electives
    minors_electives["Spanish"] = [
        item for item in inputted_classes if item.startswith("SPAN 2")
    ][:3] + [
        item for item in inputted_classes if item.startswith("SPAN 3") or item.startswith("SPAN 4")
    ][:3]

    # Physics electives
    minors_electives["Physics"] = [
        item for item in inputted_classes 
        if (item.startswith("PHYS 3") or item.startswith("PHYS 4")) and item not in ["PHYS 419", "PHYS 420"]
    ][:2] + [
        item for item in inputted_classes if item in ["PHYS 213", "PHYS 214"]
    ][:1]
    
    try:
        print(f"Attempting to load CSV from: {CSV_PATH}")
        gpaFile = pd.read_csv(CSV_PATH)
        print(f"CSV loaded successfully. Columns: {gpaFile.columns.tolist()}")
    except FileNotFoundError as e:
        print(f"FileNotFoundError: {e}")
        return Response({"error": f"CSV file not found at {CSV_PATH}"}, status=404)
    except Exception as e:
        print(f"Unexpected error: {e}")
        return Response({"error": str(e)}, status=500)

    # Calculate credit hours from electives
    for minor in minors_electives:
        for course in minors_electives[minor]:
            if isinstance(course, list):  # Handle nested lists (e.g., Spanish)
                courses = course
            else:
                courses = [course]
            for cls in courses:
                try:
                    firstIndex = (gpaFile["courseName"] == cls).idxmax()
                    if not gpaFile["courseName"].eq(cls).any():
                        print(f"Course {cls} not found in CSV")
                        continue
                    creditRow = int ((gpaFile.loc[firstIndex, "Credit Hours"])[0:1])
                    creditRow = int(float(str(creditRow).replace(' hours.', ''))) if pd.notna(creditRow) else 0
                    current_credit[minor] += creditRow
                except (KeyError, ValueError) as e:
                    print(f"Error calculating elective credits for {cls}: {e}")
                    continue

    # Calculate credit hours from required courses
    for minor in minors_required:
        common_elements = list(set(inputted_classes) & set(minors_required[minor]))
        for cls in common_elements:
            try:
                firstIndex = (gpaFile["courseName"] == cls).idxmax()
                if not gpaFile["courseName"].eq(cls).any():
                    print(f"Course {cls} not found in CSV")
                    continue
                creditRow = int ((gpaFile.loc[firstIndex, "Credit Hours"])[0:1])
                creditRow = int(float(str(creditRow).replace(' hours.', ''))) if pd.notna(creditRow) else 0
                current_credit[minor] += creditRow
            except (KeyError, ValueError) as e:
                print(f"Error calculating required credits for {cls}: {e}")
                continue

    # Calculate the percentage completed
    for minor in percentage_complete:
        if credit_hours[minor] > 0:  # Avoid division by zero
            percentage_complete[minor] = 100 * (current_credit[minor] / credit_hours[minor])

    #sorting based on highest completion rate
    percentage_complete = dict(sorted(percentage_complete.items(), key=lambda item: item[1], reverse=True))
    return Response({
        "percentages": percentage_complete,
    })

# def topMinors(minors):
#     top3 = sorted(minors.items(), key=lambda x: x[1], reverse=True)[:3]
#     return top3
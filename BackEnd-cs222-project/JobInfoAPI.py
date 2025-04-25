import backend.py as backend

ADZUNA_APP_ID = ...
ADZUNA_APP_KEY = ...

import requests
from config import ADZUNA_APP_ID, ADZUNA_APP_KEY
from minor_job_keywords import MINOR_TO_KEYWORDS

def search_jobs(query, location="US", results_per_page=5):
    url = ...
    params = {
        "app_id": ADZUNA_APP_ID,
        "app_key": ADZUNA_APP_KEY,
        "results_per_page": results_per_page,
        "what": query,
        "content-type": "application/json",
    }
    response = requests.get(url, params=params)
    data = response.json()
    return data.get("results", [])

def get_career_choices_for_major_minor(major, minor, location="US", results_per_page=5):
    major_keywords = get_keywords_for_major(major)
    minor_keywords = MINOR_TO_KEYWORDS.get(minor, []) 
    
    combined_keywords = major_keywords + minor_keywords
    query = " ".join(combined_keywords) 
    
    job_results = search_jobs(query, location, results_per_page)
    
    return job_results

def get_keywords_for_major(major):
    # manually map majors to their related keywords (or use a more dynamic method)
    major_keywords_map = {
        "Computer Science": ["software", "developer", "programming", "engineer"],
        "Biology": ["research", "biologist", "biotech", "lab", "scientist"],
        "Business": ["management", "finance", "marketing", "consulting"],
        # Add more majors as needed
    }
    
    return major_keywords_map.get(major, [])  # Return an empty list if the major is not found

# Example
major = "Computer Science"
minor = "Mathematics"
career_choices = get_career_choices_for_major_minor(major, minor)

for job in career_choices:
    print(job['title'], job['location'], job['company']['display_name'])


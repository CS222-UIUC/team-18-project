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



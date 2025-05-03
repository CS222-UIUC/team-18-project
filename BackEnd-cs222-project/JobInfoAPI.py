import requests

# Minor to keyword mappings for job search
MINOR_TO_KEYWORDS = {
    "Business": ["business analyst", "management", "consulting", "marketing", "finance"],
    "Business Analytics": ["data analyst", "business intelligence", "analytics", "data visualization"],
    "Biology": ["biologist", "biotechnology", "research scientist", "lab technician"],
    "Computer Science": ["software engineer", "developer", "programmer", "cybersecurity"],
    "Math": ["mathematician", "quantitative analyst", "actuary", "data scientist"],
    "Data Science": ["data scientist", "machine learning", "data engineer", "AI specialist"],
    "Economics": ["economist", "financial analyst", "policy analyst", "market researcher"],
    "Statistics": ["statistician", "data analyst", "quantitative researcher", "biostatistician"],
    "Spanish": ["translator", "interpreter", "language teacher", "international relations"],
    "Physics": ["physicist", "research scientist", "engineer", "astrophysicist"]
}

def search_jobs(query, location="US", results_per_page=5):
    url = "https://api.adzuna.com/v1/api/jobs/us/search/1"
    params = {
        "app_id": "c4df460e",
        "app_key": "c2763dd4365fc8f82572169a86cc9f4a",
        "results_per_page": results_per_page,
        "what": query,
        "where": location,
        "content-type": "application/json",
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad status codes
        data = response.json()
        return data.get("results", [])
    except requests.RequestException as e:
        print(f"Error fetching jobs: {e}")
        return []

def get_career_choices_for_major_minor(major, minor, location="US", results_per_page=5):
    major_keywords = get_keywords_for_major(major)
    minor_keywords = MINOR_TO_KEYWORDS.get(minor, [])
    
    # Combine keywords, prioritizing minor if available
    combined_keywords = minor_keywords + major_keywords if minor_keywords else major_keywords
    query = " ".join(set(combined_keywords))  # Remove duplicates
    
    job_results = search_jobs(query, location, results_per_page)
    
    # Format results for better usability
    formatted_results = [
        {
            "title": job.get("title", "N/A"),
            "location": job.get("location", {}).get("display_name", "N/A"),
            "company": job.get("company", {}).get("display_name", "N/A"),
            "description": job.get("description", "No description available"),
            "url": job.get("redirect_url", "#")
        }
        for job in job_results
    ]
    
    return formatted_results

def get_keywords_for_major(major):
    # Map majors to related keywords
    major_keywords_map = {
        "Computer Science": ["software", "developer", "programming", "engineer"],
        "Biology": ["research", "biologist", "biotech", "lab", "scientist"],
        "Business": ["management", "finance", "marketing", "consulting"],
        "Business Analytics": ["data analyst", "business intelligence", "analytics"],
        "Math": ["mathematician", "quantitative analyst", "actuary"],
        "Data Science": ["data scientist", "machine learning", "data engineer"],
        "Economics": ["economist", "financial analyst", "policy analyst"],
        "Statistics": ["statistician", "data analyst", "quantitative researcher"],
        "Spanish": ["translator", "interpreter", "language teacher"],
        "Physics": ["physicist", "research scientist", "engineer"],
        "Aerospace Engineering": ["aerospace", "engineer", "aviation"],
        "Agricultural and Biological Engineering": ["agricultural", "bioengineering", "engineer"],
        "Bioengineering": ["biomedical", "bioengineer", "medical device"],
        "Chemical Engineering": ["chemical", "process engineer", "petrochemical"],
        "Civil Engineering": ["civil", "structural engineer", "construction"],
        "Computer Engineering": ["hardware", "embedded systems", "engineer"],
        "Electrical Engineering": ["electrical", "circuit design", "power systems"],
        "Engineering Mechanics": ["mechanical", "structural analysis", "engineer"],
        "Engineering Physics": ["applied physics", "engineer", "research"],
        "Industrial Engineering": ["industrial", "operations", "supply chain"],
        "Materials Science and Engineering": ["materials", "metallurgy", "engineer"],
        "Mechanical Engineering": ["mechanical", "design engineer", "manufacturing"],
        "Nuclear, Plasma, and Radiological Engineering": ["nuclear", "radiological", "engineer"],
        "Systems Engineering and Design": ["systems", "design engineer", "integration"],
        "Engineering Undeclared": ["engineer", "general engineering"]
    }
    
    return major_keywords_map.get(major, [])  # Return empty list if major not found

# Example usage
if __name__ == "__main__":
    major = "Computer Science"
    minor = "Data Science"
    career_choices = get_career_choices_for_major_minor(major, minor)
    for job in career_choices:
        print(f"Title: {job['title']}")
        print(f"Location: {job['location']}")
        print(f"Company: {job['company']}")
        print(f"Description: {job['description'][:100]}...")  # Truncate for brevity
        print(f"URL: {job['url']}")
        print("-" * 50)
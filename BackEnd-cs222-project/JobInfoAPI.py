import math
import time
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

def search_jobs(keyword, location="gb", results_per_page=5, max_pages=10, start_page=1):
    base_url = f"https://api.adzuna.com/v1/api/jobs/{location}/search"
    params = {
        "app_id": "c2d89fa6",
        "app_key": "525d9055cfdd816aecad958df88e32ea",
        "results_per_page": results_per_page,
        "what": keyword,
    }
    jobs = []
    page = start_page
    total_pages = float('inf')  # Will be updated after first request

    while page <= max_pages:
        url = f"{base_url}/{page}"
        print(f"Sending Adzuna API request to URL: {url}, keyword: {keyword}, location: {location}, page: {page}/{total_pages if total_pages != float('inf') else 'unknown'}")
        try:
            response = requests.get(url, params=params)
            print(f"Adzuna API response status: {response.status_code}")
            if response.status_code == 429:
                print("Rate limit exceeded. Waiting before retrying...")
                time.sleep(60)  # Wait 60 seconds before retrying
                continue
            response.raise_for_status()
            data = response.json()
            print(f"Adzuna API response data: {data}")
            current_results = data.get("results", [])
            jobs.extend(current_results)

            # Calculate total pages after the first request
            if page == start_page:
                total_count = data.get("count", 0)
                total_pages = math.ceil(total_count / results_per_page)
                print(f"Total jobs: {total_count}, Total pages: {total_pages}")

            # Break if no more results or all pages fetched
            if not current_results or page >= total_pages:
                break

            page += 1
        except requests.RequestException as e:
            print(f"Error fetching jobs for page {page}: {e}")
            break

    next_page = page if jobs and page <= max_pages and page <= total_pages else None
    print(f"Fetched {len(jobs)} jobs for keyword '{keyword}'")
    return jobs, next_page, total_pages

def get_career_choices_for_major_minor(major, minor, location="gb", results_per_page=5, max_pages=10, jobs_per_batch=5, current_keyword_index=0, current_page=1):
    major_keywords = get_keywords_for_major(major)
    minor_keywords = MINOR_TO_KEYWORDS.get(minor, [])
    
    all_keywords = list(set(minor_keywords + major_keywords))
    if not all_keywords:
        all_keywords = [f"{major} jobs"]  # Fallback if no keywords are found

    print(f"All keywords to search: {all_keywords}")
    
    jobs = []
    seen_urls = set()  # To avoid duplicate jobs based on URL
    keyword_index = current_keyword_index
    page = current_page

    # Continue fetching until we have jobs_per_batch unique jobs or run out of keywords/pages
    while keyword_index < len(all_keywords) and len(jobs) < jobs_per_batch:
        keyword = all_keywords[keyword_index]
        keyword_jobs, next_page, total_pages = search_jobs(
            keyword, location, results_per_page, max_pages, page
        )

        # Format and deduplicate jobs
        for job in keyword_jobs:
            if len(jobs) >= jobs_per_batch:
                break
            job_url = job.get("redirect_url", "")
            if job_url and job_url not in seen_urls:
                seen_urls.add(job_url)
                jobs.append({
                    "title": job.get("title", "N/A"),
                    "location": job.get("location", {}).get("display_name", "N/A"),
                    "company": job.get("company", {}).get("display_name", "N/A"),
                    "description": job.get("description", "No description available"),
                    "url": job_url or f"https://www.adzuna.co.uk/search?what={keyword.replace(' ', '+')}"
                })

        # If no more pages for this keyword, move to the next keyword
        if next_page is None or page >= total_pages or page >= max_pages:
            keyword_index += 1
            page = 1
        else:
            page = next_page

    has_more = keyword_index < len(all_keywords) or (page is not None and page <= max_pages)

    return {
        "jobs": jobs,
        "next_keyword_index": keyword_index if has_more else None,
        "next_page": page,
        "has_more": has_more,
        "total_keywords": len(all_keywords)
    }

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
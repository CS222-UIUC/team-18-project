from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from . import JobInfoAPI

@csrf_exempt
def job_recommendations(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            major = data.get('major', '')
            minor = data.get('minor', '')
            current_keyword_index = int(data.get('current_keyword_index', 0))
            current_page = int(data.get('current_page', 1))

            if not major or not minor:
                return JsonResponse({'error': 'Major and minor are required'}, status=400)

            result = JobInfoAPI.get_career_choices_for_major_minor(
                major=major,
                minor=minor,
                location="gb",
                results_per_page=30,
                max_pages=50,
                jobs_per_batch=20,
                current_keyword_index=current_keyword_index,
                current_page=current_page
            )

            return JsonResponse(result)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


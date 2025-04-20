from rest_framework.test import APIRequestFactory
from rest_framework import status
from your_app.views import minor_progress  # update the import path!

def test_minor_progress_with_valid_classes():
    factory = APIRequestFactory()
    
    request = factory.post("/api/minor-progress", {
        "classes": [
            "CS 173", "STAT 100", "ECE 220", "CS 225", "MATH 241",
            "BADM 300", "BADM 310", "FIN 300", "ACCY 200", "STAT 400",
            "IS 101", "IS 203", "IS 204", "CS 105", "MATH 234"
        ]
    }, format="json")

    response = minor_progress(request)

    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.data, dict)
    assert len(response.data) == 10

    for minor, percentage in response.data.items():
        assert isinstance(minor, str)
        assert isinstance(percentage, float)
        assert 0.0 <= percentage <= 100.0

def test_minor_progress_empty_class_list():
    factory = APIRequestFactory()
    request = factory.post("/", {
        "classes": []
    }, format="json")
    response = minor_progress(request)
    assert response.status_code == status.HTTP_200_OK
    for percent in response.data.values():
        assert percent == 0.0


def test_minor_progress_all_classes_invalid():
    factory = APIRequestFactory()
    request = factory.post("/", {
        "classes": ["FOO 123", "BAR 999", "INVALID 000"]
    }, format="json")
    response = minor_progress(request)
    assert response.status_code == status.HTTP_200_OK
    for percent in response.data.values():
        assert percent == 0.0


def test_minor_progress_duplicate_classes():
    factory = APIRequestFactory()
    request = factory.post("/", {
        "classes": ["CS 173", "CS 173", "STAT 100", "STAT 100"]
    }, format="json")
    response = minor_progress(request)
    assert response.status_code == status.HTTP_200_OK
    for value in response.data.values():
        assert 0.0 <= value <= 100.0


def test_minor_progress_all_classes_match_multiple_minors():
    factory = APIRequestFactory()
    request = factory.post("/", {
        "classes": ["STAT 100", "CS 105", "CS 173", "MATH 234"]
    }, format="json")
    response = minor_progress(request)
    assert response.status_code == status.HTTP_200_OK
    for value in response.data.values():
        assert 0.0 <= value <= 100.0


def test_minor_progress_large_class_list():
    factory = APIRequestFactory()
    request = factory.post("/", {
        "classes": [f"CS {i}" for i in range(100)] + [f"MATH {i}" for i in range(100)]
    }, format="json")
    response = minor_progress(request)
    assert response.status_code == status.HTTP_200_OK
    for value in response.data.values():
        assert 0.0 <= value <= 100.0
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .resize import resize  

def home(request):
    return HttpResponse("Browser extension server")

@csrf_exempt  
def resize_image(request):
    if request.method == 'GET':
        try:
            link = request.GET.get('link')
            file_name = request.GET.get('file_name')
            if not link:
                return JsonResponse({"error": "No link provided :("}, status=400)
                    
            resize(link, file_name)
            return JsonResponse({"message": "Image resized successfully"}, status=200)
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only GET requests are supported for this endpoint"}, status=405)

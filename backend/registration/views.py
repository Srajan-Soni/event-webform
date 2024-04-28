
from django.http import JsonResponse
from django.core.exceptions import ValidationError
from .models import Registration
import json
from django.views.decorators.csrf import csrf_exempt
import uuid

@csrf_exempt
def create_registration(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
       
        try:
            validation(data)
        except ValidationError as e:
            return JsonResponse({'error': str(e)}, status=400)
        
       
        registration = Registration.objects.create(
            fullname=data['fullname'],
            email=data['email'],
            phone=data['phone'],
            event=data['event']
        )
        
        unique_id = str(uuid.uuid4())
        response_data = {
            'id': unique_id[:8],
            'fullname': registration.fullname,
            'email': registration.email,
            'phone': registration.phone,
            'event': registration.event
        }
        return JsonResponse(response_data, status=201)
    else:
        print('  /n/n/n  Get request /n _____')
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

def validation(data):
 
    required_fields = ['fullname', 'email', 'phone', 'event']
    for field in required_fields:
        if field not in data:
            raise ValidationError(f"Missing required field: {field}")
    
    
    from django.core.validators import validate_email
    validate_email(data['email'])

    if not data['phone'].isdigit() or len(data['phone']) != 10:
        raise ValidationError("Invalid phone number")

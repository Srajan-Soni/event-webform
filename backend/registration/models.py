

from django.db import models

class Registration(models.Model):
    fullname = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    event = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name

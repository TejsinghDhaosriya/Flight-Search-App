from django.db import models

# Create your models here.
class Flight(models.Model):
    number       = models.CharField(max_length = 250)
    departure_city  = models.CharField(max_length = 250)
    departure_time = models.IntegerField()
    arrival_city = models.CharField(max_length = 250)
    arrival_time= models.IntegerField()

    def __str__(self):
        return self.number 

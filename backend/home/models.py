from django.db import models
import uuid

class account(models.Model):
    
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name                = models.CharField(max_length=255)
    balance             = models.DecimalField(max_digits=8, decimal_places=2)


    def __str__(self):
        return self.name

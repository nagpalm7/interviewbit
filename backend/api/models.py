# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.core.validators import (
    RegexValidator
)


# Create your models here.

# Interviewer Model
class Interviewer(models.Model):
    name = models.CharField(max_length=200, unique=False)
    email = models.CharField(max_length=200, null=True, validators=[RegexValidator(
        regex='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', message='Email not valid')])

    def __str__(self):
        return self.name


# Interviewee Model
class Interviewee(models.Model):
    name = models.CharField(max_length=200, unique=False)
    email = models.CharField(max_length=200, null=True, validators=[RegexValidator(
        regex='^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', message='Email not valid')])

    def __str__(self):
        return self.name


# Interview Model
class Interview(models.Model):
    name = models.CharField(max_length=200, unique=False)
    interviewer = models.ForeignKey(Interviewer, on_delete=models.CASCADE,
                                    default=None, related_name='interviewer')
    interviewee = models.ForeignKey(Interviewee, on_delete=models.CASCADE,
                                    default=None, related_name='interviewee')
    start = models.DateTimeField(default=timezone.now)
    end = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

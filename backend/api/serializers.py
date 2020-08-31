from .models import *
from rest_framework import serializers


class InterviewerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interviewer
        fields = '__all__'


class IntervieweeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interviewee
        fields = '__all__'


class InterviewSerializer(serializers.ModelSerializer):
    interviewer = InterviewerSerializer()
    interviewee = IntervieweeSerializer()

    class Meta:
        model = Interview
        fields = '__all__'


class AddInterviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interview
        fields = '__all__'

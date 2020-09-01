# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.core.mail import send_mail, EmailMessage
from app.settings import EMAIL_HOST_USER
from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from datetime import datetime


# Create your views here.

# Interviewer Views for CRUD
class InterviewerList(APIView):
    def get(self, request, format=None):
        interviewers = Interviewer.objects.all().order_by('-pk')
        serializer = InterviewerSerializer(interviewers, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InterviewerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InterviewerDetail(APIView):
    def get_object(self, pk):
        try:
            return Interviewer.objects.get(pk=pk)
        except Interviewer.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        interviewer = self.get_object(pk)
        serializer = InterviewerSerializer(interviewer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interviewer = self.get_object(pk)
        serializer = InterviewerSerializer(interviewer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        interviewer = self.get_object(pk)
        interviewer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Interviewee Views for CRUD
class IntervieweeList(APIView):
    def get(self, request, format=None):
        interviewees = Interviewee.objects.all().order_by('-pk')
        serializer = IntervieweeSerializer(interviewees, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = IntervieweeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class IntervieweeDetail(APIView):
    def get_object(self, pk):
        try:
            return Interviewee.objects.get(pk=pk)
        except Interviewee.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        interviewer = self.get_object(pk)
        serializer = IntervieweeSerializer(interviewer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interviewee = self.get_object(pk)
        serializer = IntervieweeSerializer(interviewee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        interviewee = self.get_object(pk)
        interviewee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Interview Views for CRUD
class InterviewList(APIView):
    def get(self, request, format=None):
        interviews = Interview.objects.all().order_by('-id')
        serializer = InterviewSerializer(interviews, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        start = request.data['start']
        end = request.data['end']
        interviewer = request.data['interviewer']
        interviewee = request.data['interviewee']
        # Check whether slot is available or not for the interviewer
        interviews = Interview.objects.filter(interviewer__id=interviewer).filter(
            start__lte=end).filter(end__gte=start)

        if len(interviews):
            return Response({'errors': {'date': ['This time slot is already taken. Booked slots are:- '], }},
                            status=status.HTTP_400_BAD_REQUEST)
        serializer = AddInterviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            start = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S.%fZ")
            end = datetime.strptime(end, "%Y-%m-%dT%H:%M:%S.%fZ")
            subject = "Interview Schedule"
            content = """
            Respected Sir/Madam, <br>
            This is to inform that an interview has been scheduled from {} to {}
            """.format(start, end)
            interviewee_details = Interviewee.objects.get(pk=interviewee)
            interviewer_details = Interviewer.objects.get(pk=interviewer)
            email = [interviewer_details.email, interviewee_details.email]
            send_email(subject, content, email)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InterviewDetail(APIView):
    def get_object(self, pk):
        try:
            return Interview.objects.get(pk=pk)
        except Interview.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        interviewer = self.get_object(pk)
        serializer = InterviewSerializer(interviewer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interview = self.get_object(pk)
        serializer = AddInterviewSerializer(interview, data=request.data)
        start = request.data['start']
        end = request.data['end']
        interviewer = request.data['interviewer']
        interviewee = request.data['interviewee']
        # Check whether slot is available or not for the interviewer
        interviews = Interview.objects.filter(interviewer__id=interviewer).filter(
            start__lte=end).filter(end__gte=start).exclude(pk=pk)

        if len(interviews):
            return Response({'errors': {'date': ['This time slot is already taken. Booked slots are:- '], }},
                            status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            start = datetime.strptime(start, "%Y-%m-%dT%H:%M:%S.%fZ")
            end = datetime.strptime(end, "%Y-%m-%dT%H:%M:%S.%fZ")
            subject = "Interview Schedule Updated"
            content = """
            Respected Sir/Madam, <br>
            This is to inform that an interview has been scheduled from {} to {}
            """.format(start, end)
            interviewee_details = Interviewee.objects.get(pk=interviewee)
            interviewer_details = Interviewer.objects.get(pk=interviewer)
            email = [interviewer_details.email, interviewee_details.email]
            send_email(subject, content, email)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        interview = self.get_object(pk)
        interview.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Helper function to send email
def send_email(subject, content, recipient_list, path=None):
    email_from = EMAIL_HOST_USER
    mail = EmailMessage(subject, content, email_from, recipient_list)
    mail.content_subtype = 'html'
    if path:
        mail.attach_file(path)
    mail.send()

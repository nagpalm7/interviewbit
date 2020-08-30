# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from .serializers import *
from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404


# Create your views here.

# Interviewer Views for CRUD
class InterviewerList(APIView):
    def get(self, request, format=None):
        interviewers = Interviewer.objects.all().order_by('name')
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
        interviewees = Interviewee.objects.all().order_by('name')
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
        except Interviewer.DoesNotExist:
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
        interviews = Interview.objects.all().order_by('name')
        serializer = InterviewSerializer(interviews, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = InterviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InterviewDetail(APIView):
    def get_object(self, pk):
        try:
            return Interview.objects.get(pk=pk)
        except Interviewer.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        interviewer = self.get_object(pk)
        serializer = InterviewSerializer(interviewer)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interview = self.get_object(pk)
        serializer = InterviewSerializer(interview, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        interview = self.get_object(pk)
        interview.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

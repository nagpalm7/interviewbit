from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [

    # url for interviewer
    url(r'^interviewers/$',
        views.InterviewerList.as_view(),
        name='interviewer-list'),
    url(r'interviewers/(?P<pk>\d+)/$',
        views.InterviewerDetail.as_view(),
        name='interviewer-detail'),


    # url for interviewee
    url(r'interviewees/$',
        views.IntervieweeList.as_view(),
        name='interviewee-list'),
    url(r'interviewees/(?P<pk>\d+)/$',
        views.IntervieweeDetail.as_view(),
        name='interviewee-detail'),

    # url for interview
    url(r'interviews/$',
        views.InterviewList.as_view(),
        name='interview-list'),
    url(r'interviews/(?P<pk>\d+)/$',
        views.InterviewDetail.as_view(),
        name='interview-detail'),

]

urlpatterns = format_suffix_patterns(urlpatterns)

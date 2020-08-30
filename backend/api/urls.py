from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from api import views

urlpatterns = [

    # url for interviewer
    url(r'^interviewer/$',
        views.InterviewerList.as_view(),
        name='interviewer-list'),
    url(r'interviewer/(?P<pk>\d+)/$',
        views.InterviewerDetail.as_view(),
        name='interviewer-detail'),


    # url for interviewee
    url(r'interviewee/$',
        views.IntervieweeList.as_view(),
        name='interviewee-list'),
    url(r'interviewee/(?P<pk>\d+)/$',
        views.IntervieweeDetail.as_view(),
        name='interviewee-detail'),

    # url for interview
    url(r'interview/$',
        views.InterviewList.as_view(),
        name='interview-list'),
    url(r'interview/(?P<pk>\d+)/$',
        views.InterviewDetail.as_view(),
        name='interview-detail'),

]

urlpatterns = format_suffix_patterns(urlpatterns)

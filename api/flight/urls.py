
from django.urls import path
from . import views
urlpatterns = [
    path('',views.apiOverview,name="api-overview"), 
      path('flight-list',views.flightList,name="flight-list"), 
      path('flight-detail/<str:pk>/',views.flightDetail,name="flight-detail"),
      path('flight-create/',views.flightCreate,name="flight-create"), 
      path('flight-update/<str:pk>/',views.flightUpdate,name="flight-update"), 
      path('flight-delete/<str:pk>/',views.flightDelete,name="flight-delete"),
      path('flight-search/',views.flightSearch2,name="flight-search"), 
      
]

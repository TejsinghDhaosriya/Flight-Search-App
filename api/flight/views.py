from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import FlightSerializer
from django.core.exceptions import ObjectDoesNotExist
from .models import Flight

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls={
    'List':'/flight-list',
    'Detail View':'/flight-detail/<str:pk>/',
    'Create':'/flight-create/',
    'Update':'/flight-update/<str>:pk/',
    'Delete':'/flight-delete/<str>:pk>/',
    }
    return Response(api_urls)
@api_view(['GET'])
def flightList(request):
    tasks=Flight.objects.all()
    serializer = FlightSerializer(tasks,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def flightDetail(request,pk):
    tasks=Flight.objects.get(id=pk)
    serializer = FlightSerializer(tasks,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def flightCreate(request):
    
    try:
        flightInfo = Flight.objects.get(number=request.data.get("number"))
        # print(flightInfo)
        print("Either the blog or entry doesn't exist.")
        return Response('Error:Entry Already Exists ')
    except ObjectDoesNotExist:
        
        serializer = FlightSerializer(data=request.data)
        # print(request.data.get("number"))
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

        
    


@api_view(['PUT'])
def flightUpdate(request,pk):
    flight = Flight.objects.get(id=pk)
    serializer = FlightSerializer(instance= flight,data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def flightDelete (request,pk):
    flight = Flight.objects.get(id=pk)
    flight.delete() 

    return Response('Item successfully deleted ')

########################################Status Not Using ######################################################
##################### Shortest Path By Sorting  #############################
@api_view(['POST'])
def flightSearch(request):
    # tasks=Flight.objects.filter(departure_city=request.data.get("departure_city") , arrival_city=request.data.get("arrival_city"))
    # if len(tasks)>0:
    #     serializer = FlightSerializer(tasks,many=True)
    #     return Response(serializer.data)
    # else:
    #     return Response("Not Available Flight Plan")
    # print('Body datta............')
    # print(request.data)
    
    dt=request.data.get("departure_time") 
    # print(dt)
    # all_flight_info = Flight.objects.all()
    # print('-------eln--------',len(all_flight_info))
    all_flight_info = Flight.objects.filter(departure_time__gte=dt)
    # print('-------eln--------',len(all_flight_info2))
    # print(all_flight_info)
    # print(len(all_flight_info))
    # print(all_flight_info[0].number)

    import collections
    import heapq

    def shortestPath(edges, source, sink):
        # create a weighted DAG - {node:[(cost,neighbour), ...]}
        graph = collections.defaultdict(list)
        link=0;
        for l, r, c ,inp,fin in edges:
            graph[l].append((c,r,inp,fin))
        #print(graph)
        # create a priority queue and hash set to store visited nodes
    
        queue, visited = [(0, source,[],[],[])], [[],[]]
        heapq.heapify(queue)
        # traverse graph with BFS
        while queue:
            (cost, node, path,inp, fin) = heapq.heappop(queue)
            #print('cost :',cost,'node :',node,'path :',path,'in: ',inp,'fin: ',fin)
            # visited.append((source,graph[2]))
            # visit the node if it was not visited before
            
            # st =len(visited)
            # if st==0:
            #     s=0
            # else:
            #     s =visited[(len(visited)-1)][1][1]
                

            if node not in visited:# and s<=inp:
                visited.append((node,[inp,fin]))
                path = path + [node]
                # hit the sink
                if node == sink:
                    return (cost, path)
                # visit neighbours
                i=0
                for c, neighbour,inp,fin in graph[node]:
                    s =visited[(len(visited)-1)][1][1]
                    if type(s)==type([]):
                        s=0
                   
                    if neighbour not in visited and s<=inp:
                        heapq.heappush(queue, (cost+c, neighbour, path,inp,fin))
                        
        return str("No Flight Available")


    edges = []
    for element in all_flight_info:
        edges.append((element.departure_city,element.arrival_city,(element.arrival_time - element.departure_time),element.departure_time,element.arrival_time))
    # print(edges)

    dc=request.data.get("departure_city")    
    ac=request.data.get("arrival_city") 
    flight_data = shortestPath(edges,dc,ac)   
    # print(flight_data)
    route_cost =flight_data[0]
    route_data=flight_data[1]
    route_data_len = len(route_data)
    total_flights=[]
    for element in all_flight_info:
        total_flights.append((element.departure_city,element.arrival_city,(element.arrival_time - element.departure_time),element.departure_time,element.arrival_time,element.number))
        # print(total_flights)


    #sorting the array by 3 position element cost

    def sortSecond(val): 
        return val[2]  
    
    # list1 to demonstrate the use of sorting  
    # using using second key  
    list1 = total_flights
    # sorts the array in ascending according to  
    # second element 
    list1.sort(key = sortSecond)  
    # print('----------------')
    # print(list1) 
    final_output=[]
    arrival_cost =0
#     import time

# s = time.strftime("%a, %d %b %Y %H:%M:%S %Z", time.localtime(epoch_time))

    for i in range(1,route_data_len):
        
        for j in range(1,len(list1)+1):
            if route_data[i-1]==list1[j-1][0] and route_data[i]==list1[j-1][1]:
                final_output.append({'departure_city':route_data[i-1],
                                      'departure_time':list1[j-1][3],
                                      'arrival_city':route_data[i],
                                      'arrival_time':list1[j-1][4],
                                      'number':list1[j-1][5]
                                     })
                break

                 

        # print(i)

    #print(final_output)
    data = {
        'route_cost':route_cost ,
        'data': final_output
        
    }
    return Response(data)
############################################# Shortest Path By ID #############################
@api_view(['POST'])
def flightSearch2(request):
    
    dt=request.data.get("departure_time") 
    all_flight_info = Flight.objects.filter(departure_time__gte=dt)

    import collections
    import heapq
    check=[]
    def shortestPath(edges, source, sink):
        # create a weighted DAG - {node:[(cost,neighbour), ...]}
        graph = collections.defaultdict(list)
        link=0;
        for l, r, c ,inp,fin,unique_id in edges:
            graph[l].append((c,r,inp,fin,unique_id))
        #print(graph)
        # create a priority queue and hash set to store visited nodes
    
        queue, visited = [(0, source,[],[],[],[])], [[],[]]
        heapq.heapify(queue)
        
        # traverse graph with BFS
        while queue:
            (cost, node, path,inp, fin,unique_id) = heapq.heappop(queue)
            #print('cost :',cost,'node :',node,'path :',path,'in: ',inp,'fin: ',fin)
            # visited.append((source,graph[2]))
            # visit the node if it was not visited before
            
            # st =len(visited)
            # if st==0:
            #     s=0
            # else:
            #     s =visited[(len(visited)-1)][1][1]
                

            if node not in visited:# and s<=inp:
                visited.append((node,[inp,fin]))
                path = path + [node]
                check.append(unique_id) 
                print('Path is :  ',path)
                print('Path is :  ',check)
                # hit the sink
                if node == sink:
                    return (cost, path)
                # visit neighbours
                i=0
                for c, neighbour,inp,fin,unique_id in graph[node]:
                    s =visited[(len(visited)-1)][1][1]
                    if type(s)==type([]):
                        s=0
                   
                    if neighbour not in visited and s<=inp:
                        heapq.heappush(queue, (cost+c, neighbour, path,inp,fin,unique_id))
                        
        return str("No Flight Available")

    edges = []
    for element in all_flight_info:
        edges.append((element.departure_city,element.arrival_city,(element.arrival_time - element.departure_time),element.departure_time,element.arrival_time,element.id))
    # print(edges)

    dc=request.data.get("departure_city")    
    ac=request.data.get("arrival_city") 
    flight_data = shortestPath(edges,dc,ac)   
    # print(flight_data)
    route_cost =flight_data[0]
    route_data=flight_data[1]
    route_data_len = len(route_data)
    total_flights=[]
    for element in all_flight_info:
        total_flights.append((element.departure_city,element.arrival_city,(element.arrival_time - element.departure_time),element.departure_time,element.arrival_time,element.number))
        # print(total_flights)


    #sorting the array by 3 position element cost

    def sortSecond(val): 
        return val[2]  
    
    # list1 to demonstrate the use of sorting  
    # using using second key  
    list1 = total_flights
    # sorts the array in ascending according to  
    # second element 
    list1.sort(key = sortSecond)  
    # print('----------------')
    # print(list1) 
    final_output=[]
    arrival_cost =0

    for ids in range(1,len(check)):
        fR = Flight.objects.get(id=check[ids])
        final_output.append({'departure_city':fR.departure_city,
                                      'departure_time':fR.departure_time,
                                      'arrival_city':fR.arrival_city,
                                      'arrival_time':fR.arrival_time,
                                      'number':fR.number
                                     })        

    print(final_output)
    data = {
        'route_cost':route_cost ,
        'data': final_output
        
    }
    return Response(data)






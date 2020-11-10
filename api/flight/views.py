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

        
    


@api_view(['POST'])
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


@api_view(['POST'])
def flightSearch(request):
    # tasks=Flight.objects.filter(departure_city=request.data.get("departure_city") , arrival_city=request.data.get("arrival_city"))
    # if len(tasks)>0:
    #     serializer = FlightSerializer(tasks,many=True)
    #     return Response(serializer.data)
    # else:
    #     return Response("Not Available Flight Plan")
    all_flight_info = Flight.objects.all()
    print(all_flight_info)
    print(len(all_flight_info))
    print(all_flight_info[0].number)

    from collections import defaultdict

    class Graph():
        def __init__(self):
            """
            self.edges is a dict of all possible next nodes
            e.g. {'X': ['A', 'B', 'C', 'E'], ...}
            self.weights has all the weights between two nodes,
            with the two nodes as a tuple as the key
            e.g. {('X', 'A'): 7, ('X', 'B'): 2, ...}
            """
            self.edges = defaultdict(list)
            self.weights = {}
        
        def add_edge(self, from_node, to_node, weight):
            # Note: assumes edges are bi-directional
            self.edges[from_node].append(to_node)
            self.edges[to_node].append(from_node)
            self.weights[(from_node, to_node)] = weight
            self.weights[(to_node, from_node)] = weight
    graph = Graph()
    
    edges = []
    for element in all_flight_info:
        edges.append((element.departure_city,element.arrival_city,(element.departure_time - element.arrival_time)))
    print(edges)
    #     ('X', 'A', 7),
    #     ('X', 'B', 2),
    #     ('X', 'C', 3),
    #     ('X', 'E', 4),
    #     ('A', 'B', 3),
    #     ('A', 'D', 4),
    #     ('B', 'D', 4),
    #     ('B', 'H', 5),
    #     ('C', 'L', 2),
    #     ('D', 'F', 1),
    #     ('F', 'H', 3),
    #     ('G', 'H', 2),
    #     ('G', 'Y', 2),
    #     ('I', 'J', 6),
    #     ('I', 'K', 4),
    #     ('I', 'L', 4),
    #     ('J', 'L', 1),
    #     ('K', 'Y', 5),
    # ]

    for edge in edges:
        graph.add_edge(*edge)
        

    def dijsktra(graph, initial, end):
        # shortest paths is a dict of nodes
        # whose value is a tuple of (previous node, weight)
        shortest_paths = {initial: (None, 0)}
        current_node = initial
        visited = set()
        
        while current_node != end:
            visited.add(current_node)
            destinations = graph.edges[current_node]
            weight_to_current_node = shortest_paths[current_node][1]

            for next_node in destinations:
                weight = graph.weights[(current_node, next_node)] + weight_to_current_node
                if next_node not in shortest_paths:
                    shortest_paths[next_node] = (current_node, weight)
                else:
                    current_shortest_weight = shortest_paths[next_node][1]
                    if current_shortest_weight > weight:
                        shortest_paths[next_node] = (current_node, weight)
            
            next_destinations = {node: shortest_paths[node] for node in shortest_paths if node not in visited}
            if not next_destinations:
                return "Route Not Possible"
            # next node is the destination with the lowest weight
            current_node = min(next_destinations, key=lambda k: next_destinations[k][1])
        
        # Work back through destinations in shortest path
        path = []
        while current_node is not None:
            path.append(current_node)
            next_node = shortest_paths[current_node][0]
            current_node = next_node
        # Reverse path
        path = path[::-1]
        return path
        
        
        
    print(dijsktra(graph, 'Delhi', 'Sonkatch'))
    return Response("Hi")
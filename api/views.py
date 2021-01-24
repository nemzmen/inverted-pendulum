from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import NoiseModel
from .serializers import NoiseSerializer


class PostNoiseView(APIView):
    serializer_class = NoiseSerializer

    def post(self, request, format=None):
        variance = request.data.get('variance')
        test = request.data.get('test')

        queryset = NoiseModel.objects.all()
        if not queryset.exists():
            noise = NoiseModel(variance=variance, test=test)
            noise.save()
            return Response(NoiseSerializer(noise).data, status=status.HTTP_201_CREATED)

        noise = queryset[0]
        noise.variance = int(variance) + 3
        noise.test = test
        noise.save(update_fields=['variance', 'test'])
        return Response(NoiseSerializer(noise).data, status=status.HTTP_200_OK)


class GetNoiseView(APIView):
    serializer_class = NoiseSerializer

    def get(self, request, format=None):
        yyy = NoiseModel.objects.all()
        serializer = NoiseSerializer(yyy, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

        # queryset = Book.objects.filter(publisher__name='ACME Publishing')
        # room = Room.objects.filter(code=code)
        # queryset = Author.objects.all()
        # context['latest_articles'] = Article.objects.all()[:5]
        # # APIView
        # usernames = [user.username for user in User.objects.all()]


        # self.get_queryset().latest('publication_date')


        # serializer = self.serializer_class(data=request.data)
        # if serializer.is_valid():   
        #     guest_can_pause = serializer.data.get('guest_can_pause')


        # code = request.GET.get(self.lookup_url_kwarg)
        # if code != None:
        #     room = Room.objects.filter(code=code)
        #     if len(room) > 0:
        #         data = RoomSerializer(room[0]).data
        #         data['is_host'] = self.request.session.session_key == room[0].host
        #         return Response(data, status=status.HTTP_200_OK)
        #     return Response({'Room Not Found': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)

        # return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)



from django.shortcuts import render
from django.views import View
# Create your views here.


class Main(View):
    template = 'index.html'

    def get(self, request):
        return render(request, self.template)

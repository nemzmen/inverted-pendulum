# inverted-pendulum

----------------------------------------------------------
## INSTALACJA NARZĘDZI

https://git-scm.com/downloads (git)
https://code.visualstudio.com/ (vs code)

https://aimweb.pl/jak-zainstalowac-nodejs-i-npm/ (node + npm)
https://nodejs.org/en/
node -v
npm -v
Node

https://phoenixnap.com/kb/how-to-install-python-3-windows (python + pip)
https://www.python.org/downloads/
python -V
pip -V
Python

----------------------------------------------------------
## PROJEKT ZOSTAŁ ZAINICJOWANY W OPARCIU O SERIĘ KOMEND I ZMIAN

django-admin startproject project_name
cd project_name
django-admin startapp api
+- project_name/settings.py (added application)
+- project_name/urls.py (added api.urls)
python .\manage.py makemigrations
python .\manage.py migrate
python .\manage.py runserver
+- project_name/settings.py (added rest_framework)
++ api/urls.py, serializers.py...
django-admin startapp frontend
cd frontend
npm init -y
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm i @material-ui/core
npm i @babel/plugin-proposal-class-properties
npm i react-router-dom
npm i @material-ui/icons
npm i @material-ui/lab
+- project_name/settings.py (added application)
+- project_name/urls.py (added api.urls)
++ babel.config.json
++ webpack.config.js
+- frontend/package.json, urls.js, views.js, src, static, templates...
npm run dev
cd..
python .\manage.py runserver

----------------------------------------------------------
## DOSTĘP DO SERWERA W LOKALNEJ SIECI

uzyskai adres IPv4 hosta (ipconfig, ifconfig)
project_name/settings.py -> ALLOWED_HOSTS -> dodaj do tablicy np. '192.168.1.101'
python manage.py runserver 192.168.1.101:8000

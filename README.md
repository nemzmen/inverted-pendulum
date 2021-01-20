# inverted-pendulum

## INSTALACJA NARZĘDZI

https://git-scm.com/downloads (git) <br />
https://code.visualstudio.com/ (vs code) <br />

https://aimweb.pl/jak-zainstalowac-nodejs-i-npm/ (node + npm) <br />
https://nodejs.org/en/ <br />
node -v <br />
npm -v <br />
Node <br />

https://phoenixnap.com/kb/how-to-install-python-3-windows (python + pip) <br />
https://www.python.org/downloads/ <br />
python -V <br />
pip -V <br />
Python <br />

## PROJEKT ZOSTAŁ ZAINICJOWANY W OPARCIU O SERIĘ KOMEND I ZMIAN

django-admin startproject project_name <br />
cd project_name <br />
django-admin startapp api <br />
+- project_name/settings.py (added application) <br />
+- project_name/urls.py (added api.urls) <br />
python .\manage.py makemigrations <br />
python .\manage.py migrate <br />
python .\manage.py runserver <br />
+- project_name/settings.py (added rest_framework) <br />
++ api/urls.py, serializers.py... <br />
django-admin startapp frontend <br />
cd frontend <br />
npm init -y <br />
npm i webpack webpack-cli --save-dev <br />
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev <br />
npm i react react-dom --save-dev <br />
npm i @material-ui/core <br />
npm i @babel/plugin-proposal-class-properties <br />
npm i react-router-dom <br />
npm i @material-ui/icons <br />
npm i @material-ui/lab <br />
+- project_name/settings.py (added application) <br />
+- project_name/urls.py (added api.urls) <br />
++ babel.config.json <br />
++ webpack.config.js <br />
+- frontend/package.json, urls.js, views.js, src, static, templates... <br />
npm run dev <br />
cd.. <br />
python .\manage.py runserver <br />

## DOSTĘP DO SERWERA W LOKALNEJ SIECI

uzyskai adres IPv4 hosta (ipconfig, ifconfig) <br />
project_name/settings.py -> ALLOWED_HOSTS -> dodaj do tablicy np. '192.168.1.101' <br />
python manage.py runserver 192.168.1.101:8000 <br />

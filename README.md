# inverted-pendulum

### ODPALENIE PROJEKTU

##### 1) INSTALACJA NARZĘDZI GŁÓWNYCH (WINDOWS)

https://git-scm.com/downloads (git) <br />

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

##### 2) POBRANIE I SKONFIGUROWANIE PROJEKTU

git clone https://github.com/nemzmen/inverted-pendulum.git <br />

<b>w konsoli nr 1: (wymagane by wprowadzać zmiany w aplikacji frontend)</b> <br />
cd frontend <br />
npm install <br />
npm run dev (wymagane przy wprowadzaniu zmian w aplikacji frontend)<br />

<b>w konsoli nr 2: (uruchomienie serwera)</b> <br />
python .\manage.py makemigrations <br />
python .\manage.py migrate <br />
python .\manage.py runserver <br />

pod adresem http://127.0.0.1:8000/ będzie dostępna główna strona projektu
wprowadzając zmiany w aplikacji frontend może być konieczne odświeżenie strony wraz z usunięciem cache (ctrl + F5)

### PROJEKT ZOSTAŁ ZAINICJOWANY POPRZEZ NASTĘPUJĄCE KOMENDY I ZMIANY (WINDOWS)

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
pip install numpy <br />

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
npm i recharts <br />
+- project_name/settings.py (added application) <br />
+- project_name/urls.py (added api.urls) <br />
++ babel.config.json <br />
++ webpack.config.js <br />
+- frontend/package.json, urls.js, views.js, src, static, templates... <br />
npm run dev <br />

cd.. <br />
python .\manage.py runserver <br />

### DOSTĘP DO SERWERA W LOKALNEJ SIECI

uzyskai adres IPv4 hosta (ipconfig, ifconfig) <br />
project_name/settings.py -> ALLOWED_HOSTS -> dodaj do tablicy np. '192.168.1.101' <br />
python manage.py runserver 192.168.1.101:8000 <br />
zmień adres w frontend/src/api/urls <br />

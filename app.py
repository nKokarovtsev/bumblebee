import json
from flask import Flask, request, render_template,send_file, abort
from sqlalchemy import create_engine, insert, text, URL
#import pandas as pd
#from io import BytesIO
import psycopg2
from psycopg2.extras import Json
from datetime import datetime, timedelta


app = Flask(__name__)

@app.route('/', methods = ["GET","POST"])
def index():

    timeless = request.form.get('left') #берём его тёпленького (из формы)
    if timeless:
        timeless = datetime.fromisoformat(timeless) #если есть, форматируется в datetime объект
    else:                                           #если нет, то задаём стандартные
        timeless = datetime.now()-timedelta(weeks=1)#+timedelta(hours=5) #левая граница по дефолту минус неделя от текущего времени
        timeless.isoformat()                        #форматирование в понятный для HTML формат
    timenow = request.form.get('right') #аналогично с правой
    if timenow:
        timenow = datetime.fromisoformat(timenow)
    else:
        timenow = datetime.now()#+timedelta(hours=5) #часовой пояс UTC+5
        timenow.isoformat()

    try:
        url = URL.create( #пробуем установить конект с базой данных
            drivername = "postgresql", 
            username = "postgres",
            password = "3005",
            host = "localhost",
            port = "5432",
            database = 'ESP8266'
            )

        engine = create_engine(url)
    except:
        abort(503)
    try:

        with engine.connect() as connection: #выборка по заданным либо стандартным временным границам
            res = connection.execute(text(f"SELECT * FROM public.bigblackesp WHERE timemes BETWEEN '{timeless}' AND '{timenow}' ORDER BY id ASC"))
            data = res.mappings().all()
            connection.commit()
        idk = []
        tim = []
        temp = []
        hum = []
        co = []
        mass = []
        flewin = []
        flewout = []
        delux = []
        mic = []
        
        for column in data:
            idk.append(int(column["idcode"]))
            tim.append(str(column["timemes"])[:-7]) #time
            temp.append(column["temperature"])
            hum.append(column["humidity"])
            co.append(column["co2"])
            mass.append(column["mass"])
            flewin.append(column["flewin"])
            flewout.append(column["flewout"])
            delux.append(round(abs(column["luxin"]-column["luxout"]),2))
            mic.append(round(float(column["micro"]["Micro"]),2))

    except:
        abort(503) #если Postgres сервер недоступен, ошибка 503

    data = {
        'categories': tim,#['2015', '2015', '2016', '2016', '2017', '2017', '2018', '2018', '2019', '2019', '2020', '2020', '2021', '2021', '2022', '2022', '2023', '2023'],
        'idcode':idk,
        'temperature': temp,#[1, 12, 2, 3, 20, 5, 7, 2, 10, -15, 23, 33, 20, 16, 18, 14, 18],
        'humidity': hum,#[8, 10, 12, 14, 16, 30, 20, 40, 45, 50, 60, 65, 70, 63, 56, 47, 40],
        'co2':co,#[70, 85, 90, 92, 34, 110, 150, 200, 210, 260, 300, 345, 370, 380, 400, 410, 385],
        'mass':mass,#[1, 12, 2, 3, 20, 5, 7, 2, 10, -15, 23, 33, 20, 16, 18, 14, 18],
        'flewin': flewin,#[8, 10, 12, 14, 16, 30, 20, 40, 45, 50, 60, 65, 70, 63, 56, 47, 40],
        'flewout': flewout,
        'deLux':delux,#[70, 85, 90, 92, 34, 110, 150, 200, 210, 260, 300, 345, 370, 380, 400, 410, 385],
        'micrococ':mic#[1, 12, 2, 3, 20, 5, 7, 2, 10, -15, 23, 33, 20, 16, 18, 14, 18]
    }

    if engine:
        engine.dispose()
        
    return render_template('base.html', data=data, timenow = timenow, timeless = timeless)

@app.route('/form', methods = ['GET','POST'])
def create():
    if request.method == 'POST':
        try:
            if "application/json" in request.headers["Content-Type"]:
                data = json.loads(request.data)
                #ID = data['id']
                print(data)
                dots = 0
                correct = True
                for symb in str((data['Micro'])).replace("'", ""):
                    if not (symb.isdigit()):
                        if (symb == '.'):
                            dots += 1
                        if (symb != '.' or dots >1):
                            correct = False
                if (correct == True):                    
                    Temperature = float(data['temperature'])
                    Humidity = float(data['humidity'])
                    IdCode = int(data['IdCode'])
                    Mass = float(data['Massa'])
                    Flewin = 15
                    Flewout = 25
                    CO2 = float(data['co2'])
                    LUXIN = float(data['luxin'])
                    LUXOUT = 120
                    Micro = {"Micro": float(data['Micro'])}
            elif "application/x-www-urlencoded" in request.headers["Content-Type"]:
                #ID: str = request.args.get("id")
                Temperature : float = request.args.get("temperature")
                Humidity : float = request.args.get("humidity")
                TOWESP : str = request.args.get("TOWESP")
                Mass : float = request.args.get("Mass")
    #отправка в форму с браузера
            else:
                #ID: str = request.form.get("ID")
                Temperature: float = request.form.get("Temperature")
                Humidity: float = request.form.get("Humidity")
                TOWESP: str = request.form.get("TOWESP")
                Mass: float = request.form.get("Mass")
        except:
            abort(400)

        #cur = con.execute()
        #cur.execute(

        try:
            url = URL.create(
            drivername = "postgresql", 
            username = "postgres",
            password = "3005",
            host = "localhost",
            port = "5432",
            database = 'ESP8266'
            )

            engine = create_engine(url)
        except:
            abort(503)

        with engine.connect() as conn:
            conn.execute(
                text("""INSERT INTO BigBlackESP(IdCode, Temperature, Humidity, Mass, Flewin, Flewout, CO2, LUXIN, LUXOUT, Micro)
                     VALUES (:IdCode, :Temperature, :Humidity, :Mass, :Flewin, :Flewout, :CO2, :LUXIN, :LUXOUT, :Micro)"""),
                     [{"IdCode": int(IdCode),"Temperature": float(Temperature),"Humidity": float(Humidity), "Mass": float(Mass), "Flewin": int(Flewin), 
                     "Flewout": int(Flewout), "CO2": float(CO2), "LUXIN": float(LUXIN), "LUXOUT": float(LUXOUT), "Micro": Json(Micro)}]
            )
            conn.commit()            
        engine.dispose()
        return 'Успешно отправлено...', 201
    else:
        return render_template('form.html')

if __name__=='__main__':
    app.run(debug = True, host = "0.0.0.0", port=8000)
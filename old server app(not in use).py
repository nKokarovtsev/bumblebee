import json
from flask import Flask, request, render_template,send_file
from sqlalchemy import create_engine, insert, text
import pandas as pd
from io import BytesIO

Server = 'DESKTOP-UC40KBF\SQLEXPRESS'
Database ='ESP8266Database'
Driver = 'ODBC Driver 17 for SQL Server'
Database_Con = f'mssql://@{Server}/{Database}?driver={Driver}'

engine = create_engine(Database_Con)
#conn = engine.connect()

#df=pd.read_sql_query("Select * from [dbo].[BigBlackESP]",conn)
#df


app = Flask(__name__)

@app.route("/",methods = ['GET', 'POST'])
def Welcome():
    return render_template('../templates/base.html')

@app.route("/Excel",methods = ['GET', 'POST'])
def Excel(): #Сохранение в данных из БД в Таблицу
    if request.method == 'GET':
        sql_df = pd.read_sql("SELECT * FROM BigBlackESP", con=engine)

        output = BytesIO()
        writer = pd.ExcelWriter(output, engine ='xlsxwriter')

        sql_df.to_excel(writer, startrow = 0, merge_cells = False, sheet_name = "Sheet_1")
        workbook = writer.book
        worksheet = writer.sheets["Sheet_1"]
        format = workbook.add_format()
        format.set_bg_color('#eeeeee')
        worksheet.set_column(0,9,28)

        writer.close()

        output.seek(0)

        return send_file(output, download_name="text.xlsx", as_attachment = True,mimetype = 'application/xlsx')

@app.route('/login',methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        return  f'Вы вошли в систему...но зачем? ' + str(type(username))

@app.route('/create', methods = ['GET','POST'])
def create():
    if request.method == 'POST':
        if "application/json" in request.headers["Content-Type"]:
            data = json.loads(request.data)
            #ID = data['id']
            Temperature = data['temperature']
            Humidity = data['humidity']
            TOWESP = data['TOWESP']
            Mass = data['Mass']
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

        #cur = con.execute()
        #cur.execute(

        with engine.connect() as conn:
            conn.execute(
                text("INSERT INTO BigBlackESP (Temperature,Humidity,TOWESP,Mass) VALUES (:Temperature, :Humidity, :TOWESP, :Mass)"),
                     [{"Temperature": float(Temperature),"Humidity": float(Humidity), "TOWESP": str(TOWESP), "Mass": float(Mass)}]
            )
            conn.commit()
        return 'Успешно отправлено...'
    else:
        return render_template('create.html')

if __name__ == "__main__":
    app.run(port = 8000, debug = True, host = "0.0.0.0", threaded=True)





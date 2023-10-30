import json
from flask import Flask, request, render_template,send_file, abort
from sqlalchemy import create_engine, insert, text, URL
import pandas as pd
from io import BytesIO
import psycopg2
from datetime import datetime, timedelta
date = datetime.now()
date = date.__add__(timedelta(hours=5))
print(date)
date2 = date.__sub__(timedelta(weeks=1))
print(date2)

url = URL.create(
    drivername = "postgresql", 
    username = "postgres",
    password = "3005",
    host = "localhost",
    port = "5432",
    database = 'ESP8266'
)

engine = create_engine(url)

with engine.connect() as connection: 
    res = connection.execute(text(f"SELECT * FROM public.bigblackesp WHERE timemes BETWEEN '{date2}' AND '{date}' ORDER BY id ASC"))
    data = res.mappings().all()
    connection.commit()
    print(data)
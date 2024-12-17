# create a network request
import urllib.request
import time

Errorurl = "http://localhost:3000/error"
WarnUrl = "http://localhost:3000/warn"
count = 0
while True:
    time.sleep(4)
    urllib.request.urlopen(WarnUrl,None)
    count += 1
    print(count)
    try:
        urllib.request.urlopen(Errorurl,None)
    except Exception as e:
        print(e.__repr__())
    if count > 150:
        break
   

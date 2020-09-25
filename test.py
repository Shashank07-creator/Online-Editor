import sys

def cool(x,y):
    print('<h1>If you are seeing this then you have reached Python Script with values :</h1>',x,y)


x,y = sys.argv[1],sys.argv[2]
cool(x,y)
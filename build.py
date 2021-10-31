#!/usr/bin/python

import re
import os

base = "main.js"
output = "bulkCodes.user.js"

def inject(target,token):
    pattern = re.compile(r'\s{2,}|</*himehowareu>')
    filename = re.sub(pattern,"",token)
    with open(filename,"r") as fileh:
        thing = fileh.read()
        thing = thing.replace("\n","").replace("\'","\"")
        thing = re.sub(pattern, '', thing)
        target = target.replace(token,thing)
        return target

with open(output,"w") as outF:
    with open(base,"r") as baseF:
        out = baseF.read()
        temp = out
        pat = re.compile(r'<himehowareu>.*<\/himehowareu>')
        for file in re.findall(pat,out):
            temp = inject(temp,file)
        outF.write(temp)

os.system('cls' if os.name == 'nt' else 'clear')

b=os.system('cls' if os.name == 'nt' else 'clear')
out = os.system("jshint javascript")
out += os.system("jshint "+output)
if out == 0:
    print("compiled plugin")
else:
    print("error")

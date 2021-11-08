#!/usr/bin/python

import re
import os
import sys
from pkg_resources import parse_version as V


base = "main.js"
output = "bulkCodes.user.js"

lint = False
upload = False

def run(command):
    out = 0
    if os.name == 'nt':
        out = os.system(command + ' 2> nul' )
    else:
        out = os.system(command + ' >/dev/nul')
    return out


def inject(target,token):
    pattern = re.compile(r'\s{2,}|</*himehowareu>')
    filename = re.sub(pattern,"",token)
    with open(filename,"r") as fileh:
        thing = fileh.read()
        thing = thing.replace("\n","").replace("\'","\"")
        thing = re.sub(pattern, '', thing)
        target = target.replace(token,thing)
        return target

if len(sys.argv) >=2:
    jshint = run("jshint -v")

    if "lint" in sys.argv:
        if jshint == 1:
            print("jshint is not installed can not lint files")
        else:
            lint =True

    if "dist" in sys.argv:
        if not jshint:
            lint=True
        with open('version.txt') as f:
            current = V(f.read())
        print("current version is " + str(current))
        new = V(input("new version number ? "))
        if new > current:
            with open("version.txt","w") as f:
                f.write(str(new))
        else:
            while new < current:
                print("current version is " + str(current))
                new = V(input("new version number ? "))
                if new > current:
                    with open("version.txt","w") as f:
                        f.write(str(new))
        upload = True

with open(output,"w") as outF:
    with open(base,"r") as baseF:
        out = baseF.read()
        temp = out
        pat = re.compile(r'<himehowareu>.*<\/himehowareu>')
        for file in re.findall(pat,out):
            temp = inject(temp,file)
        outF.write(temp)

if lint: 
        out = os.system("jshint javascript")
        out += os.system("jshint "+output)
        if out != 0:
            print("Error in plugin")
            exit()
        else:
            print("Plugin compiled without error")

if upload:
    git = run("git --version")
    if not git:
        a = run("git add -A")
        a+= run("git commit -am \""+input("commit message: ")+"\"")
        a+= run("git push 2")
        if a:
            print("error while pushing to git")
    else:
        print("git is not found , can not upload plugin")

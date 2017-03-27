import sys

def toValue(value):
    try:
        number = float(value)
        return number
    except:
        return value

def isNumber(value):
    try:
        float(value)
        return True
    except:
        return False

inputFileName = sys.argv[1]
outputFileName = sys.argv[2]
skip = []
if len(sys.argv) > 2:
    for i in range(3, len(sys.argv)):
        skip.append(int(sys.argv[i]))

skip = sorted(skip, reverse=True)
csv = open(inputFileName)
output = open(outputFileName, "w+")
rows = []
attributeNames = []
data = []
for line in csv:
    rows.append(line)
    # output.write(line+"\n")
attributeNames = rows[0].strip().split(',')
for element in skip:
    del attributeNames[element]

for line in range(1, len(rows)):
    entry = rows[line].strip().split(',')
    data.append(entry)

for entry in data:
    for element in skip:
        del entry[element]

output.write("@RELATION movies\n\n")

for i in range(0, len(data[0])):
    if isNumber(data[0][i]):
        attributeDeclaration = "@attribute " + attributeNames[i] + "\tREAL\n"
        output.write(attributeDeclaration)
    else:
        attributeDeclaration = "@attribute " + attributeNames[i] + "\t{"
        nominals = []
        for j in range(0, len(data)):
            if data[j][i] not in nominals:
                print("adding " + data[j][i])
                nominals.append(data[j][i])
        attributeDeclaration = attributeDeclaration + nominals[0]
        for index in range(1, len(nominals)):
            attributeDeclaration = attributeDeclaration + "," + nominals[index]
        attributeDeclaration = attributeDeclaration + "}\n"
        output.write(attributeDeclaration)

output.write("\n")

for entry in data:
    line = toValue(entry[0])
    for i in range(1,len(entry)):
        line = line + "," + entry[i]
    output.write(line + "\n")



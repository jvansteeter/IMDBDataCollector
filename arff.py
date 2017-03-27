csv = open("data.csv")
output = open("data.arff", "w+")
data = []
attributeNames = []
for line in csv:
    data.append(line)
    output.write(line+"\n")
attributeNames = data[0].strip().split(',')
print(attributeNames)

output.write("@RELATION movies\n")
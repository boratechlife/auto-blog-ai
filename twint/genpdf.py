import pandas as pd
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle

with open("amerix-good.txt", "r") as file:
    tweets = file.read()
    
tweets = tweets.split("\n")  # split tweets by new line
tweets_list = []
for tweet in tweets:
    tweets_list.append(tweet)
df = pd.DataFrame(tweets_list,columns = ["tweet"])

doc = SimpleDocTemplate("amerix-good.pdf", pagesize=landscape(letter))
data = [df.columns.tolist()] + df.values.tolist()
table = Table(data)
table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
    ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
    ('BACKGROUND', (0, -1), (-1, -1), colors.beige),
    ('GRID', (0, 0), (-1, -1), 1, colors.black)
]))
doc.build([table])

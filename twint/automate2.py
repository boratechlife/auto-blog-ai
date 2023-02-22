import twint
import schedule
import time
import os

def search_tweets(username):
    # Configure
    c = twint.Config()
    c.Username = username
    c.Output = f"cache/{username}.txt"
    c.Search = ""
    # Run
    twint.run.Search(c)
    

# you can change the name of each "job" after "def" if you'd like.
def jobone():
    os.system("node nodejs")
    print ("OS Tweets!")

def jobtwo():
    # Configure
    c = twint.Config()
    c.Username = "amerix"
    c.Since = "2019-01-01"
    # set limit on total tweets
    c.Limit = 10000
    c.Search = ""

    # Run
    twint.run.Search(c)
	

# run once when you start the program

# jobone()
# jobtwo()
# usernames = ["48_quotes"]
# Read usernames from the file "usernames.txt"
with open("usernames.txt", "r") as f:
    usernames = f.readlines()

# Strip newline characters from the usernames
usernames = [username.strip() for username in usernames]

for username in usernames:
    search_tweets(username)
   


# run every minute(s), hour, day at, day of the week, day of the week and time. Use "#" to block out which ones you don't want to use.  Remove it to active. Also, replace "jobone" and "jobtwo" with your new function names (if applicable)

# schedule.every(1).minutes.do(jobone)
schedule.every().hour.do(jobone)
# schedule.every().day.at("10:30").do(jobone)
# schedule.every().monday.do(jobone)
# schedule.every().wednesday.at("13:15").do(jobone)

# schedule.every(1).minutes.do(jobtwo)
schedule.every().hour.do(jobtwo)
# schedule.every().day.at("10:30").do(jobtwo)
# schedule.every().monday.do(jobtwo)
# schedule.every().wednesday.at("13:15").do(jobtwo)

while True:
  schedule.run_pending()
  time.sleep(1)

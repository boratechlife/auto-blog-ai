import re
import nltk


with open('amerix.txt', 'r') as f:
  tweets = f.readlines()
  print(tweets)

filtered_tweets = []

for tweet in tweets:
  if len(tweet) > 20:
    filtered_tweets.append(tweet)
    print(filtered_tweets)


processed_tweets = []

for tweet in filtered_tweets:
  tweet = nltk.word_tokenize(tweet)
  tweet = [word for word in tweet if word not in nltk.corpus.stopwords.words('english')]
  tweet = [nltk.stem.PorterStemmer().stem(word) for word in tweet]
  processed_tweets.append(tweet)


with open('processed_tweets.txt', 'w') as f:
  for tweet in processed_tweets:
    f.write(' '.join(tweet) + '\n')

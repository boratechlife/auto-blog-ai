import nltk

# Download the required data files
nltk.download('punkt')
nltk.download('stopwords')

# Specify the path to the data files
nltk.data.path.append('/admin/twint/nltk_data')

# Download the data files again, forcing them to be re-installed
nltk.download('punkt', force=True)
nltk.download('stopwords', force=True)

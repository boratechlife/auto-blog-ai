import twint

# Configure
c = twint.Config()
c.Username = "amerix"
c.Search = ""

# Run
twint.run.Search(c)
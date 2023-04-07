import pandas as pd
import pysolr  # can only support up to python 3.7
from datetime import datetime

# Read from csv file
csv_data = pd.read_csv("combined.csv")

def convert_to_utc(datetime_str):
    datetime_obj = datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")

    return datetime_obj.strftime("%Y-%m-%dT%H:%M:%SZ")

csv_data["date"] = csv_data["date"].apply(convert_to_utc)

# Restructure raw data for indexing
data = [{"id": i,  # id for solr (starts from 0)
         "platform_id": row["platform_id"],
         "date": row["date"],
         "text": row["text"],
         "cleaned_text": row["cleaned_text"],
         "title": row["title"],
         "post_text": row["post_text"],
         "subreddit": row["subreddit"],
         "author": row["author"],
         "upvote_ratio": row["upvote_ratio"],
         "net_upvotes": row["score"],
         "retweet_count": row["retweet_count"],
         "like_count": row["like_count"],
         "url": row["url"],
         "link": row["link"],
         "num_comments": row["num_comments"],
         "tags": row["tags"],
         "source": row["source"],
         "subjectivity": row["subjectivity"],
         "sentiment": row["sentiment"]
         } for i, row in csv_data.iterrows()]  

# Index and add data to solr core "elonsearch"
solr = pysolr.Solr("http://localhost:8983/solr/elonsearch", always_commit=True)
print("Add data to Solr:")
print(solr.add(data))  # uncomment to add

# Test indexed data
query = "capitalist"
query_search = f"text: {query}"
fl_search = "id,text"

search_results = solr.search(query_search, **{
    "fl": fl_search
}, rows=10)

for result in search_results:
    print(result["id"], result["text"])
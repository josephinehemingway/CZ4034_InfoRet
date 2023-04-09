# SOLR Server (Backend)

This folder contains the configuration files and codes for the Solr indexing system used in our information retrieval system.

## Starting the server
Navigate to the `solr-9.2.0` folder and start the Solr server. The `elonsearch` core was used for the search engine.
```
$ cd solr-7.7.3/
$ ./bin/solr start
```

## How to index the dataset
The combined dataset from Reddit and Twitter has already been indexed in Solr.
Follow the steps below to re-index the dataset or add new data:

1. Install necessary dependencies
```
$ pip install -r requirements.txt
```

2. Insert the new data in the `combined_final.csv` file

3. Run the Python script to index the new data in Solr
```
$ python solr_add_combined_data.py
```

## Stopping the server
Navigate to the `solr-9.2.0` folder and stop the Solr server
```
$ cd solr-7.7.3/
$ ./bin/solr stop
```
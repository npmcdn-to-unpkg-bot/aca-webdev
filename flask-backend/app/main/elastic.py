from elasticsearch import Elasticsearch
from elasticsearch_dsl import Search

def get_best_plans(query):
    client = Elasticsearch()
    s = Search(using=client, index="data", doc_type="plan")\
        .query("match", marketing_name=query)
    response = s.execute()
    return response

#! /usr/bin/env python
from elasticsearch import Elasticsearch
import json
import sys


def run():
    input_file = sys.argv[1]
    es = Elasticsearch()
    total = load_plans(input_file, es)
    print "Finished processing {} plans.".format(total)

def load_plans(input_file, es):
    print "Processing {0}".format(input_file)
    plan_list = json.load(open(input_file))
    count = 0
    for plan in plan_list:
        es.index(index='data', doc_type='plan', body=plan)
        count += 1
    return count

if __name__ == '__main__':
    run()

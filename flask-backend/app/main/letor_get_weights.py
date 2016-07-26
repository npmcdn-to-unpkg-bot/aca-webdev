from io import BytesIO
from letor_online import letor_online
import pickle
import requests

def get_weights(state, query):
    url = "https://s3.amazonaws.com/w210.data/online/%s_runtime.pickle" % state
    r = requests.get(url)
    try:
        qc, c = pickle.load(BytesIO(r.content))
        letor = letor_online(qc, c)
        return letor.get_rank_weight(query) or 0
    except:
        return 0

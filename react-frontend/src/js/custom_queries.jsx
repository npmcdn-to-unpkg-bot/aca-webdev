export const providerInputQuery = (query, options) => {
	return {
		"nested": {
	      "path": "providers",
	      "query": {
	        "match": {
	            "providers.provider_name": query
	        }
	      },
	      "inner_hits": {
          "from": 0,
          "size": 5
	      }
		}
	}
}

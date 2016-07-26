export const providerInputQuery = (query, options) => {
	return {
		"nested": {
	      "path": "providers",
	      "query": {
          "filtered": {
            "filter": {
              "match": {
                  "providers.provider_name": query
              }
            }
          }
	      },
	      "inner_hits": {
          "from": 0,
          "size": 3
	      }
		}
	}
}

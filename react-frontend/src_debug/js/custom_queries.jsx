export const providerInputQuery = (query, options) => {
	return {
		"query": {
    "nested": {
        "path": "providers",
        "query": {
        	"match": {
						"providers.name": {
                "type": "phrase_prefix",
                "query": query.toLowerCase(),
                "max_expansions": 50,
								"slop": 10
        		}
					}
				}
			}
		}
	}
}

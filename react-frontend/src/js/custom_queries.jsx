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
					"size": 3
				}
		}
	}
}

// export const filterPremium = (field) => {
// 	return {
// 			"nested": {
// 				"path": "premiums",
// 				"query": {
// 						"filtered": {
// 								"query": {
// 										"match_all": {}
// 								},
// 								"filter": {
// 										"exists": { "field": field }
// 								}
// 						}
// 				}
// 			}
// 	}
// }

import $ from "jquery";

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

export const generateRescore = (query_weights) => {
	const rescore_function_array = $.map(query_weights,
		function(weight, i) {
			return {
				"field_value_factor": {
					"field": "plan_rank_" + (i).toString(),
					"factor": weight
				}
			}
		}
	)
	const rescore_query = {
		 "window_size" : 20,
		 "query" : {
			"score_mode": "multiply",
			"rescore_query" : {
				"function_score": {
					"boost_mode": "multiply",
						 "score_mode": "sum",
						 "functions": rescore_function_array
				}
			}
		}
	}
	return rescore_query
}

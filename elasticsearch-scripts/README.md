# Elasticsearch Scripts

### Proposed Mapping for Plans
(each Document is a plan)

| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| PlanId | 1 | use as _id | None |
| Plan Name | 1 | string-analyzed | None |
| Issuer | 1 | string-analyzed, raw-string-not_analyzed | None |
| State  | 1 | string-not_analyzed | None |
| Plan Type | 1 | string-analyzed, raw-string-not_analyzed | None |
| Metal Level | 1 | string-analyzed, raw-string-not_analyzed | None |
| Plan Brochure URL  | 1 | string-no_index | None |
| Drugs Covered | 4 | string-analyzed, raw-string-not_analyzed | Array format
| Providers | 5 | nested (below) | could be an array of names to avoid nested mapping |
| Medical Conditions | 6 | string-analyzed, raw-string-not_analyzed | Array format; plan that covers 80% of drugs? |
| Logo URL  | 7 | string-no_index | None |
| Premiums_median | 8 | float | None |
| Premiums_q1 | 8 | float-no_index | None |
| Premiums_q3 | 8 | float-no_index | None |
| Plan Ranks | 9 | float | Array format; for letor calculations |

#### Providers Nested Attributes (Optional)
| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| Full name | 5 | string-analyzed | combine first/last name |

#### Sources
1. plan-attributes-puf.csv
2. benefits-and-cost-sharing-puf.csv
3. Rate_PUF.csv
4. Drugs (JSON)
5. Providers (JSON)
6. Medical condition - drugs map
7. issuers_logos.csv
8. premiums_aggregated.csv
9. letor data from Lei

#### Sample Mapping


    {
      "plans" : {        
        "mappings" : {
          "plan" : {
            "properties" : {
              "conditions" : {
                "type": "string",
                "fields": {
                  "raw": {
                    "type": "string",
                    "index": "not_analyzed"
                  }
                }
              },
              "drugs" : {                
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }                                  
              },
              "issuer" : {
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              },
              "level" : {
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              },
              "logo_url" : {
                "type" : "string",
                "index" : "no"
              },
              "plan_name" : {
                "type" : "string"
              },
              "plan_ranks" : {
                "type" : "float"                
              },
              "plan_type" : {
                "type" : "string",
                "fields" : {
                  "raw" : {
                    "type" : "string",
                    "index" : "not_analyzed"
                  }
                }
              },
              "premiums_median" : {
                "type" : "float"
              },
              "premiums_q1" : {
                "type" : "float",
                "index" : "no"
              },
              "premiums_q3" : {
                "type" : "float",
                "index" : "no"
              },
              "providers" : {
                "type" : "nested",
                "properties" : {                  
                  "provider_name" : {
                    "type" : "string"                  
                  }                  
                }
              },
              "state" : {
                "type" : "string",
                "index" : "not_analyzed"
              },
              "url" : {
                "type" : "string",
                "index" : "no"
              }
            }
          }
        }        
      }
    }

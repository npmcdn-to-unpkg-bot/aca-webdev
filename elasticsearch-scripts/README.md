# Elasticsearch Scripts

### Proposed Mapping for Plans
(each Document is a plan.)

| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| PlanId | 1 | use as _id | None |
| Plan Name | 1 | string-analyzed, raw-string-not_analyzed | None |
| Issuer ID (?) | 1 | string-not_analyzed | find out how to get issuer name |
| State  | 1 | string-not_analyzed | None |
| Plan Type | 1 | string-analyzed, raw-string-not_analyzed | None |
| Metal Level | 1 | string-analyzed, raw-string-not_analyzed | None |
| Plan Brochure URL  | 1 | string-not_analyzed | None |
| Co-Pay (?) | 2 | string-not_analyzed | None |
| Premiums | 3 | nested (below) | select current effective rate, create age_30_tobacco_AreaID_5 fields |
| Drugs Covered | 4 | string-analyzed, raw-string-not_analyzed | Array format |
| Providers | 5 | nested (below) | need all providers for each plan |
| Medical Conditions | 6 | string-analyzed, raw-string-not_analyzed | Array format; plan that covers 80% of drugs? |  

#### Premiums Nested Attributes
| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| age_30_tobacco_AreaID_5 | 3 | float | each combinations of rates should be one field |
| age_31_tobacco_AreaID_5 | 3 | float | each combinations of rates should be one field |
(continue...)

#### Providers Nested Attributes
| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| NPI | 5 | string-not_analyzed | None |
| Full name | 5 | string-analyzed, raw-string-not_analyzed | combine first/last name |
| Address | 5 | string-not_analyzed | array format if multiple addresses |
| Specialty | 5 | string-analyzed, raw-string-not_analyzed | array format if multiple specialites|

#### Sources
1. plan-attributes-puf.csv
2. benefits-and-cost-sharing-puf.csv
3. Rate_PUF.csv
4. Drugs (JSON)
5. Providers (JSON)
6. Medical condition - drugs map

#### Sample Mapping

    "mappings": {
        "plan": {
            "properties": {
                "plan_name": {
                    "type": "string",
                    "index": "analyzed",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }                    
                },

                "premium": {
                    "type": "nested",
                    "properties": {
                        "age_30": {"type": "float"},
                        "age_40": {"type": "float"},
                        "age_50": {"type": "float"}
                    }                                        
                },

                "level": {
                    "type": "string",
                    "index": "analyzed",
                    "fields": {
                        "raw": {
                            "type": "string",
                            "index": "not_analyzed"
                        }
                    }                    
                },

                "url": {
                    "type": "string",
                    "index": "not_analyzed"
                },

                "state": {
                    "type": "string",
                    "index": "not_analyzed"
                },

                "providers": {
                    "type": "nested",
                    "properties": {
                        "name": {
                            "type": "string",
                            "index": "analyzed",
                            "fields": {
                                "raw": {
                                    "type": "string",
                                    "index": "not_analyzed"
                                }
                            }                                
                        },
                        "address": {
                            "type": "string",
                            "index": "not_analyzed",                                                       
                        }
                    }                                                                                            
                }
            }                                 
        }    
    }        

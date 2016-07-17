# Elasticsearch Scripts

### Proposed Mapping for Plans
(each Document is a plan)

| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| PlanId | 1 | use as _id | None |
| Plan Name | 1 | string-analyzed, raw-string-not_analyzed | None |
| Issuer | 1 | string-analyzed, raw-string-not_analyzed | None |
| State  | 1 | string-not_analyzed | None |
| Plan Type | 1 | string-analyzed, raw-string-not_analyzed | None |
| Metal Level | 1 | string-analyzed, raw-string-not_analyzed | None |
| Plan Brochure URL  | 1 | string-not_analyzed | None |
| Drugs Covered | 4 | string-analyzed, raw-string-not_analyzed | Array format
| Providers | 5 | nested (below) | could be an array of names to avoid nested mapping |
| Medical Conditions | 6 | string-analyzed, raw-string-not_analyzed | Array format; plan that covers 80% of drugs? |
| Logo URL  | 7 | string-not_analyzed | None |
| Premiums_median | 8 | float | None |
| Premiums_q1 | 8 | float | None |
| Premiums_q3 | 8 | float | None |

#### Providers Nested Attributes (Optional)
| Attribute | Source | Mapping | Preprocessing |
|-----------|--------|---------|---------------|
| NPI | 5 | string-not_analyzed | None |
| Full name | 5 | string-analyzed, raw-string-not_analyzed | combine first/last name |
| Address | 5 | string-not_analyzed | array format if multiple addresses |
| Specialty | 5 | string-analyzed, raw-string-not_analyzed | array format if multiple specialties|

#### Sources
1. plan-attributes-puf.csv
2. benefits-and-cost-sharing-puf.csv
3. Rate_PUF.csv
4. Drugs (JSON)
5. Providers (JSON)
6. Medical condition - drugs map
7. issuers_logos.csv
8. premiums_aggregated.csv

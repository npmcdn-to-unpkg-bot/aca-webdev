import * as React from "react";
import * as _ from "lodash";

import {
	SearchkitManager, SearchkitProvider,
	SearchBox, RefinementListFilter, MenuFilter, InputFilter, RangeFilter,
	Hits, HitsStats, NoHits, Pagination, SortingSelector,
	SelectedFilters, ResetFilters, ItemHistogramList,
	Layout, LayoutBody, LayoutResults, TopBar,
	SideBar, ActionBar, ActionBarRow, TermQuery, BoolMust
} from "searchkit";

import { PlanHitsListItem, PlanHitsGridItem } from "./components";
import { providerInputQuery } from "./custom_queries";
require("./index.scss");

const host = "http://169.45.104.77:9200/plans2/plan"
const searchkit = new SearchkitManager(host)

try {
	const user_state = window.user_input.user_state
	searchkit.addDefaultQuery( (query) => {
		 return query.addFilter("state",
			 TermQuery("state", user_state)
		 )
	})

	// searchkit.setQueryProcessor(
	// 	(plainQueryObject) => {
	// 		plainQueryObject["rescore"] = {
	// 			 "window_size" : 40,
	// 			 "query" : {
	// 				"score_mode": "multiply",
	// 				"rescore_query" : {
	// 					"function_score": {
	// 						"script_score": {
	// 							"script": {
	// 								"file": "letor",
	// 								"params": {
	// 									"weights": window.user_input.query_weights
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	return plainQueryObject
	// 	}
	// )

} //end try

catch(error) {
	console.log("Frontend Mode Only");
}

export class SearchPage extends React.Component {
	render(){
		return (
			<SearchkitProvider searchkit={searchkit}>
		    <Layout>
		      <TopBar>
		        <SearchBox
		          autofocus={true}
							placeholder="Search plans..."
		          queryFields={["plan_name^5", "level^2", "plan_type^2", "issuers^5"]}/>
		      </TopBar>
		      <LayoutBody>
		        <SideBar>
							<MenuFilter
								id="level"
								title="Metal Level"
								field="level.raw"
								orderKey="_term"
								listComponent={ItemHistogramList}
							/>
							<MenuFilter
								id="plan_type"
								title="Plan Type"
								field="plan_type.raw"
								orderKey="_term"
								listComponent={ItemHistogramList}
							/>
							<RangeFilter
								id="premiums_median"
								title="Average Monthly Premiums ($)"
								field="premiums_median"
								min={0}
								max={800}
								showHistogram={true}
							/>
							<RefinementListFilter
		            id="issuers"
		            title="Issuers"
		            field="issuer.raw"
		            operator="OR"
								exclude=""
		            size={10}
							/>
							<InputFilter
							  id="providers"
							  title="Search Providers"
							  placeholder="Search providers..."
								queryBuilder={ providerInputQuery }
							/>
							<InputFilter
							  id="drugs"
							  title="Search Drugs"
							  placeholder="Search drugs..."
								queryFields={["drugs"]}
							/>
							<RefinementListFilter
		            id="drugs"
		            title="Or Select From Below:"
		            field="drugs.raw"
		            operator="OR"
								exclude=""
		            size={10}
							/>
		        </SideBar>
		        <LayoutResults>
		          <ActionBar>
		            <ActionBarRow>
		              <HitsStats/>
									<SortingSelector options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Premiums", field:"premiums_median", order:"asc", defaultOption:true}
									]}/>
		            </ActionBarRow>
		            <ActionBarRow>
		              <SelectedFilters/>
		              <ResetFilters/>
		            </ActionBarRow>
		          </ActionBar>
		          <Hits
								mod="sk-hits-grid"
								hitsPerPage={20}
								itemComponent={PlanHitsGridItem}
								sourceFilter={["plan_name", "issuer", "state", "plan_type", "level", "url", "logo_url",
									"premiums_q1", "premiums_median", "premiums_q3"]}
							/>
		          <NoHits/>
							<Pagination showNumbers={true}/>
		        </LayoutResults>
		      </LayoutBody>
		    </Layout>
		  </SearchkitProvider>
		)
	}
}

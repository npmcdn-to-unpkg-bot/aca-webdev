import * as React from "react";
import * as _ from "lodash";
import $ from "jquery";

import {
	SearchkitManager, SearchkitProvider,
	SearchBox, RefinementListFilter, MenuFilter, InputFilter, RangeFilter,
	Hits, HitsStats, NoHits, Pagination, SortingSelector,
	SelectedFilters, ResetFilters, ItemHistogramList,
	Layout, LayoutBody, LayoutResults, TopBar,
	SideBar, ActionBar, ActionBarRow, TermQuery, BoolMust
} from "searchkit";

import { PlanHitsListItem, PlanHitsGridItem } from "./components";
import { providerInputQuery, generateRescore } from "./custom_queries";
require("./index.scss");

const host = "http://localhost:9200/data/plan"
const searchkit = new SearchkitManager(host)

window.user_input = {
	user_state: "FL",
	query_weights: [10, 10, 10]
}

try {
	const { user_state, query_weights } = window.user_input

	searchkit.addDefaultQuery( (query) => {
		 return query.addFilter("state",
			 TermQuery("state", user_state)
		 )
	})

	if ( query_weights != 0) {
		const rescore_query = generateRescore(query_weights)
		searchkit.setQueryProcessor( (plainQueryObject) => {
				plainQueryObject["rescore"] = rescore_query
				return plainQueryObject
		})
	}

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
		          queryFields={["plan_name^5"]}/>
		      </TopBar>
		      <LayoutBody>
		        <SideBar>
							<MenuFilter id="level" title="Metal Level" field="level.raw" listComponent={ItemHistogramList}/>
							<RangeFilter
								id="premiums_median"
								title="Average Monthly Premiums ($)"
								field="premium"
								min={0}
								max={800}
								showHistogram={true}
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
								sourceFilter={["plan_name", "state", "level", "url",
									"premium_q1", "premium", "plan_ranks"]}
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

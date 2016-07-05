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

import { PlanHitsListItem } from "./components";
import { providerInputQuery } from "./custom_queries";
require("./index.scss");

const host = "http://localhost:9200/data/plan"
const searchkit = new SearchkitManager(host)

try {
	const user_state = window.user_input.user_state;
	searchkit.addDefaultQuery((query)=> {
		 return query.addFilter("state",
			 TermQuery("state", user_state)
		 )
	 })

	// searchkit.addDefaultQuery((query)=> {
	// 	 return query.setSize(50).addQuery(
	// 		 SimpleQueryString("Nikolaus")
	// 	 )
	// })
}

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
		          searchOnChange={true}
							placeholder="Search plans..."
		          prefixQueryFields={["level^2","plan_name^10"]}/>
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
							<InputFilter
							  id="providers"
							  title="Providers Filter"
							  placeholder="Search providers..."
								queryBuilder={providerInputQuery}
							  searchOnChange={true}
							/>
							<RangeFilter
								id="premium_range"
								title="Premiums"
								field="premium.age_30"
								min={0}
								max={200}
								showHistogram={true}
								fieldOptions={{type:'nested', options:{path:'premium'}}}
							/>
		        </SideBar>
		        <LayoutResults>
		          <ActionBar>
		            <ActionBarRow>
		              <HitsStats/>
									<SortingSelector options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Premium (Desc)", key:"premium", fields:[
											{field:"premium.age_30", options: {order:"desc", nested_path:"premium"} }
										]}
									]}/>
		            </ActionBarRow>
		            <ActionBarRow>
		              <SelectedFilters/>
		              <ResetFilters/>
		            </ActionBarRow>
		          </ActionBar>
		          <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={PlanHitsListItem}/>
		          <NoHits/>
							<Pagination showNumbers={true}/>
		        </LayoutResults>
		      </LayoutBody>
		    </Layout>
		  </SearchkitProvider>
		)
	}
}

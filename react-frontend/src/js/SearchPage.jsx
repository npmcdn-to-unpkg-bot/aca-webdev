import * as React from "react";
import * as _ from "lodash";

import {
	SearchkitManager, SearchkitProvider,
	SearchBox, RefinementListFilter, MenuFilter,
	Hits, HitsStats, NoHits, Pagination, SortingSelector,
	SelectedFilters, ResetFilters, ItemHistogramList,
	Layout, LayoutBody, LayoutResults, TopBar,
	SideBar, ActionBar, ActionBarRow, TermQuery, FilteredQuery, BoolMust
} from "searchkit";

import { PlanHitsListItem } from "./components";
require("./index.scss");

const host = "http://localhost:9200/data/plan"
const searchkit = new SearchkitManager(host)

try {
	const user_state = window.user_input.user_state;
	searchkit.addDefaultQuery((query)=> {
		 return query.addQuery(
			 FilteredQuery({
				 filter:TermQuery("state", user_state)
			 })
		 )
	 })
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
		          prefixQueryFields={["providers^1","level^2","plan_name^10"]}/>
		      </TopBar>
		      <LayoutBody>
		        <SideBar>
							<MenuFilter
								id="level"
								title="Metal Level"
								field="level.raw"
								listComponent={ItemHistogramList}/>
		          <RefinementListFilter
		            id="providers"
		            title="Providers"
		            field="providers.raw"
		            operator="AND"
		            size={10}/>
		        </SideBar>
		        <LayoutResults>
		          <ActionBar>
		            <ActionBarRow>
		              <HitsStats/>
									<SortingSelector options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Premium (High to Low)", field:"premium", order:"desc"},
										{label:"Premium (Low to High)", field:"premium", order:"asc"}
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

import * as React from "react";
import * as _ from "lodash";

import {
	SearchkitManager, SearchkitProvider,
	SearchBox, RefinementListFilter, MenuFilter,
	Hits, HitsStats, NoHits, Pagination, SortingSelector,
	SelectedFilters, ResetFilters, ItemHistogramList,
	Layout, LayoutBody, LayoutResults, TopBar,
	SideBar, ActionBar, ActionBarRow, TagFilterList, TagFilterConfig,
	TermQuery, FilteredQuery, BoolShould
} from "searchkit";

require("./index.scss");

const host = "http://localhost:9200/data/plan"
const searchkit = new SearchkitManager(host)

// searchkit.addDefaultQuery((query)=> {
// 	 return query.addQuery(
// 			 TermQuery("type", "movie")
// 	 )
//  })

const PlanHitsListItem = (props)=> {
  const { bemBlocks, result } = props
  const { plan_name, premium, level, url, providers = [] } = result._source;

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">

      <div className={bemBlocks.item("poster")}>
        <img data-qa="poster" src="http://glasshospital.com/wp-content/uploads/2015/03/1369238178_BlueShield4Web.png"/>
      </div>

      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank">
					<h2 className={bemBlocks.item("plan_name")}>{plan_name}</h2>
				</a>
        <h3 className={bemBlocks.item("subtitle")}>
					Plan Details:
				</h3>
        <ul style={{ marginTop: 8, marginBottom: 8, listStyle: 'none', paddingLeft: 20 }}>
          <li>Premium: {premium}</li>
					<li>Level: {level}</li>
          <li>Providers: <TagFilterList field="providers.raw" values={providers} /></li>
        </ul>
      </div>

    </div>
  )
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

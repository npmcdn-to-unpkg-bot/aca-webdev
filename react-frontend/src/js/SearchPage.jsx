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

const host = "http://demo.searchkit.co/api/movies"
const searchkit = new SearchkitManager(host)

// searchkit.addDefaultQuery((query)=> {
// 	 return query.addQuery(
// 			 TermQuery("type", "movie")
// 	 )
//  })

// const MovieHitsGridItem = (props)=> {
// 	console.log(props);
//   const {bemBlocks, result} = props
//   let url = "http://www.imdb.com/title/" + result._source.imdbId
//   const source:any = _.extend({}, result._source, result.highlight)
//   return (
//     <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
//       <a href={url} target="_blank">
//         <img data-qa="poster" className={bemBlocks.item("poster")} src={result._source.poster} width="170" height="240"/>
//         <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.title}}>
//         </div>
//       </a>
//     </div>
//   )
// }

const MovieHitsListItem = (props)=> {
  const {bemBlocks, result} = props
  let url = "http://www.imdb.com/title/" + result._source.imdbId
  const { title, poster, writers = [], actors = [], genres = [], plot, released, rated } = result._source;

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <div className={bemBlocks.item("poster")}>
        <img data-qa="poster" src={result._source.poster}/>
      </div>
      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank"><h2 className={bemBlocks.item("title")}>{title}</h2></a>
        <h3 className={bemBlocks.item("subtitle")}>Released in {released}, rated {rated}/10</h3>
        <ul style={{ marginTop: 8, marginBottom: 8, listStyle: 'none', paddingLeft: 20 }}>
          <li>Rating: {rated}		</li>
					{/*<li>Writers:{writers}	</li>
					<li>Actors: {actors}	</li>*/}
          <li>Writers: <TagFilterList field="writers.raw" values={writers} /></li>
          <li>Actors: <TagFilterList field="actors.raw" values={actors} /></li>
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
							placeholder="Search movies..."
		          prefixQueryFields={["actors^1","type^2","languages","title^10"]}/>
		      </TopBar>
		      <LayoutBody>
		        <SideBar>
							<MenuFilter
								id="type"
								title="Movie Type"
								field="type.raw"
								listComponent={ItemHistogramList}/>
		          <RefinementListFilter
		            id="actors"
		            title="Actors"
		            field="actors.raw"
		            operator="AND"
		            size={10}/>
							<TagFilterConfig id="writers" title="Writers" field="writers.raw" />
		        </SideBar>
		        <LayoutResults>
		          <ActionBar>
		            <ActionBarRow>
		              <HitsStats/>
									<SortingSelector options={[
										{label:"Relevance", field:"_score", order:"desc", defaultOption:true},
										{label:"Latest Releases", field:"released", order:"desc"},
										{label:"Earliest Releases", field:"released", order:"asc"}
									]}/>
		            </ActionBarRow>
		            <ActionBarRow>
		              <SelectedFilters/>
		              <ResetFilters/>
		            </ActionBarRow>
		          </ActionBar>
		          <Hits mod="sk-hits-list" hitsPerPage={10} itemComponent={MovieHitsListItem}/>
		          <NoHits/>
							<Pagination showNumbers={true}/>
		        </LayoutResults>
		      </LayoutBody>
		    </Layout>
		  </SearchkitProvider>
		)
	}
}

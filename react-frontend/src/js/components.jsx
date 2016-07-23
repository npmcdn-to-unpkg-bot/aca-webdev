import * as React from "react";
import * as _ from "lodash";
import $ from "jquery";
import { TagFilterList } from "searchkit";
import { logClick, logRanks } from "./helper";

export const PlanHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  const { plan_name, level, url, state, issuer } = result._source
  // logRanks({
  //     "plan_id": result._id,
  //     "plan_score": result._score
  // })

  let providers = ''
  let display = 'none'
  try {
      const hits = result.inner_hits.providers.hits.hits
      const provider_array = $.map(hits,
        function(value, index) {
          return value._source.provider_name
        }
      )
      providers = provider_array.join(', ')
      display = 'inline'
  }
  catch (error) {}


  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">

      <a href={url} target="_blank">
        {/*<img data-qa="poster" className={bemBlocks.item("poster")}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/MetLife_Logo.svg/2000px-MetLife_Logo.svg.png"
          width="200"
        />*/}
        <div data-qa="title" className={bemBlocks.item("title")} onMouseDown={logClick} id={result._id}>{plan_name}</div>
      </a>

      <ul style={{marginTop: 8, marginBottom: 8, marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
        <li>Score: <span className={'hits-details'}> { result._score } </span></li>
        <li>State: <span className={'hits-details'}> { state } </span></li>
        {/*<li>Issuer: <span className={'hits-details'}> { issuer } </span></li>*/}
        <li>Level: <span className={'hits-details'}> { level } </span></li>
        <li style={ {display: display} }>Matched Providers: <span className={'hits-details'}> {providers} </span></li>
      </ul>


    </div>
  )
}

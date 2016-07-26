import * as React from "react";
import * as _ from "lodash";
import $ from "jquery";
import { TagFilterList } from "searchkit";
import { logClick, logRanks } from "./helper";

export const PlanHitsGridItem = (props)=> {
  const { bemBlocks, result } = props
  const { plan_name, issuer, state, plan_type, level, url,
    premiums_q1, premiums_median, premiums_q3 } = result._source

  let logo_url = result._source.logo_url
  if (logo_url == "") {
    logo_url = "http://www.brandcrowd.com/gallery/brands/pictures/picture14180603564036.png"
  }

  logRanks({
      "plan_id": result._id,
      "plan_score": result._score
  })

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
        <div className="img-logo">
          <img data-qa="poster" className={bemBlocks.item("poster")}
            src={logo_url}
            width="200"
          />
        </div>
        <div data-qa="title" className={bemBlocks.item("title")} onMouseDown={logClick} id={result._id}>{plan_name}</div>
      </a>

      <ul style={{marginTop: 8, marginBottom: 8, marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
        <li>Score: <span className={'hits-details'}> { result._score } </span></li>
        <li>State: <span className={'hits-details'}> { state } </span></li>
        <li>Issuer: <span className={'hits-details'}> { issuer } </span></li>
        <li>Level: <span className={'hits-details'}> { level } </span></li>
        <li>Type: <span className={'hits-details'}> { plan_type } </span></li>
        <li>Range of Premiums: <span className={'hits-details'}> ${ parseInt(premiums_q1) } &mdash; ${ parseInt(premiums_q3) } </span></li>
        <li>Average Monthly Premiums: <span className={'premiums'}> ${ parseInt(premiums_median) } </span></li>
        <li style={ {display: display} }>Matched Providers: <span className={'hits-details'}> {providers} </span></li>
      </ul>


    </div>
  )
}

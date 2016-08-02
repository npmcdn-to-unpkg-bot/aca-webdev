import * as React from "react";
import * as _ from "lodash";
import $ from "jquery";
import { TagFilterList } from "searchkit";
import { logClick, logRanks, display_inner_hits } from "./helper";

export const PlanHitsGridItem = (props)=> {
  const { bemBlocks, result } = props
  const { plan_name, issuer, state, plan_type, level, url,
    premiums_q1, premiums_median, premiums_q3 } = result._source

  let logo_url = result._source.logo_url
  if (logo_url == "") {
    logo_url = "/static/img/semantic-health-logo-small.png"
  }

  logRanks({
      "plan_id": result._id,
      "plan_score": result._score
  })

  let providers = ''
  let display_providers = 'none'
  try {
    const [inner_providers, inner_display_providers] = display_inner_hits(result.inner_hits, "provider_name")
    providers = inner_providers
    display_providers = inner_display_providers
  }
  catch (error) {}

  let specialists = ''
  let display_specialists = 'none'
  try {
    const [inner_specialists, inner_display_specialists] = display_inner_hits(result.inner_hits, "speciality")
    specialists = inner_specialists
    display_specialists = inner_display_specialists
  }
  catch (error) {}

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">

      <a href={url} target="_blank">
        <div className="div-img-logo">
          <img data-qa="poster" className={bemBlocks.item("poster")}
            src={logo_url}
            onMouseDown={logClick}
            data-plan-id={result._id}
          />
        </div>
        <div data-qa="title" className={bemBlocks.item("title")}
          onMouseDown={logClick}
          data-plan-id={result._id}>{plan_name}</div>
      </a>

      <ul style={{marginTop: 8, marginBottom: 8, marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
        <li className={'hits-italics'}>{ plan_type } plan by { issuer }</li>
        <li>Score: <span className={'hits-details'}> { result._score } </span></li>
        <li>Level: <span className={'hits-details'}> { level } </span></li>
        <li>State: <span className={'hits-details'}> { state } </span></li>
        <li style={ {display: display_providers} }>Matched Providers: <span className={'hits-details'}> {providers} </span></li>
        <li style={ {display: display_specialists} }>Matched Specialists: <span className={'hits-details'}> {specialists} </span></li>
        <li><br></br></li>
        <li className={'premiums'}> ${ parseInt(premiums_median) } /mo</li>
        <li className={'hits-details'}> (estimated ${ parseInt(premiums_q1) } &mdash; ${ parseInt(premiums_q3) }) </li>
      </ul>

    </div>
  )
}

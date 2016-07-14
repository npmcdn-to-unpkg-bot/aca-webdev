import * as React from "react";
import * as _ from "lodash";
import $ from "jquery";
import { TagFilterList } from "searchkit";
import { logClick } from "./helper";

export const PlanHitsListItem = (props)=> {
  const { bemBlocks, result } = props
  // const { plan_name, premium = {}, providers = {}, level, url, state } = result._source
  const source:any = _.extend({}, result._source, result.highlight)

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">

      <div className={bemBlocks.item("poster")}>
        <img data-qa="poster" src="http://glasshospital.com/wp-content/uploads/2015/03/1369238178_BlueShield4Web.png"/>
      </div>

      <div className={bemBlocks.item("details")}>
        <a href={source.url} target="_blank">
					<h2 className={bemBlocks.item("title")} onMouseDown={logClick} id={result._id} dangerouslySetInnerHTML={{__html:source.plan_name}}></h2>
				</a>
        <h3 className={bemBlocks.item("subtitle")}>
					Plan Details:
				</h3>
        <ul style={{ marginTop: 8, marginBottom: 8, listStyle: 'none', paddingLeft: 20 }}>
					<li>Score: {result._score}</li>
					<li>State: {source.state}</li>
          <li>Premium: {source.premium.age_30}</li>
					<li dangerouslySetInnerHTML={{__html:source.level}}></li>
          {/*<li>Providers: <TagFilterList field="providers.raw" values={providers} /></li>*/}
        </ul>
      </div>

    </div>
  )
}

export const PlanHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  const source:any = _.extend({}, result._source, result.highlight)
  console.log(result)
  console.log(source)

  const provider_array = $.map(source.providers,
    function(value, index) {
      return value['name']
    }
  )

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">

      <a href={source.url} target="_blank">
        <img data-qa="poster" className={bemBlocks.item("poster")}
          src="http://glasshospital.com/wp-content/uploads/2015/03/1369238178_BlueShield4Web.png"
          width="200"
        />
        <div data-qa="title" className={bemBlocks.item("title")} dangerouslySetInnerHTML={{__html:source.plan_name}}></div>
      </a>


      <ul style={{marginTop: 8, marginBottom: 8, marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
        <li>Score: {result._score}</li>
        <li>State: {source.state}</li>
        <li>Premium: {parseInt(source.premium.age_30)}</li>
        <li dangerouslySetInnerHTML={{__html:source.level}}></li>
        {/*<li>Providers: <TagFilterList field="providers.raw" values={providers} /></li>*/}
      </ul>


    </div>
  )
}

import * as React from "react";
import { TagFilterList } from "searchkit";
import { logClick } from "./helper";

export const PlanHitsListItem = (props)=> {
  const { bemBlocks, result } = props
  const { plan_name, premium, level, url, state, providers = [] } = result._source

  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">

      <div className={bemBlocks.item("poster")}>
        <img data-qa="poster" src="http://glasshospital.com/wp-content/uploads/2015/03/1369238178_BlueShield4Web.png"/>
      </div>

      <div className={bemBlocks.item("details")}>
        <a href={url} target="_blank">
					<h2 className={bemBlocks.item("plan_name")} onMouseDown={logClick} id={result._id}>
						{plan_name}
					</h2>
				</a>
        <h3 className={bemBlocks.item("subtitle")}>
					Plan Details:
				</h3>
        <ul style={{ marginTop: 8, marginBottom: 8, listStyle: 'none', paddingLeft: 20 }}>
					<li>Score: {result._score}</li>
					<li>State: {state}</li>
          <li>Premium: {premium}</li>
					<li>Level: {level}</li>
          <li>Providers: <TagFilterList field="providers.raw" values={providers} /></li>
        </ul>
      </div>

    </div>
  )
}

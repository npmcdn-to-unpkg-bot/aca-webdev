import * as React from "react";
import * as _ from "lodash";
import $ from "jquery";
import { TagFilterList } from "searchkit";
import { logClick } from "./helper";

// export const PlanHitsListItem = (props)=> {
//   const { bemBlocks, result } = props
//   const { plan_name, premium = {}, level, url, state } = result._source
//
//   return (
//     <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
//
//       <div className={bemBlocks.item("poster")}>
//         <img data-qa="poster" src="http://glasshospital.com/wp-content/uploads/2015/03/1369238178_BlueShield4Web.png"/>
//       </div>
//
//       <div className={bemBlocks.item("details")}>
//         <a href={url} target="_blank">
// 					<h2 className={bemBlocks.item("plan_name")} onMouseDown={logClick} id={result._id}>
// 						{plan_name}
// 					</h2>
// 				</a>
//         <h3 className={bemBlocks.item("subtitle")}>
// 					Plan Details:
// 				</h3>
//         <ul style={{ marginTop: 8, marginBottom: 8, listStyle: 'none', paddingLeft: 20 }}>
// 					<li>Score: {result._score}</li>
// 					{/*<li>State: {state}</li>*/}
//           {/*<li>Premium: {current_premium}</li>*/}
// 					<li>Level: {level}</li>
//           {/*<li>Providers: <TagFilterList field="providers.raw" values={providers} /></li>*/}
//         </ul>
//       </div>
//
//     </div>
//   )
// }

export const PlanHitsGridItem = (props)=> {
  const {bemBlocks, result} = props
  const { plan_name, premium = {}, level, url, state } = result._source

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
        <img data-qa="poster" className={bemBlocks.item("poster")}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/MetLife_Logo.svg/2000px-MetLife_Logo.svg.png"
          width="200"
        />
        <div data-qa="title" className={bemBlocks.item("title")}>{plan_name}</div>
      </a>

      <ul style={{marginTop: 8, marginBottom: 8, marginLeft: 0, paddingLeft: 0, listStyle: 'none' }}>
        <li>State: {state}</li>
        <li>Level: {level}</li>
        <li>Relevance: {result._score}</li>
        <li style={ {display: display} }>Matched Providers: {providers}</li>
      </ul>


    </div>
  )
}

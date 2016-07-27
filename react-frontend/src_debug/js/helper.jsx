import $ from "jquery";

export const logClick = (event)=> {
  const payload = {
    "plan_id": event.target.getAttribute("data-plan-id")
  };
  const success = (response)=> {
    console.log(response);
  };
  $.post($SCRIPT_ROOT + '/_clicks', payload, success);
};

export const logRanks = (payload)=> {
  const success = (response)=> {
    console.log(response);
  };
  if (payload.plan_score == null) {
    payload.plan_score = 1
  }
  $.post($SCRIPT_ROOT + '/_ranks', payload, success);
};

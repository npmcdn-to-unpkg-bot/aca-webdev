import $ from "jquery";

export const logClick = (event)=> {
  const payload = {
    "plan_id": event.target.id
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
  $.post($SCRIPT_ROOT + '/_ranks', payload, success);
};

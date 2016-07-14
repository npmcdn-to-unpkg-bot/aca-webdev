import $ from "jquery";

export const logClick = (event)=> {
  const payload = {
    "event": event.target.id
  };
  const success = (response)=> {
    console.log(response);
  };
  $.post($SCRIPT_ROOT + '/_clicks', payload, success);
};

import mixpanel from "mixpanel-browser";
mixpanel.init("0409510891fc4f0af5b1bebac9597b3c");

//let env_check = process.env.NODE_ENV === "production";
let MIXPANEL_ACTIVE = true;

let actions = {
  identify: id => {
    if (MIXPANEL_ACTIVE) mixpanel.identify(id);
  },
  alias: id => {
    if (MIXPANEL_ACTIVE) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (MIXPANEL_ACTIVE) mixpanel.track(name, props);
  },
  people: {
    set: props => {
      if (MIXPANEL_ACTIVE) mixpanel.people.set(props);
    }
  }
};

export let Mixpanel = actions;

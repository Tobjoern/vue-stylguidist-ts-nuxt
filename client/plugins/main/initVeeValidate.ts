import Vue from 'vue'
import { required, alpha, email, min, min_value, max_value, max, numeric } from "vee-validate/dist/rules";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

extend("required", {
  ...required,
  message: "This field is required"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend("min", {
  ...min,
  message: "This field must be a at least {length} long."
});

extend("max", {
  ...max,
  message: "This field must be a at least {length} long."
});


extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
});

extend("min_value", {
  ...min_value,
  message: "This field must be at least {min}"
});

extend("max_value", {
  ...max_value,
  message: "This field must be at most {max}"
});

extend('numeric', {
  ...numeric,
  message: 'This field muste be numeric.'
})

extend('number', {
  message: 'This field must be numeric.',
  validate: (value) => {
    return typeof value === 'number'
  }
})

extend('even', {
  message: 'This value must be even',
  validate: (value) => {
    return value % 2 === 0
  }
})

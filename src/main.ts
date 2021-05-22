import Vue from 'vue'

import './assets/mdb/js/jquery-3.4.1.min'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-css-only/css/bootstrap.min.css'
// import 'mdbvue/build/css/mdb.css'

// import './assets/mdb/css/mdb.css'
// import './assets/mdb/js/mdb'
import App from './App.vue'
import router from './router'

import './assets/mdb/css/bootstrap.css';
import './assets/mdb/css/mdb.css';
import './assets/mdb/js/bootstrap'
import './assets/mdb/js/mdb'
import $ from 'jquery'
// import './assets/mdb/css/materialize.css'
// import './assets/mdb/js/materialize'

// import 'bootstrap/dist/css/bootstrap.css';
// import 'mdbvue/build/css/mdb.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

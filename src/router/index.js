import Vue from 'vue';
import Router from 'vue-router';
import Questionnaire1 from '@/components/questionnaire1';
import Questionnaire2 from '@/components/questionnaire2';
import VueMaterial from 'vue-material';
import VeeValidate from 'vee-validate';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css'

Vue.use(Router);
Vue.use(VueMaterial);
Vue.use(VeeValidate);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Questionnaire1',
      component: Questionnaire1
    },
    {
      path: '/2',
      name: 'Questionnaire2',
      component: Questionnaire2
    }
  ]
})

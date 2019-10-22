import Vue from 'vue'
import Router from 'vue-router'
import AddPage from './views/AddPage.vue'
import EditPage from './views/EditPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/add',
      name: 'AddPage',
      component: AddPage
    },
    {
      path: '/edit',
      name: 'EditPage',
      component: EditPage
    }
  ]
})

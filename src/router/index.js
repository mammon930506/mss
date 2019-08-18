import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
import Boottest from "../components/tab0/boottest.vue"
import Mscontainer from "../components/tab0/mscontainer.vue"
import TreeChart from "../components/tab0/treeChart.vue"
import TaskManagement from "../components/tab0/task/taskManagement.vue"
import TaskDetail from "../components/tab0/task/taskDetail.vue"
import TinymceEditor from "../components/tinymceeditor.vue"


let router = new Router({
  mode:"history",
  routes: [
    {
      name: "boottest",
      path: "/tab0/v0/v00/v000",
      component: Boottest,
      meta:{
        requireAuth:true,
      }
    },
    {
      name: "layout",
      path: "/tab0/v0/v00/v001",
      component: Mscontainer
    },
    {
      name: "treeChart",
      path: "/tab0/v0/v00/v002",
      component: TreeChart
    },
    {
      name: "任务管理",
      path: "/tab0/v0/v01",
      component: TaskManagement
    },
    {
      name: "任务详情",
      path: "/taskDetail",
      component: TaskDetail
    },
    {
      name: "tiny",
      path: "/tab0/v0/v02",
      component: TinymceEditor
    }
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth==true){
    console.log("require");
  }
  next();
})

export default router

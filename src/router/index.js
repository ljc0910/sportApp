import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Licai from '@/components/Licai'
import Faxian from '@/components/Faxian'
import User from '@/components/User'
import Detail from '@/components/Detail'
import Info from '@/components/Info'
import PageTransition from '@/components/PageTransition'
import Shezhi from '@/components/Shezhi'
import Saomiao from '@/components/Saomiao'
import Search from '@/components/Search'
import listDetail from '@/components/listDetail'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)	//将插件设置全局，可在任意位置进行调用
var test = new Router({
	routes: [
	 {
	 	path: '/',
	 	name: 'PageTransition',
	 	component: PageTransition,
	 	children:[{
	 		path:'',
	 		name:'Index',
	 		component:Index
	 	},{
	 	path: '/detail',
	 	name: 'Detail',
	 	component: Detail
	 },{
	 	path: '/licai',
	 	name: 'Licai',
	 	component: Licai
	 },{
	 	path: '/listDetail',
	 	name: 'listDetail',
	 	component: listDetail
	 },{
	 	path: '/faxian',
	 	name: 'Faxian',
	 	component: Faxian
	 },{
	 	path: '/user',
	 	name: 'User',
	 	component: User
	 },{
	 	path:'/info',
	 	name:'Info',
	 	component:Info
	 },{
	 	path: '/shezhi',
	 	name: 'Shezhi',
	 	component: Shezhi
	 },{
	 	path: '/saomiao',
	 	name: 'Saomiao',
	 	component: Saomiao
	 },{
	 	path: '/search',
	 	name: 'Search',
	 	component: Search
	 }]
	 }
	]
})

export default test

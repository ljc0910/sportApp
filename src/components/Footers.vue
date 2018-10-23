<template>
<mt-tabbar fixed v-model="selected"> <!--selected默认选中-->
  <mt-tab-item v-for = "(item,index) in tabs" :key="index" :id="item.id" @click.native="changeState(item)">
    <img slot="icon" :src="item.active?item.tab_img_active:item.tab_img"/>{{item.name}}
    <!--<router-link to="/licai"></router-link>-->
  </mt-tab-item>
 
</mt-tabbar>
</template>

<script>
	import Router from 'vue-router'
	export default{
		name:"Footers",
		data(){
			return{
				selected:"Index",
				tabs:[{
					id:"Index",
					name:"首页",
					active:true,
					tab_img:require('../../static/img/home2_ic_home_normal.png'),
					tab_img_active:require("../../static/img/home2_ic_home_selected.png")
				},{
					id:"Licai",
					name:"中心",
					active:false,
					tab_img:require("../../static/img/home2_ic_financial_normal.png"),
					tab_img_active:require("../../static/img/home2_ic_financial_selected.png")
				},{
					id:"Faxian",
					name:"发现",
					active:false,
					tab_img:require("../../static/img/home2_ic_discovery_normal.png"),
					tab_img_active:require("../../static/img/home2_ic_discovery_selected.png")
				},{
					id:"User",
					name:"个人",
					active:false,
					tab_img:require("../../static/img/home2_ic_profile_normal.png"),
					tab_img_active:require("../../static/img/home2_ic_profile_selected.png")
				}]
			}
		},
		methods:{
			changeState(item){
				this.tabs.forEach((v)=>{
					v.active = false
				})
				item.active = true
				this.$router.push({
		            name: item.id
		        })
				
			}
		},
		mounted:function(){
//			this.changeState
		}
	}
</script>

<style>
	.mint-tabbar > .mint-tab-item.is-selected{background: none !important;}
	.mint-tabbar.is-fixed{border-top: 1px solid #ccc;position: absolute !important;height:10vh !important;top:90vh !important;left: 0;z-index: 0;} 
	.is-selected .mint-tab-item-label{color: red !important;}
</style>
<template>
	<div>
		<mt-header title="社区">
		  <router-link to="/faxian" slot="left">
		    <mt-button icon="back"></mt-button>
		  </router-link>
		  <mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<div class="luntan_search" @click="search()"><span><img src="../../static/img/community_nav_btn_search_s.png"/></span>搜索板块或主题</div>
		<h3>地理位置</h3>
		<div id="container"  class="mymap"></div>  
	</div>
</template>
<script>
	import { Swipe, SwipeItem } from 'mint-ui';
	import BMap from 'BMap';
	const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';
	export default{
		name:"Luntan",
		components:{
			Swipe, SwipeItem,BMap
		},
		beforeMount(){
			this.getLocation()
		},
		mounted(){
       		var T = setTimeout(()=>{
				this.ready();     //加载地图和相关组件
			},2000)
    	},
		data(){
			return{
				latitude:'',	//经度
				longitude:'',	//纬度
				sDistace:'',	//距离
				steps:0
			}
		},
		methods:{
			search(){
				this.$router.push({
					name:"Search"
				})

			},
			getLocation(){		//获取gps
				var that = this;
				if (navigator.geolocation){
					    navigator.geolocation.getCurrentPosition(function (position){
					    	 that.longitude = position.coords.longitude;  
					         that.latitude = position.coords.latitude;  
					         console.log(that.longitude)
					         console.log(that.latitude)
					    });
					}else{alert("您的设备不支持gps定位或未开启该功能");}
			},
			 ready(){
			      var map = new BMap.Map("container");
			      var point = new BMap.Point(this.longitude,this.latitude); 
			      map.centerAndZoom(point, 19);
			}
		}
	}
</script>

<style scoped>
	.luntan_search{width: 90vw;height: 6vw;margin:0 auto;background: #fff;text-align: center;line-height: 6vw;font-size: 12px;color: #aaa;border-radius: 1vw;}
	.luntan_search img{width: 12px;}
	.mint-swipe{width: 100%;height: 24vh;}
	h3{font-weight: normal;margin-left: 4vw;font-size: 16px;line-height: 30px;}
	#container {width:100vw; height:120vw; }  
	.infoShow p{font-size: 12px;text-align: center;}
</style>
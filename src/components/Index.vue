<template>
	<div>
	<!--<router-link to="/detail">跳转到详情页</router-link>-->
	 <mt-loadmore :top-method="loadTop" ref="loadmore">
			<div class="scanning" @click="saomiao()"><img src="../../static/img/scanning.png"></div>	<!--扫描-->
			<time>{{time}}</time>
			<div class="img-slot" style="background: #ccc;">
				<swiper :options = "options">
			        <swiper-slide v-for="data in linksGroup">
			        		<img :src="data.img" @click="changeNav(data.detail)">
			        </swiper-slide>
				</swiper>
			 </div>
			<div id="announcement">  
		        <ul>  
		            <li v-for="data in linksGroup"><img src="../../static/img/home2_ic_notice.png">&nbsp;&nbsp;{{data.name}}</li>
		        </ul>  
	    	</div>  
	    	
	    	<div slot="top" class="mint-loadmore-top">
    		  <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      		  <span v-show="topStatus === 'loading'">Loading...</span>
    		</div>
    	
    		<div class="nav">
    			<swiper :options = "options">
    				 <swiper-slide v-for="data in datalist2">
    				 		<img :src="data.img" @click="listDetail(data)">
    				 </swiper-slide>
    			</swiper>
    		</div>
    		
    		<div class="serve" @click="enterDetail">
    			<div class="s_l">
    				<h3><span>列表</span>-视频列表</h3>
    				<p>科学、系统、专业、易用四大优势</p>
    			</div>
    			<div class="s_r">
    			</div>
    		</div> 
    </mt-loadmore>
    </div>
</template>

<script>
	
	document.addEventListener("plusready", function() {
        // 注册返回按键事件
        plus.key.addEventListener('backbutton', function() {
            // 事件处理
            window.history.back();
        }, false);
    });
	
	const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';
	import { Loadmore } from 'mint-ui';
	import Vue from 'vue'
	import {swiper,swiperSlide} from "vue-awesome-swiper"
	export default{
		name:"Index",
		components:{
			swiper,swiperSlide,Loadmore,
			'mt-loadmore':Loadmore
		},
		data(){
			return{
				topStatus: '',
				options:{
					autoplay:1000
				},
				datalist:[],
				time:new Date().getHours()+':'+ (new Date().getMinutes()>10?new Date().getMinutes():(0+""+new Date().getMinutes())),
				datalist2:[
					
				],
				links:[{
					detail:'',
					img:'',
					name:''
				}],
				linksGroup:[]
			}
		},
			methods: {
				saomiao(){
					this.$router.push({
		            path:"/saomiao", 
		            name:"Saomiao"
		      	    })
				},
				changeNav(detail){
					this.datalist2 = detail
				},
				enterDetail(){
					this.$router.push({
		            path:"/", 
		            name:"Detail"
		      	    })
				},
				listDetail(info){
					this.$root.eventHub.$emit('eventName', info);
					this.$router.push({ name: 'listDetail'})
				},
				getInfo(){
					this.$http.get(API_PROXY + 'https://www.easy-mock.com/mock/5aaa06d62c0e954ad391df4b/example/videoList'
				      	).then(res=>{
				      		this.links = res.data.data;
				      		this.linksGroup = [this.links[Math.round(Math.random()*10)],this.links[Math.round(Math.random()*10)],this.links[Math.round(Math.random()*10)],this.links[Math.round(Math.random()*10)]]
			      	})	 
				},
		      handleTopChange(status) {
		        this.topStatus = status;
		      },
		        loadTop:function() { //组件提供的下拉触发方法  
        //下拉加载  
        		this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
      }, 
	      },
	      created:function(){    
	      	this.getInfo()
	      },
	      mounted:function(){
					this.time = new Date().getHours()+':'+ (new Date().getMinutes()>10?new Date().getMinutes():(0+""+new Date().getMinutes()))//获取当前时间
					var $announcement = $('#announcement ul');  //公告轮播引用
				    var cheight = parseInt($('#announcement').css('line-height').split('p')[0]);  
				    var announcementLength = $announcement.find('li').length;  
				    var nowtop,nexttop;  
				    var announcementTimer = setInterval(function (){  
				        nowtop = parseInt($announcement.css('top').split('p')[0]);  
				        nexttop = 0;  
				        if(nowtop == (-(announcementLength - 1)*cheight)){  
				            nexttop = '0px';  
				        }else{  
				            nexttop = (nowtop - 30) + 'px';  
				        }  
				        $announcement.animate({top:''+nexttop});  
				    },2000);  
					}
	}
</script>

<style>
	*{margin: 0;padding: 0;}
	html,body{height: 100%;background: #f8f8f8;overflow: hidden;}
	 .mint-tabbar{display:flex 56 !important;}
	.scanning{width: 10vw;height: 10vw;position: absolute;left: 3vw;top: 18vw;z-index: 2;}
	.scanning img{width: 10vw;}
	time{position: absolute;right: 1vw;height: 1vw;z-index: 2;margin-right: 4vw;}
	.gonggao{height: 6vw;overflow: hidden;}
	#announcement{ position:absolute; left:0; top:78vw; width:100%; height:30px; line-height:30px; overflow:hidden;background: #fff;}  
	#announcement ul{ position:absolute; top:0;z-index: 9;}  
	#announcement li{ height:30px; line-height:30px;width: 90vw;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding:0 4vw;}  
	#announcement li{font-size: 12px;line-height: 30px;}
	#announcement img{height: 12px;vertical-align: middle;margin-bottom: 4px;}
	.nav ul{display: flex;width: 94vw;height:24vw ;background: #fff;border-radius: 2vw;margin: 10vw auto 0;justify-content: space-around;padding: 3vw 0;}
	.nav ul img{width: 25vw;display:block;margin: 0 auto;}
	.nav li{list-style: none;font-size: 10px;display: flex;flex-direction: column;justify-content: space-around;}
	.nav p{text-align: center;}
	.nav p:last-child{color: #666;}
	.serve{height: 14vw;background: #fff;border-radius: 2vw;width: 90vw;margin: 0 auto;margin-top: 2vw;padding: 8vw 2vw;}
	.serve .s_l{float: left;}
	.serve .s_l h3{font-weight: normal;}
	.serve .s_l span{color: orange;}
	.serve .s_l p{font-size: 10px;color: #666;margin-top: 3vw;}
	.serve .s_r{float: right;width: 15vw;height: 14vw;background: url(../../static/img/home2_bg_security_guarantee.png);background-size: cover;}
	 .swiper-wrapper img{width: 100vw;height:62.5vw ;}
	 .img-slot{width: 100vw;height:62.5vw ;}
	 .nav{margin-top: 10vw;}
	.nav .swiper-slide{width: 32vw !important;height: 32vw !important;border-radius:1vw ;margin-left: 1vw;}
	.nav .swiper-slide img{width: 32vw !important;height:32vw !important;}
</style>
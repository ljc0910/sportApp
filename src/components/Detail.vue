<template>
	<div>
		<mt-header title="导航">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<ul class="allNav navBOx" v-show="!linksNav"  >
			<!-- <li v-for="info in links" :style="{background:`url(${info.back_ground}) no-repeat`}"" @click="linkTo(info.url)">
				{{info.name}}
			</li> -->
			<li v-for="(info,index) in links"  @click="linkTo(index)" :style="{background:`url(${info.img}) no-repeat`}">
				<span>{{info.name}}</span>
			</li>
		</ul>
		<ul class='detailNav navBOx' v-show="!listNav">
			<li v-for="(info,index) in linksNav"  @click="linkTonav(index)"  :style="{background:`url(${info.img}) no-repeat`}">
				<span>{{info.name}}</span>
			</li>
		</ul>
		<ul class='listNav navBOx'>
			<li v-for="(info,index) in listNav"  @click="linkTodetail(index)"  :style="{background:`url(${info.img}) no-repeat`}">
				<span>{{info.name}}</span>
			</li>
		</ul>
		<div v-if="videoSrc" class="videoBox">
			<video autoplay controls :src="videoSrc"></video>
			<div class="closeBtn" @click="closeBtn()">x</div>
		</div>
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
	import { Header } from 'mint-ui';
	export default{
		name:"Detail",
		components:{
			Header
		},
		data(){
			return{
				links:'',
				linksNav:'',
				listNav:'',
				videoSrc:''
			}
		},
		mounted:function(){
			this.$http.get(API_PROXY + 'https://www.easy-mock.com/mock/5aaa06d62c0e954ad391df4b/example/videoList'
								).then(res=>{
									this.links = res.data.data;
						})
		},
		methods:{
			linkTo(index){
				this.linksNav = this.links[index].detail
			},
			linkTonav(index){
				console.log(this.linksNav[index].plan_list)
				this.listNav = this.linksNav[index].plan_list;
			},
			linkTodetail(index){
//				window.location.href = this.listNav[index].url;
				this.videoSrc = this.listNav[index].url;
			},
			closeBtn(){
				this.videoSrc=''
			}
		}
	}
</script>

<style scoped>
	 .mint-header{background: red;height: 20vw  !important;}
	 .mint-header-title{margin-top: 5vw  !important;}
	 .navBOx {height: 130vw;overflow: auto;}
	 .navBOx li{float: left;width: 48%;border-radius:10px;margin:1%;box-sizing:border-box;border:1px solid #ccc;list-style: none;font-size: 12px;text-align: center;padding: 10vw 0;background-size: cover !important;}
	 .navBOx li span{background:rgba(255,255,255, 0.6);padding:4px;border-radius: 4px; }
	 header{position: fixed;width: 100%;}
	 .navBOx{margin-top: 20vw;}
	 .videoBox{position: absolute;top: 0;height: 100vh;background: rgba(0,0,0,0.7);}
	 video{width: 100vw;height:57vw;margin-top: 30vh;}
	 .closeBtn{width:10vw;height:10vw;border-radius: 50%;background: #ccc;margin: 6vw auto;text-align: center;line-height: 10vw;font-size: 5vw;}
</style>


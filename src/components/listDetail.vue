<template>
	<div>
		<mt-header title="推荐">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<ul class="allNav navBOx" >
			<li v-for="(info,index) in msgdetail" >
				<span>2</span>
			</li>
		</ul>
	</div>
</template>

<script>
	const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';
	import { Header } from 'mint-ui';
	export default{
		name:"listDetail",
		components:{
			Header
		},
		data(){
			return{
				msg:'',
				msgdetail:[]
			}
		},
		beforeCreate() {
		    this.$root.eventHub.$on('eventName',(target) => {
				this.changeVal(target)
			  });
		},
		methods:{
			linkTodetail(index){
				window.location.href = this.msg[index].url;
			},
			changeVal(target){
				this.msg = target
		    	this.msgdetail = target.plan_list
		    	console.log(this.msgdetail)
			}
		},
		destoryed(){
			this.$root.eventHub.$off('eventName')  //销毁监听，防止事件重复绑定
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
</style>


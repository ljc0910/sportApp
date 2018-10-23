<template>
	<div class="sz">
		<mt-header title="账户设置">
			<router-link to="/info" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="cell_box">
			<mt-cell title="实名认证" is-link>
			  <span>未认证</span>
			  <img slot="icon" src="http://temp.im/100x100/ccaaaa/000" width='24' height="24"/>
			</mt-cell>
			<mt-cell title="绑定手机" is-link>
			  <span>156****6361</span>
			  <img slot="icon" src="http://temp.im/100x100/ccaaaa/000" width='24' height="24"/>
			</mt-cell>
			<mt-cell title="邮箱绑定" is-link>
			  <span>未绑定</span>
			  <img slot="icon" src="http://temp.im/100x100/ccaaaa/000" width='24' height="24"/>
			</mt-cell>
			<mt-cell title="邀请好友" is-link>
			  <span></span>
			  <img slot="icon" src="http://temp.im/100x100/ccaaaa/000" width='24' height="24"/>
			</mt-cell>
			<mt-cell title="帮助中心" is-link>
			  <span></span>
			  <img slot="icon" src="http://temp.im/100x100/ccaaaa/000" width='24' height="24"/>
			</mt-cell>
			<mt-cell title="版本信息" is-link>
			  <span></span>
			  <img slot="icon" src="http://temp.im/100x100/ccaaaa/000" width='24' height="24"/>
			</mt-cell>
			<mt-cell title="设置手势密码" is-link>
			  <span></span>
			</mt-cell>
			<div class="tuichu" @click="tuichu()">
				退出登录
			</div>
		</div>
	</div>
</template>

<script>
	import { Header } from 'mint-ui';
	import { Cell } from 'mint-ui';
	export default{
		name:"Detail",
		components:{
			Header,Cell
		},
		methods:{
			tuichu(){
				localStorage.removeItem("user")
				this.$router.push({
					name:"User"
				})
			}
		}
	}
</script>

<style>
	 .sz .mint-header{background: red;height: 20vw  !important;}
	 .sz .mint-header-title{margin-top: 5vw  !important;}
	 .sz .mint-cell{margin:1vw 0;}
	 .sz .cell_box{height: 80vh;overflow: auto;}
	 .sz .tuichu{color: red;background: #fff;padding:2vw 0;text-align: center;}
	 .sz .mint-cell-wrapper{font-size: 14px !important;}
	 .sz .mint-cell-value span{font-size: 12px;}
</style>
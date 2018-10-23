<template>
	<div class="boxAll">
		<div class="box">
		<div class="head">
			<div class="cont">
				<div class="img"></div>
				<p></p>
			</div>
		</div>
		
		<!--登录模块-->
		<div v-show="!isRegister">
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">短信验证登录</mt-tab-item>
			  <mt-tab-item id="2">帐号密码登录</mt-tab-item>
			</mt-navbar>
			<mt-tab-container swipeable v-model="selected">	
			  <mt-tab-container-item id="1">
				<input type="number" class="phone" v-model="phoneNumber" placeholder="请输入手机号"/>
				<input type="text" class="sendyzm" v-model="inputCode" placeholder="请输入图形验证码"/>
				<div class="createYzm" @click="changeYzm()">
					<canvas id="canvas" width="100" height="30"></canvas>
				</div>
				<input type="text" class="yzm" v-model="smsCode" placeholder="请输入短信验证码"/>
				<div class="writeYzm" v-bind:class="{ notActive: isActive }" @click="sendCode()"  v-model="smsYzm">{{smsYzm}}</div>
				<div class="login" @click="codeLogin()">登录</div>
			  </mt-tab-container-item>
			   <mt-tab-container-item id="2">
			    <input type="text" class="zhanghao" placeholder="请输入帐号" v-model="zhanghao"/>
				<input type="password" class="mima" placeholder="请输入密码" v-model="mima"/>
				<div class="login" @click="login()">登录</div>
			  </mt-tab-container-item>
			  </mt-tab-container>
		</div>
		<!--用户注册模块-->
		<div v-show="isRegister" class="register_box">
			<p>新用户注册</p>
			<input type="text" class="zhanghao" placeholder="请输入帐号" v-model="r_Zhanghao"/>
			<input type="password" class="mima" placeholder="请输入密码" v-model="r_Mima1"/>
			<input type="password" class="mima" placeholder="请在再次确认密码" v-model="r_Mima2"/>
			<div class="register" @click="goregister()">注册</div>
		</div>
		  <div class="regist">是否有帐号？现在去<span v-model="register" @click="l_rSwitch">{{register}}</span></div>
		</div>
	</div>
</template>

<script>
	import {hex_sha1} from '../../static/js/SHA1.js';
	import { Toast } from 'mint-ui';
	import { Navbar, TabItem } from 'mint-ui';
	import qs from 'qs';
	const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';
//	var post_data = {  
//	    templateid:3055220,  
//	    mobiles:'["17317106362"]',  
//	    params:'["IM JC"]'  
//	};//这是需要提交的数据  
//	var qs = require('querystring');
//	var content = qs.stringify(post_data);  
	export default{
		name:"User",
		components:{
			Navbar, TabItem, Toast
		},
		data(){
			return{
				selected:'1',
				zhanghao:'',
				mima:'',
				phoneNumber:'',
				picCode:'',
				inputCode:'',
				smsCode:'',
				smsYzm:'发送验证码',
				isActive:0,
				isRegister:false,
				register:'',
				r_Zhanghao:'',
				r_Mima1:'',
				r_Mima2:''
			}
		},
		
		methods:{
			CheckSumf:function(a){
//				return hex_sha1(a);
			},
			changeYzm(){
			var c = document.getElementById("canvas");
				var ctx = c.getContext("2d");
				var rg = ctx.createRadialGradient(100,100,30,100,100,100);
 				rg.addColorStop(0,"#000")
				rg.addColorStop(1,"#000")
				ctx.strokeStyle = rg;
				ctx.strokeRect(0,0,300,300)
				ctx.font = "Italic 20px microsoft yahei";
				ctx.textBaseline = "top";
				ctx.textAlign = "left";
				
				this.picCode = parseInt(Math.random()*10000);
				if(this.picCode<999){
					this.picCode= "0"+this.picCode
				}
 				ctx.clearRect(0,0,400,400)
				ctx.strokeText(this.picCode,0,0);
			},
			goregister(){
				if(this.r_Mima1){
					if(this.r_Mima2){
						if(this.r_Mima1==this.r_Mima2){
							
							this.$http.post(API_PROXY + 'http://datainfo.duapp.com/shopdata/userinfo.php',{status:'register',userID:this.r_Zhanghao,password:this.r_Mima1},{emulateJSON:true}).then(res=>{
								console.log(res)
								if(res.data==0){
									alert("用户名已存在！")
								}else if(res.data==2){
									alert("数据库请求超时！")
								}else{
									alert("请求成功！")
								}
								
							})
						}else{
							alert("两次密码不一致！")
						}
					}else{
						alert("请再次确认密码！")
					}
				}else{
					alert("请输入密码！")
				}
			},
			login(){
				if(this.zhanghao===''){
					alert('请输入帐号')
				}else if(this.mima===''){
					alert("请输入密码")
				}
				this.$http.post(API_PROXY + 'http://datainfo.duapp.com/shopdata/userinfo.php',{status:'login',userID:this.zhanghao,password:this.mima},{emulateJSON:true}).then(res=>{
					if(res.data==0){
						alert('用户名不存在')
					}else if(res.data==2){
						alert('密码错误')
					}else{
						localStorage.setItem('user',res.data.userID)
						Toast({
						  message: '登录成功',
						  position: 'bottom',
						  duration: 3000
						});
						this.$router.push({
		            		name:"Info"
		      	   		 })
					}
				})
//				this.$http.jsonp('http://datainfo.duapp.com/shopdata/getuser.php',{params: {userID:this.zhanghao}}).then(res=>{
////					console.log(res)
//				})
			},
			codeLogin(){
				if(this.phoneNumber){
					if(this.inputCode != this.picCode){
						alert("图形验证码错误！")
					}else{
						this.$http.post(API_PROXY +'https://m.huoguo.com/v1.4/services/common/jsonLogin.do',
								 {
									mobile : this.phoneNumber,
									smsCode : this.smsCode,
									deviceType : 4,
									tokenCode:'aa7e5936a75d5462f5e5d52eb6915eeb413958c7a578975f1dc8f9cf18fa5888'
								}
								).then(res=>{
									console.log(res)		
									if(res.data.code == 1){
										this.$router.push({
						            		name:"Info"
						      	   		 })
									}else{
										alert('短信验证码错误或已过期!')
									}
						})
					}
				}else{
					alert('请输入手机号！')
				}
			},
			sendCode(){
//				var CurTime =  parseInt(new Date().getTime() / 1000) + "";	//生成时间戳
//				var Nonce = this.CheckSumf(CurTime)	//生成随机数
//				var appSecret = '2c17981799f3';//app密钥
//				var AppKey = '512cec8d7f5c4e436df14e628fbd89c2'; //应用对应appkey
//				var CheckSum = this.CheckSumf(Nonce+''+CurTime+''+appSecret); //SHA1加密值 
//				this.$http.post(API_PROXY +"https://api.netease.im/sms/sendcode.action" + content,
//						 {
//							'AppKey':'512cec8d7f5c4e436df14e628fbd89c2',
//							'Nonce':Nonce,
//							'CurTime':CurTime,
//							'CheckSum':CheckSum,
//							'Content-Type': "application/x-www-form-urlencoded;charset=utf-8"
//						}
//						).then(res=>{
//					console.log(res.bodyText)					
//				})
				var myreg=/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;  
				if(!myreg.test(this.phoneNumber)){
					alert('请输入正确的手机号')
				}else
				if(!isNaN(this.smsYzm)){
					return;
				}
				else{
					this.smsYzm = 60;		
					this.isActive=1;
				}
				var T = setInterval(()=>{
					if(this.smsYzm>0){
						this.smsYzm--;
					}else{
						this.smsYzm = '发送验证码';
						this.isActive=0;
						window.clearInterval(T);
					}
				},1000)
				this.$http.post(API_PROXY +'https://m.huoguo.com/v1.4/services/common/jsonSendSmsCode.do',
						 {
							mobile:this.phoneNumber,
							tokenCode:'aa7e5936a75d5462f5e5d52eb6915eeb413958c7a578975f1dc8f9cf18fa5888',
							smsType:'1'
						}
						).then(res=>{
					console.log(res)					
				})
			},
			l_rSwitch(){
				this.isRegister=!this.isRegister;
				this.register = this.isRegister? '登录':'免费注册'
			}
		},
		beforeMount:function(){					//判断是否处于登录状态
			if(localStorage.getItem('user')){
				this.$router.push({
		            		path:"/info", 
		            		name:"Info"
		      	   		 })
			}
		},
		mounted:function(){
			this.changeYzm();
			this.register = this.isRegister? '登录':'免费注册'
		}
	}
</script>

<style scoped>
	.boxAll{background: #fff;height: 100vh;}
	.box{height: 60vw;background:url(../../static/img/6d5a4a2f3860526ae961538de8f9f222.jpg);background-size:cover;padding:0 9vw ;}
	.box .head{height: 60vw;background: rgba(255,255,255,0.3);display: flex;}
	.box .head .cont{width: 20vw;height: 34vw;margin:auto;}
	/*.box .head .cont .img{width: 20vw;height: 20vw;background: url(../../static/img/logo1024.png);background-size:cover ;}*/
	
	.box .head .cont p{text-align: center;line-height: 14vw;color: #e4393c;}
	.box .mint-navbar{display: block;overflow: hidden;}
	/*.mint-tab-item-label{display: inline;}*/
	.box .mint-navbar .mint-tab-item{flex: 0;display: block;width: 78px;float: left;color: #aaa;border-bottom: 2px solid #aaa;padding: 2px 0;}
	.box .mint-navbar .mint-tab-item:last-child{float: right;}
	.box .mint-navbar .mint-tab-item.is-selected{border-bottom:5px solid red;color: black;}
	.box input{border: none;outline:none;border-bottom: 1px solid #aaa;height: 12vw;font-size: 12px;}
	.phone{width: 100%;margin-top: 5vw;}
	.sendyzm{width: 70%;}
	.yzm{width: 70%;}
	.createYzm{width: 20%;height: 8vw;float: right;padding-top: 4vw;}
	.writeYzm{width: 30%;height: 12vw;border-bottom: 1px solid #aaa;float: right;font-size: 12px;text-align: center;line-height: 12vw;color: #93a8fd;}
	.boxAll .login{width: 100%;height: 14vw;background: #aaa;text-align: center;line-height: 14vw;color: #fff;border-radius: 2vw;margin-top: 8vw;font-size: 14px;}
	.boxAll .register{width: 100%;height: 14vw;background: #aaa;text-align: center;line-height: 14vw;color: #fff;border-radius: 2vw;margin-top: 8vw;font-size: 14px;}
	.zhanghao{width: 100%;margin-top: 5vw;}
	.mima{width: 100%;}
	.boxAll .mint-tab-container-item p{font-size: 12px;color: #aaa;text-align: center;margin-top: 5vw;} 
	.regist{color: #aaa;font-size: 12px;text-align: center;position: absolute;top: 144vw;width: 100%;left: 0;}
	.regist span{color: #e4393c;}
	.notActive{color: #CCCCCC;}
	
	.register_box p{color: red;font-size: 12px;width:60px;border-bottom: 2px solid red;margin: 0 auto;}
</style>
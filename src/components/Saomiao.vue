<template>
	<div>
		<mt-header title="二维码扫描">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
	<div class="mui-content">
		<div class="canvas" id="canvas"></div>
	</div>
	<div class="saomiao_btn" @click="sgd">{{offoron}}</div>
	</div>
</template>
 <script type="text/javascript" src="static/js/mui.min.js" ></script>
		<link rel="stylesheet" href="static/css/mui.min.css" />
 		<script type="text/javascript" charset="utf-8">
      	mui.init();
    </script>
<script>
	document.addEventListener("plusready", function() {
        // 注册返回按键事件
        plus.key.addEventListener('backbutton', function() {
            // 事件处理
            window.history.back();
        }, false);
    });
	
	export default{
		name:"Saomiao",
		data(){
			return{
				shanguang:false,
				offoron:"打开闪光灯"
			}
		},
		methods:{
			sgd(){
				this.shanguang = !this.shanguang
				this.offoron = (this.shanguang==false?"打开闪光灯":"关闭闪光灯")
			},
			onmarked(type,result){
	   			console.log(type,result)
	 			alert(result)
				window.location = result	
			}
		},
		mounted:function(){
			document.addEventListener('plusready',function(){
			console.log("all ok")
			})
   			var scan = new plus.barcode.Barcode("canvas")
   			scan.onmarked = this.onmarked;
   			scan.start()
   			scan.setFlash(this.shanguang)//闪光灯
		}
	}
</script>

<style scoped>
	 .mint-header{background: red;height: 20vw  !important;}
	 .mint-header-title{margin-top: 5vw  !important;}
	 .mint-tabbar{display:none !important;}
	 .canvas{width: 100%;height: 300px;background: #000;}
	 .saomiao_btn{height: 10vw;width:100%;background: #ccc;margin-top:10vw;text-align: center;line-height: 10vw;color: #fff;z-index: 4;}
</style>
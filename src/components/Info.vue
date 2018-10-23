<template>
	<div>
	<div class="info_top">
		<div class="shezhi" @click="shezhi()"><img src="../../static/img/profile_ic_setting.png"></div>
		<div class="me_box">
			<div></div>
			<p>156****6361</p>
		</div>
	</div>	
		<div class="info_bottom">
			<div>
				<p>43013</p>
				<p>总运动步数</p>
			</div>
			<div>
				<p>33103</p>
				<p>总运动里程</p>
			</div>
		</div>
		<ul class="info_list">
		</ul>
	
	
	</div>
</template>

<script>

export default{
	name:'Info',
	components:{

	},
	methods:{
		shezhi(){
			this.$router.push({
		            		name:"Shezhi"
		      	   		 })
		}
	}
}
</script>

<style scoped>
	.shezhi{position: absolute;right: 6vw;top: 6vw;}
	.shezhi img{width: 7vw;}
	.info_top{height: 37.5vh;background-size:cover;overflow: hidden;position: relative;}
	.me_box{width: 20vw;height: 28vw;margin: 14vw auto 2vw;}
	.me_box div{width: 20vw;height: 20vw;background: url(../../static/img/3.jpg);background-size:cover;border-radius: 50%;}
	.me_box p{color: #fff;font-size: 11px;}
	.info_bottom{display: flex;justify-content: space-between;width: 100%;}
	.info_bottom div{flex:auto ;background: rgba(0,0,0,0.1);margin-top: 20px;}
	.info_bottom p{text-align: center;margin: 4vw 0;font-size: 13px;}
	.info_list{display: flex;justify-content: space-between;flex-wrap: wrap;margin-top: 6vw;}
	.info_list li{background: #fff;list-style: none;margin-top: 0.5vw;border-radius:1vw ;}
	.info_list li div{width: 10vw;height: 10vw;margin: 0 auto;padding: 5vw 7.4vw;}
	.info_list li img{width: 10vw;height: 10vw;}
	.info_list li p{text-align: center;font-size: 12px;color: #666;margin-bottom: 3vw;}
</style>
<template>
	<div class="licai">
		<mt-header fixed title="展示中心"></mt-header>
		<div class="zhanwei"></div>
		<div class="box">
			<mt-navbar fixed v-model="selected" style="width:100%;" id="ttt">
				<mt-tab-item id="1">实时运动</mt-tab-item>
				<mt-tab-item id="2">历史记录</mt-tab-item>
				<mt-tab-item id="3">我的信息</mt-tab-item>
			</mt-navbar>
		</div>
		<mt-tab-container swipeable v-model="selected">
			<mt-tab-container-item id="1">
				<div id="liveCharts" style="height: 120vw;width: 90vw;margin: 14vw auto 0;"></div>
				<ul class="liveInfo">
					<li v-model="todySteps">今日运动步数：{{todySteps}}步</li>
					<li v-model="todyDistance">今日运动距离：1630米</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="2">
				<div id="recentCharts" style="height: 120vw;width: 90vw;margin: 14vw auto 0;"></div>
				<ul class="recentInfo">
					<li class="average">
						<p>平均步数</p>
						<p>2901</p>
					</li>
					<li class="all">
						<p>总步数</p>
						<p>20312</p>
					</li>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="3">
				<ul id="personInfoCharts" style="height: 120vw;width: 90vw;margin: 14vw auto 0;">
				</ul>
				<ul class="personInfo">
					<li>身高：<input type="number" v-model="personInfo.height"/></li>
					<li>体重：<input type="number" v-model="personInfo.weight"/></li>
					<li @click="updataPersonInfo()">+</li>
				</ul>
				<p class="warmPrompt" v-show="ifWeight">您的体重属于{{ifWeight}}范围</p>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import { Shake } from '../../static/js/Shake.js';
	import { Navbar, TabItem } from 'mint-ui';
	const API_PROXY = 'https://bird.ioliu.cn/v1/?url=';
	export default {
		name: "Licai",
		components: {
			Navbar,
			TabItem
		},
		data() {
			return {
				selected: '1',
				historyInfo:[],
				personInfo: {
					height: '',
					weight: '',
					time:''
				},
				ifWeight:'',
				latitude: '', //经度
				longitude: '', //纬度
				todySteps: 2133,
				todyDistance:'',
				realspeedInfo:[],
				allSteps:0,
				meanSteps:0
			}
		},
		methods: {
			readeLocal(){
				if(localStorage.getItem('sData')){
					var theData = JSON.parse(localStorage.getItem('sData'))
					this.todySteps = theData[theData.length-1].steps
				}
			},
			stepsFun() {
				var myShakeEvent = new Shake({
					threshold: 2, // 摇动阈值  
					timeout: 500 // 事件发生频率，是可选值  
				});
				// 监听设备动作  
				myShakeEvent.start();

				//添加一个监听事件  
				window.addEventListener('shake', shakeEventDidOccur, false);

				//摇动回调函数  
				var that = this;
				function shakeEventDidOccur() {
					that.todySteps++;
					if(localStorage.getItem('sData')){		//如果有历史数据
						var theData = JSON.parse(localStorage.getItem('sData'))
						console.log(theData.length)
						if(theData.length>7){			//存数数据大于7,删除第一个
							theData.shift();	
						}
						if(theData[theData.length-1].dataId == new Date(new Date().setHours(0,0,0,0)).getTime()){  //如果是今日数据，删除属于今日的之前数据，加以更新
							theData.pop();	 
						}
						theData.push({			//添加最新数据
							dataId:new Date(new Date().setHours(0,0,0,0)).getTime(),
							steps:that.todySteps
						})
						localStorage.setItem('sData',JSON.stringify(theData))  //存储到本地
//						that.todySteps = 
					}else{		//没有历史数据，直接创建
						var newDate=[];
						newDate.push({
							dataId:new Date(new Date().setHours(0,0,0,0)).getTime(),
							steps:that.todySteps
						})
						localStorage.setItem('sData',JSON.stringify(newDate))
					}
					console.log(JSON.parse(localStorage.getItem('sData')))
				}
			},
			uploadInfo() { //上传轨迹点
				this.getLocation(); //刷新当前gps
				this.theDis(); //获取运动距离
			},
			theDis() { //计算轨迹点之间的距离
				this.$http.get(API_PROXY + 'http://yingyan.baidu.com/api/v3/track/gettrack', {
					params: {
						ak: 'CGqRICFWM6nV6Qbn6tOQ6Um1ziqKDOKG', //uerAK
						service_id: 162314, //应用编号
						entity_name: 'jc', //监控对象name
//						start_time: Math.round(new Date(new Date().setHours(0,0,0,0)).getTime() / 1000), //开始检测轨迹时间(当前设置为今日凌晨时间戳)
						start_time: Math.round(new Date().getTime() / 1000 - 4),
						end_time: Math.round(new Date().getTime() / 1000 - 1), //截至检测时间
						is_processed: 1, //1：打开轨迹纠偏，返回纠偏后轨迹。0：关闭
						process_option: 'need_denoise=1,need_mapmatch=0,radius_threshold=0,transport_mode=driving' //纠偏选项，具体查看官方api：http://lbsyun.baidu.com/index.php?title=yingyan/api/v3/trackprocess
					}
				}).then(res => {
					console.log(res)
					if(this.realspeedInfo.length>20){
						this.realspeedInfo.length.shift()
					}
					this.realspeedInfo.push({
						timeId:new Date(res.data.points.create_time*1000).getSeconds(),
						speed:res.data.points.speed //纵坐标速度(km/h)
					})
					this.liveCharts(this.realspeedInfo);
				})
			},
			getDistance(){
				var that = this;
				this.$http.get(API_PROXY + 'http://yingyan.baidu.com/api/v3/track/getdistance', {
					params: {
						ak: 'CGqRICFWM6nV6Qbn6tOQ6Um1ziqKDOKG', //uerAK
						service_id: 162314, //应用编号
						entity_name: 'jc', //监控对象name
						start_time: Math.round(new Date(new Date().setHours(0,0,0,0)).getTime() / 1000), //开始检测轨迹时间(当前设置为今日凌晨时间戳)
						end_time: Math.round(new Date().getTime() / 1000 - 1), //截至检测时间
						is_processed: 1, //1：打开轨迹纠偏，返回纠偏后轨迹。0：关闭
						process_option: 'need_denoise=1,need_mapmatch=0,radius_threshold=0,transport_mode=driving' //纠偏选项，具体查看官方api：http://lbsyun.baidu.com/index.php?title=yingyan/api/v3/trackprocess
					}
				}).then(res => {
					console.log(res)
					if(res.data.status==0){						
						this.todyDistance = res.data.distance;
						
						if(localStorage.getItem('dData')){		//如果有历史数据
							var theData = JSON.parse(localStorage.getItem('dData'))
							console.log(theData.length)
							if(theData.length>7){			//存数数据大于7,删除第一个
								theData.shift();	
							}
							if(theData[theData.length-1].dataId == new Date(new Date().setHours(0,0,0,0)).getTime()){  //如果是今日数据，删除属于今日的之前数据，加以更新
								theData.pop();	 
							}
							theData.push({			//添加最新数据
								dataId:new Date(new Date().setHours(0,0,0,0)).getTime(),
								distance:that.todyDistance
							})
							localStorage.setItem('dData',JSON.stringify(theData))  //存储到本地
						}else{		//没有历史数据，直接创建
							var newDate=[];
							newDate.push({
								dataId:new Date(new Date().setHours(0,0,0,0)).getTime(),
								distance:that.todyDistance
							})
							localStorage.setItem('dData',JSON.stringify(newDate))
						}
						console.log(JSON.parse(localStorage.getItem('dData')))
							
							
					}else{
						console.log("distance require err!")
					}
				})
			},
			updataPersonInfo(){
				if(this.personInfo.weight&&this.personInfo.height){		//验证input
					if(this.historyInfo==""){
						this.historyInfo.push({"time":new Date().getDate(),"weight":this.personInfo.weight})
						if(this.personInfo.height-95<this.personInfo.weight){
								this.ifWeight = "超重";
						}else if(this.personInfo.height-115>this.personInfo.weight){
								this.ifWeight = "偏瘦";
						}else{
							    this.ifWeight = "正常";
						}
						this.personInfoCharts(this.historyInfo)
						this.personInfo.weight ='';				
					}else{
						if(new Date().getDate()==this.historyInfo[this.historyInfo.length-1].time){		//验证时间
							alert("今天已经录入体重，请明天再来哦！")
						}else{
							if(this.historyInfo.length>6){
								this.historyInfo.shift()
							}
							this.historyInfo.push({"time":new Date().getDate(),"weight":this.personInfo.weight})
							if(this.personInfo.height-95<this.personInfo.weight){
									this.ifWeight = "超重";
							}else if(this.personInfo.height-115>this.personInfo.weight){
									this.ifWeight = "偏瘦";
							}else{
								    this.ifWeight = "正常";
							}
							this.personInfoCharts(this.historyInfo)
							this.personInfo.weight ='';						
						}					
					}
				}else{
					alert("请输入您的个人信息!")
				}
			},
			getLocation() { //获取gps
				if(navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((position) => {
						this.longitude = position.coords.longitude;
						this.latitude = position.coords.latitude;
						//				         console.log(this.longitude)
						//				         console.log(this.latitude)
						this.$http.post(API_PROXY + 'http://yingyan.baidu.com/api/v3/track/addpoint', {
							ak: 'CGqRICFWM6nV6Qbn6tOQ6Um1ziqKDOKG',
							service_id: 162314,
							entity_name: 'jc',
							latitude: this.latitude, //纬度
							longitude: this.longitude, //经度
							loc_time: Math.round(new Date().getTime() / 1000), //当前时间戳
							coord_type_input: 'wgs84',
						}).then(res => {
									console.log(res)		
						})
					});
					
					
				} else {
					alert("您的设备不支持gps定位");
				}
			},
			liveCharts(realspeedInfo) {
				var time = [];
				var speed = [];
				realspeedInfo.forEach((v)=>{
					time.push(v.time)
					speed.push(v.speed)
				})
				let liveCharts = this.$echarts.init(document.getElementById('liveCharts'))
				liveCharts.setOption({
					tooltip: {
						trigger: 'axis',
					},
					title: {
						left: 'center',
						text: '实时运动展示',
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					xAxis: {
						name: 'h',
						type: 'category',
						boundaryGap: false,
						data: [9,10,11,12,1,2,3,4]
					},
					yAxis: {
						name: '速度(km/h)',
						type: 'value',
						boundaryGap: [0, '0']
					},
					series: [{
						name: '速度',
						type: 'line',
						smooth: true,
						symbol: 'none',
						sampling: 'average',
						itemStyle: {
							normal: {
								color: 'rgb(255, 70, 131)'
							}
						},
						areaStyle: {
							normal: {
								color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgb(255, 158, 68)'
								}, {
									offset: 1,
									color: 'rgb(255, 70, 131)'
								}])
							}
						},
						data: [4,8,0,11,3,20,10,2,0]
					}]
				})
			},
			recentCharts() {
				var stepsGroup = [];
				var daysGroup = [];
				if(localStorage.getItem('sData')){		//如果有历史数据
						var theData = JSON.parse(localStorage.getItem('sData'))
						for(var i=0;i<theData.length;i++){
							stepsGroup.push(theData[i].steps)
							this.allSteps = this.allSteps + theData[i].steps;
							daysGroup.push(new Date(theData[i].dataId).getDate())
						}
						this.meanSteps = this.allSteps/theData.length;
					}

				let recentCharts = this.$echarts.init(document.getElementById('recentCharts'));
				recentCharts.setOption({
					color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: 'rgb(255, 158, 68)'
					}, {
						offset: 1,
						color: 'rgb(255, 70, 131)'
					}]),
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					title: {
						left: 'center',
						text: '最近运动量展示',
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [{
						name: "日",
						type: 'category',
						data:[28,29,30,1,2,3,4],
						axisTick: {
							alignWithLabel: true
						}
					}],
					yAxis: [{
						name: '距离/m',
						type: 'value'
					}],
					series: [{
						name: '展示数据',
						type: 'bar',
						barWidth: '60%',
						data: [3103,1005,2843,1443,4323,2009,899]
					}]
				});
			},
			personInfoCharts(infoGroup) {
				var weight = [63,65,62,60,63];
				var time = [28,29,30,1,2,3];
				infoGroup.forEach(v=>{
					weight.push(v.weight)
					time.push(v.time)
				})
				let personInfoCharts = this.$echarts.init(document.getElementById('personInfoCharts'));
				personInfoCharts.setOption({
					xAxis: {
						type: 'category',
							name: '日',
						data: time
					},
					yAxis: {
						type: 'value',
						name: '体重(kg)'
					},
					series: [{
						data: weight,
						type: 'line',
						symbol: 'triangle',
						symbolSize: 20,
						lineStyle: {
							normal: {
								color: 'green',
								width: 4,
								type: 'dashed'
							}
						},
						itemStyle: {
							normal: {
								borderWidth: 3,
								borderColor: 'yellow',
								color: 'blue'
							}
						}
					}]
				})
			},
		},
		beforeMount(){
			this.readeLocal()
		},
		mounted() {
			this.personInfoCharts(this.realspeedInfo)
//			var T = setInterval(()=>{
				this.uploadInfo();    //实时运动
//			},5000)
			this.recentCharts();
			this.stepsFun();
			this.getDistance();
		}
	}
</script>

<style>
	.liveInfo {
		list-style: none;
		text-align: center;
		width: 40vw;
		margin: 0 auto;
		border: 1px solid #C0C0C0;
		padding: 5px;
		border-radius: 8px;
		font-size: 12px;
	}
	
	.recentInfo {
		overflow: hidden;
	}
	
	.recentInfo li {
		list-style: none;
		width: 50vw;
		float: left;
	}
	
	.recentInfo li p {
		text-align: center;
	}
	
	.recentInfo li p:nth-child(2) {
		font-size: 20px;
	}
	
	.personInfo {
		height: 12vw;
		padding: 0 4vw;
	}
	
	.personInfo li {
		float: left;
		width: 40vw;
		list-style: none;
		font-size: 12px;
	}
	
	.personInfo li input {
		width: 20vw;
	}
	
	.personInfo li:nth-child(3) {
		width: 8vw;
		height: 8vw;
		border-radius: 50%;
		color: #fff;
		font-size: 8vw;
		text-align: center;
		line-height: 7vw;
		margin-top: -1vw;
		/*background: linear-gradient(right, rgb(255, 158, 68) 0%, rgb(255, 70, 131) 100%);*/
		background:cornflowerblue;
		
	}
	.warmPrompt{text-align: center;font-size: 12px;}
</style>
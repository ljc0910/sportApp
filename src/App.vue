<template>
	<div id="app">
		<HelloWorld></HelloWorld>
	</div>
</template>

<script>
	import HelloWorld from '@/components/HelloWorld'
	export default {
		name: 'app',
		components: {
			HelloWorld
		}
	}
	console.log('项目大多数接口来源于百度，稳定性较差。chorome不支持定位，可在ie上查看该功能。')
</script>

<style>

	/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
<template>
  <div class="hello">
      <router-view></router-view> <!-- router-view 路由出口, 路由匹配到的组件将渲染在这里 -->  
      <Footers></Footers>
  </div>
</template>

<script>
import Footers from "@/components/Footers"
export default {
  name: 'HelloWorld',
  components:{
				Footers
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

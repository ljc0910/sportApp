<template>
<div>
	<mt-search
	  cancel-text="取消"
	  placeholder="搜索帖子"
	  autofocus>
	</mt-search>
	<router-link to="/luntan">
		<div class="cancel">
		</div>
	</router-link>	
</div>	
	
</template>

<script>
</script>

<style>
	.mint-searchbar{background-color: red !important;}
	.mint-searchbar-cancel{color: #fff;}
	.cancel{width: 16vw;height: 10vw;background: orange;position: absolute;z-index: 999;top: 3vw;right: 2vw;opacity: 0;}
</style>
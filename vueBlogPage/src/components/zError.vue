<template>
    <transition name="fade" v-on:after-enter="afterEnter">
		<div class="zError" v-if="value" v-bind:style="errorStyle">{{errorMsg}}</div>
	</transition>
</template>
<script>
export default {
	props: {
		value: {
			default: true
		},
		errorMsg: {
			default: ''
		},
		errorStyle: {
			default: ''
		}

	},
	methods: {
		afterEnter:function () {
			setTimeout(()=> {
				this.$emit('input',false);
			}, 1000);
		}
	}
}
</script>
<style>
.zError{
	height:30px;
	line-height: 30px;
	font-size: 16px;
	text-align: right;
	color:rgba(250,34,34,0.80);
	border-radius: 5px;
}
 .fade-enter{opacity: 0}
.fade-enter-active{transition: opacity 0.25s}
.fade-leave-active{transition: opacity 0.25s;}
.fade-leave-to{ opacity: 0;} 
</style>
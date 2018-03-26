<template>
	<div class="alertBg center" v-if="isAlert">
		<div class="alertBox">
			<div class="closeBtn" v-if="showcloseBtn"></div>
			<div class="alertInfo">
				<div class="alertCon">{{alertMsg}}</div>
			</div>
			<div class="btnBoxAll" v-if="showBtns">
				<div class="btnBox">
				<slot name="btns">
					<div class="btn" @click="yesFn">{{btnMsg}}</div>
				</slot>
				</div>
			</div>
			
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			showcloseBtn:false,
			showBtns:true
		}
		
	},
	props: {
		isAlert:{
			default: false
		},
		alertMsg: {
			default: ''
		},
		btnMsg: {
			default: '确定'
		}
	},
	methods: {
		yesFn:function () {
			this.$emit('click');
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../assets/sass/assets.scss';
.alertBg{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0,0,0,0.5);
	text-align: center;
	.alertBox{
		background-color: #fff;
		border:1px solid #ddd;
		border-radius: 10px;
		padding: 20px;
		width: 400px;
		margin: auto;
		.alertInfo{
			font-size: 20px;
			color: #666;
			.alertCon{
				text-align: center;
				margin: 20px 0;
			}
		}
		.btnBoxAll{
			display: flex;
			justify-content:center;
			align-items: center;
			.btnBox{
				flex: 1;
				text-align: center;
				.btn{
					@include normal_btn;
					width: 100px;
					margin: auto;
				}
			}
			
		}
		.closeBtn{
			float: right;
			@include closeBtn;
		}
	}
}

</style>

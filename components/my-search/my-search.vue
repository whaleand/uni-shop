<template>
	<view class="my-search-container" :style="{'background-color':bgcolor}" @click="gotoSearch">
		<view class="my-search-box" :style="{'border-radius':radius+'px'}">
			<uni-icons type="search" size="20"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		props:{
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		methods:{
			gotoSearch(){
						uni.navigateTo({
							url:'/subpkg/search/search'
						})
					}
				}
			
		}
</script>

<style lang="scss">
.my-search-container{
	// 吸顶效果
	position: sticky;
	top: 0;
	z-index: 999;
	height: 50px;
	display: flex;
	align-items: center;
	padding:0 20px;
	.my-search-box{
		height: 40px;
		background-color: #fff;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 15px;
		.placeholder{
			margin-left: 5px;
		}
	}
}
</style>
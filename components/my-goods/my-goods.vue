<template>
	<view>
		<view class="goods-item">
			<!-- 左边部分 -->
			<view class="goods-item-left">
				<image :src="goods.goods_small_logo||defaultUrl" class="goods-pic"></image>
			</view>
			<!-- 右侧部分 -->
			<view class="goods-item-right">
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<view class="goods-price">
						￥{{goods.goods_price|tofixed}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		data() {
			return {
				defaultUrl:'/static/defaltPic.gif'
				
			};
		},
			
		props:{
			goods:{
				type:Object,
				default:{}
			}
		},
		filters:{
			// 处理商品价格,保留两位小数
			tofixed(num){
				return Number(num).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 5px;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left{
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
		margin-right: 5px;
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
			
		.goods-price{
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>
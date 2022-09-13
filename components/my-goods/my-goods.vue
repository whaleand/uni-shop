<template>
	<view>
		<view class="goods-item">
			<!-- 左边部分 -->
			<view class="goods-item-left">
				<radio :checked="goods.goods_small_state" color="#C00000" v-if="showRadio" @click="radioClick"></radio>
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
					<uni-number-box v-if="showRadio" :min="1" :value="goods.goods_count" @change="numChange"></uni-number-box>
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
			},
			showRadio:{
				type:Boolean,
				default:false
			}
		},
		filters:{
			// 处理商品价格,保留两位小数
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioClick(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_small_state:!this.goods.goods_small_state
				})
			},
			numChange(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:val
				})
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
		margin-right: 5px;
	}
	.goods-item-right{
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box	{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.goods-price{
			font-size: 16px;
			color: #c00000;
		}
	}
}
</style>
<template>
	<view class="">
		<view class="container" v-if="cart.length!==0">
				<!-- 收获地址区域 -->
				<my-address></my-address>
				<!-- 购物车标题 -->
				<view class="cart-title">
					<uni-icons type="shop" size="18"></uni-icons>
					<text class="cart-title-text">购物车</text>
				</view>
				<!-- 商品列表 -->
		
				<uni-swipe-action>
					<block v-for="(item,i) in cart" :key="i">
						<uni-swipe-action-item :right-options="options" @click="deleteGoods(item)">
							<my-goods :goods="item" :showRadio="true" @radio-change="radioChange" @num-change="numChange">
							</my-goods>
						</uni-swipe-action-item>
					</block>
		
				</uni-swipe-action>
				<my-settle></my-settle>
			</view>
			<view class="empty-cart" v-else>
				<image src="/static/empty-cary.png" mode=""></image>
				<text class="tip-text">空空如也~</text>
			</view>
		
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options: [{
					text: "删除",
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
			radioChange(e) {
				this.updateGoodsState(e)
			},
			numChange(e) {
				this.updateGoodsCount(e)
			},
			deleteGoods(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}

	}
</script>

<style lang="scss">
	.container{
		padding-bottom: 50px;
		.cart-title {
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			border-bottom: 1px solid #efefef;
			padding-left: 5px;
		
			.cart-title-text {
				margin-left: 10px;
			}
		}
		
	}
	.empty-cart{
		display: flex;
		margin-left: 50%;
		margin-top: 50%;
		transform: translate(-50%);
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 90px;
			height: 90px;
		}
		text{
			font-size: 14px;
			color: gray;
		}
	}
</style>

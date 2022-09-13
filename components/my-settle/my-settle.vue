<template>
	<view class="settle">
		<!-- 全选 -->
		<label class="radio" @click="changeState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计、 -->
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>

		</view>
		<!-- 结算按钮 -->
		<view class="btn-settle">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {

			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total','checkedGoodsAmount']),
			isFullCheck() {
				return this.checkedCount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeState() {
				this.updateAllGoodsState(!this.isFullCheck)
		},
	}
	}
</script>

<style lang="scss">
	.settle {
		position: fixed;
		z-index: 99;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5px;
		font-size: 14px;

		.radio {
			display: flex;
			align-items: center;
		}

		.amount-box {
			.amount {
				color: #C00000;
				font-weight: bold;
			}
		}

		.btn-settle {
			background-color: #C00000;
			color: white;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			min-width: 100px;
		}
	}
</style>

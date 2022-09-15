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
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-settle",
		data() {
			return {
				// 倒计时的秒数
			seconds:3,
			// 定时器
			timer:null
			};
		},
		computed: {
			...mapState('m_user',['token']),
			...mapGetters('m_cart', ['checkedCount', 'total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			isFullCheck() {
				return this.checkedCount === this.total
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			changeState() {
				this.updateAllGoodsState(!this.isFullCheck)
		},
		// 结算时判断
		settlement(){
			if(!this.checkedCount){
				return uni.$showMsg('请选择要结算的商品！')
			}
			if(!this.addstr){
				return uni.$showMsg('请选择收获地址！')
			}
			if(!this.token){
				return this.delayNavigate()
			}
			this.payment()
		},
		// 结算
		payment(){
				// const orderInfo={
				// 	order_price:0.01,
					
				// }
				// 支付api:uni.requestPayment
		},
		// 延时导航到my页面
			
		delayNavigate(){
			// 将秒数重置3
			this.seconds=3
			this.showTips(this.seconds)
			this.timer=setInterval(()=>{
				this.seconds--
				if(this.seconds<=0){
					clearInterval(this.timer)
					uni.switchTab({
						url:'/pages/my/my',
						// 跳转成功后,把该页面信息存到vuex
						success:()=> {
							this.updateRedirectInfo({
								// 跳转的方式
								openType:'switchTab',
								// 原来的路径
								from:'/pages/cart/cart'
							})
						}
					})
					return
				}
				this.showTips(this.seconds)
			},1000)
		},
		// 封装倒计时提示页面
		showTips(n){
			uni.showToast({
				icon:'none',
				title:'请登录后再结算！'+n+'秒之后自动跳转登录页！',
				mask:true,
				duration:1500
			})
		}
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

<template>
	<view>
		<!-- 选择收获的地址盒子 -->
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btnChoose" @click="chooseAddress">添加收获地址+</button>
		</view>
		<!-- 渲染的收获信息 -->
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-l">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				
				<view class="row1-r">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-l">
					收货地址：
				</view>
				<view class="row2-r">
					{{addstr}}
				</view>
			</view>
		</view>
		<!-- 底部边框线 -->
		<view class="">
			<image src="/static/cart_border@2x.png" class="address-border" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])	
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				// 调用这个api需要提前在manifest声明
					const [err,succ]=await uni.chooseAddress()
					if(err===null&&succ.errMsg==="chooseAddress:ok"){
						
						// this.address=succ
						this.updateAddress(succ)
					}
			}
		}
	}
</script>

<style lang="scss">
.address-border{
	width: 100%;
	height: 5px;
}
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-info-box{
	padding: 5px;
	font-size: 12px;
	.row1{
		display: flex;
		justify-content: space-between;
		align-items: center;
			
		.row1-r{
			display: flex;
		}
	}
	.row2{
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
		
			align-items: center;
		.row2-r{
			flex: 1;
		}
	}
}
</style>
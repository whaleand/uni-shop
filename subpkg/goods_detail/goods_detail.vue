<template>
	<!-- 防止goods_info为空时闪烁 -->
	<view v-if="goods_info.goods_name" class="container">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goods_info.pics" :key="i">
				<image :src="item.pics_big" mode="" @click="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息 -->
		<view class="goods-info">
			<view class="price">
				￥{{goods_info.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goods_info.goods_name}}
				</view>
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="yf">
				快递，免运费{{cart.length}}
			</view>
		</view>
		<!-- 商品详情 -->
		<rich-text :nodes="goods_info.goods_introduce"></rich-text>
		<!-- 商品导航组件 -->
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
</view>
</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				goods_info: {},
				options: [{
					icon: 'shop',
					text: '店铺',
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			}
		},
		computed:{
			...mapState('m_cart',['cart']),
			...mapGetters('m_cart',['total'])
		},
		watch:{
			// 方法形式第一次不会触发,改成对象形式
			// total(newVal){
			// 	// const find
			// 	this.options[1].info=newVal
			// }
			total:{
				handler(newVal){
				// const find
				this.options[1].info=newVal
			},
			immediate:true
			}
		},
		methods: {
			...mapMutations('m_cart',['addCart']),
			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				this.goods_info = res.message
			},
			preview(i) {
				// 图片预览uni.previewImage方法
				uni.previewImage({
					// 当前图片索引
					current: i,
					urls: this.goods_info.pics.map(item => item.pics_big)
				})
			},
			onClick(e){
				if(e.content.text==='购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				if(e.content.text==="加入购物车"){
					const goods={
						goods_id:this.goods_info.goods_id,
						goods_name:this.goods_info.goods_name,
						goods_price:this.goods_info.goods_price,
						goods_count:1,
						goods_small_logo:this.goods_info.goods_small_logo,
						goods_small_state:true
					}
					this.addCart(goods)
				}
			}
		},
		
		onLoad(options) {
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 750rpx;
	
	image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #C00000;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
			}

			.favi {
				width: 80px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;

				font-size: 12px;

			}

		}
	
	.yf {
			margin-top: 10px;
			font-size: 12px;
			color: gray;
		}
	}

	.goods_nav {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}
		
	.container{
		padding-bottom: 50px;
	}
</style>

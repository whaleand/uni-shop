<template>
	<view>
		<view class="scroll-view-container">
			<!-- 左边 -->
			<scroll-view class="left-scroll-container" scroll-y="true" :style="{height:winH+'px'}">
				<block v-for="(item,index) in cateList" :key="index">
					<view :class="['left-scroll-item',index===active?'active':'']" @click="activeChanged(index)">{{item.cat_name}}</view>
				</block>				
			</scroll-view>
			<!-- 右边 -->
			<scroll-view class="right-scroll-container" :scroll-top="scrollTop" scroll-y="true" :style="{height:winH+'px'}">
				<!-- 标题 -->
				<view v-for="(item2,i) in cateLevel2" :key="i">
					<view class="title">
						/{{item2.cat_name}}/
					</view>
					<view class="cate-lv-container">
						<!-- 三级分类的item -->
							<view class="cate-lv3-item" v-for="(item3,i3) in item2.children" :key="i3" @click="gotoGoodsList(item3)">
								<image :src="item3.cat_icon" mode=""></image>
								<text>{{item3.cat_name}}</text>
					</view>
			
						</view>
					
				</view>
			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 可用屏幕高度
				winH:0,
				// 分类列表
				cateList:[],
				active:0,
				// 二级分类
				cateLevel2:[],
				// 滚动条位置
				scrollTop:0
			};
		},
		methods:{
				async getCateList(){
					const {data:res}=await uni.$http.get('/api/public/v1/categories')
					if(res.meta.status!=200){
						return uni.$showMsg()
					}
					// console.log(res);
					this.cateList=res.message
					this.cateLevel2=this.cateList[this.active].children
				},
				activeChanged(i){
					this.active=i
					this.cateLevel2=this.cateList[i].children
					// 切换时重置滚动条位置
					this.scrollTop=this.scrollTop===0?1:0
				},
				gotoGoodsList(item){
					uni.navigateTo({
						url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
					})
				}
		},
		onLoad(){
			const sysInfo=uni.getSystemInfoSync()
			this.winH=sysInfo.windowHeight
			this.getCateList()
		}
	}
</script>

<style lang="scss">
.scroll-view-container{
	display: flex;
	.left-scroll-container{
		width: 120px;
		.left-scroll-item{
			line-height: 60px;
			font-size: 12px;
			text-align: center;
			background-color: #F7F7F7;
			&.active{
				background-color: #fff;
				position: relative;
				&::before{
					content: '';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
	}
.right-scroll-container{
	.title{
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		padding: 10px 0;
	}
	.cate-lv-container{
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item{
			width: 33.3%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 60px;
				height: 60px;
			}
			font-size: 12px;
			margin-bottom: 10px;
		}
	}
}
}
</style>

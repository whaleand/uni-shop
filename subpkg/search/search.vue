<template>
	<view class="">
		<!-- 搜索框 -->
		<view class="search-container">
			<uni-search-bar @input="input" bgColor="#FFFFFF" radius="20" cancelButton="none" focus="true">
			</uni-search-bar>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-if="searchResults.length===0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="25" @click="clean"></uni-icons>
				
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" inverted="true" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
		<!-- 搜索结果 -->
		<view class="sugg-list" v-else>
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				kw: '',
				searchResults: [],
				historyList:[],
			};
		},
		computed:{
		histories(){
			return [...this.historyList].reverse()
		}	
		},
		methods: {
			// 获取搜索结果
			async getSearchResults() {
				if (this.kw.length === 0) {
					return this.searchResults = []
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.kw
				})
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				this.pushHistory()
			},
			input(e) {
				// 防抖和节流
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchResults()
				}, 500)
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?id=' + item.goods_id
				})
			},
			// 搜素关键词加入历史记录,并去重
			pushHistory(){
				// 不能用unshift插到第一个，会导致key混乱
				// this.historyList.push(this.kw)
				// 利用集合删除kw,再把kw加入到末尾,最后还原数组
				const set=new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList=Array.from(set)
				// 持久化存储到本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			// 清空历史记录
			clean(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			},
			// 点击标签跳转
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			}
		},
		onLoad(){
			this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
		}
	}
</script>

<style lang="scss">
	.search-container {
		background-color: #C00000;
	}
.history-box{
	padding: 0 5px;
	.history-title{
		font-size: 18px;
		display: flex;
		justify-content: space-between;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		uni-tag{
			margin-right: 5px;
			margin-top: 5px;
		}
	}
}
	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			display: flex;
			justify-content: space-between;
			padding: 10px 0;
			border-bottom: 1px solid #efefef;

			.goods-name {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 15px;
			}
		}
	}
</style>

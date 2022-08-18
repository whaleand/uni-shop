<template>
	<view>
	<view class="goods-list">
		<view v-for="(goods,i) in GoodsList" :key="i" @click="gotoDetail(goods)">
			<my-goods :goods=goods></my-goods>
		</view>
		
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 10
				},
				GoodsList: [],
				total: 0,
				// 节流阀
				isLoading:false,
			}
		},
		methods: {
			async getGoodsList(cb) {
				this.isLoading=true
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading=false
				//判断回调  函数
				cb&&cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				this.GoodsList = [...this.GoodsList,...res.message.goods]
				this.total = res.message.total
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			}
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		onReachBottom(){
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕!')
			if(this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pagenum=1
			this.total=0
			this.isLoading=false
			this.GoodsList=[]
			// 重新发起数据请求
			this.getGoodsList(()=>{
				//停止下拉刷新 
				uni.stopPullDownRefresh()
			})
		},
		
	}
</script>

<style lang="scss">

</style>

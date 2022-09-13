export default {
	namespaced:true,
	state:()=>({
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
	}),
	mutations:{
		// 加购物车的方法
		addCart(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
			// 没找到则加进购物车
			if(!findResult){
				state.cart.push(goods)
			}else{
				// 找到数量加一
				findResult.goods_count++
			}
			this.commit('m_cart/saveStorage')
		},
		// 修改商品勾选状态
		updateGoodsState(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_small_state=goods.goods_small_state
			}
			// 持久化
			this.commit('m_cart/saveStorage')
		},
		// 修改商品数量
		updateGoodsCount(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_count=goods.goods_count
			}
			// 持久化
			this.commit('m_cart/saveStorage')
		},
		// 删除购物车商品
		removeGoodsById(state,goods_id){
			state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
			this.commit('m_cart/saveStorage')
		},
		// 全选和反选所有商品
		updateAllGoodsState(state,newState){
			state.cart.forEach(x=>x.goods_small_state=newState)
			this.commit('m_cart/saveStorage')
		},
		// 持久化
		saveStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		}
	},
	getters:{
		// 所有商品的总数量
		total(state){
			let c=0
			state.cart.forEach(x=>c+=x.goods_count)
			return c
		},
		// 已经勾选的商品数量
		checkedCount(state){
		return	state.cart.filter(x=>x.goods_small_state).reduce((total,item)=> total+=item.goods_count,0)
		},
		// 已勾选商品总价格
		checkedGoodsAmount(state){
			return state.cart.filter(x=>x.goods_small_state).reduce((total,item)=>{return total+=item.goods_count*item.goods_price},0).toFixed(2)
		}
	}
}
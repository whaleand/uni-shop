export default {
	namespaced:true,
	
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}')
	}),
	
	mutations:{
		updateAddress(state,address){
			state.address=address
			// 调用
			this.commit('m_user/saveAddressToStorage')
		},
		// 持久化存储
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		}
	},
	
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}
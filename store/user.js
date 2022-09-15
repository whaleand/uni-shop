export default {
	namespaced:true,
	
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token:uni.getStorageSync('token')||'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}'),
		redirectInfo:null
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
		},
		// 更新用户信息
		updateUserinfo(state,userinfo){
			state.userinfo=userinfo
			
			this.commit('m_user/saveUserInfoToStorage')
		},
		// 持久化存储信息到本地
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		// 更新token
		updateToken(state,token){
			state.token=token
			this.commit('m_user/saveTokenToStorage')
		},
		// 持久化存储token
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		// 更新重定向页面
		updateRedirectInfo(state,info){
			state.redirectInfo=info
		}
	},
	
	getters:{
		addstr(state){
			if(!state.address.provinceName) return ''
			return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}
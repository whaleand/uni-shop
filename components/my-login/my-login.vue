<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" open-type="getUserProfile" @click="getUserInfo" class="btn-login">一键登录</button>
		<text class="tips">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed:{
		...mapState('m_user',['redirectInfo'])	
		},
		methods:{
			...mapMutations('m_user',['updateUserinfo','updateToken','updateRedirectInfo']),
			getUserInfo(){
				uni.getUserProfile({
					desc:'test',
					success: (userinfo) => {
						// console.log(userinfo);
						this.updateUserinfo(userinfo.userInfo)
						this.getToken(userinfo)
					},
					fail(x) {
						uni.$showMsg('您取消了授权！')
					}
				})
			},
			async getToken(userinfo){
				// uni.login({
				//   provider: 'weixin',
				//   success: function (loginRes) {
				// 	  console.log(loginRes);
				//     // console.log(loginRes.authResult);
				//   }
				// });
				const [err,res]=await uni.login({				
				}).catch(err=>err)
				if(err||res.errMsg!=='login:ok') return uni.$showMsg('登录失败！')
				// console.log(res);其中res对象包含errMsg和code
				// 整理需要的信息对象
				const query={
					code:res.code,
					encryptedData:userinfo.encryptedData,
					iv:userinfo.iv,
					rawData:userinfo.rawData,
					signature:userinfo.signature
				}
				// console.log(query);
				// 发起请求
				const {data:loginResult}=await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// console.log(loginResult);
				// if(loginResult.meta.status!==200) return uni.$showMsg('登录失败！')
				uni.$showMsg('登录成功！')
				this.updateToken('wfsgs')
				this.navigateBack()
			},
			navigateBack(){
				if(this.redirectInfo&&this.redirectInfo.openType==='switchTab'){
					uni.switchTab({
						url:this.redirectInfo.from,
						complete: ()=> {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	
.login-container{
	height: 750rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	.btn-login{
		width: 90%;
		border-radius:100px ;
		margin: 15px 0;
		background-color: #C00000;
	}
	.tips{
		font-size: 14px;
		color: gray;
	}
	// 绘制半椭圆
	&::after{
		content: '';
		display: block;
		position: absolute;
		width: 100%;
		height: 40px;
		background-color: white;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
}
</style>
import { getOpenId } from "./index";

//获取用户授权
export function getSetting(auth, onSuccess, onFail) {
    //微信
    const wx = (res) => {
        if (res.authSetting[`scope.${auth}`]) {
            onSuccess(res)
        } else {
            onFail(res)
        }
    }
    //支付宝
    const my = (res) => {
        if (res.authSetting[auth]) {
            onSuccess(res)
        } else {
            onFail(res)
        }
    }
    mpvue.getSetting({
        success(res) {
            // // console.log(res)
            // if (res.authSetting[`scope.${auth}`]) {
            //     onSuccess(res)
            // } else {
            //     onFail(res)
            // }
            adapter({ wx, my }, res)
        }, fail(res) {
            // console.log(res)
        }
    })
}
function adapter(fn, params) {
    return fn[mpvuePlatform] && fn[mpvuePlatform](params)
}
//获取用户信息
export function getUserInfo(onSuccess, onFail) {
    mpvue.getUserInfo({
        success(res) {
            // console.log(res)
            const { userInfo } = res;
            if (userInfo) {
                onSuccess(userInfo)
            } else {
                onFail(res)
            }
        }, fail(res) {
            // console.log(res)
        }
    })
}
//保存到storage
export function setStorageSync(key, data) {
    mpvue.setStorageSync(key, data)
}
//获取在storage的数据
export function getStorageSync(key) {
    return mpvue.getStorageSync(key)
}

//获取openID 用户唯一标识符
export function getUserOpenId(cb) {
    mpvue.login({
        success(res) {
            if (res.code) {
                const { code } = res;
                getOpenId(code).then(response => {
                    const { data: { data: { openid } } } = response
                    setStorageSync('openId', openid)
                    cb && cb(openid)
                }).catch(err => {
                    console.log(err)
                })
            }
        }, fail(res) {
            console.log(res)
        }
    })
}

export function showLoading(title) {
    mpvue.showLoading({
        title, mask: true
    })
}

export function hideLoading() {
    mpvue.hideLoading();
}


export function showToast(title) {
    mpvue.showToast({
        title, duration: 2000
    })
}

//更改标题
export function setNavigationBarTitle(title) {
    if(mpvuePlatform==='wx'){
        mpvue.setNavigationBarTitle({ title })
    }
}
import { get, post } from "../utils/requesrt";
const API_URL = 'https://test.youbaobao.xyz:18081'
const APP_ID = 'wx271e480629d56133';
const APP_SECRET = '9d7af57a73465c66aa9389d67f1cf2b2';

export function getHomeData(params) {
    return get(`${API_URL}/book/home/v2`, params)
}

// https://test.youbaobao.xyz:18081/book/home/recommend/v2
export function recommend(params) {
    return get(`${API_URL}/book/home/recommend/v2`, params)
}

export function freeRead(params) {
    return get(`${API_URL}/book/home/freeRead/v2`, params)
}

export function hotBook(params) {
    return get(`${API_URL}/book/home/hotBook/v2`, params)
}
//获取openID
export function getOpenId(code) {
    return get(`${API_URL}/openId/get`, {
        appId: APP_ID,
        secret: APP_SECRET,
        code
    })
}
//注册用户 在后台生成一条记录
export function register(openId, userInfo) {
    return post(`${API_URL}/user/register`, {
        openId,
        plarform: mpvuePlatform,
        ...userInfo
    })
}

export function search(params) {
    return get(`${API_URL}/book/search`, params)
}

export function hotSearch() {
    return get(`${API_URL}/book/hot-search`)
}

export function bookDetail(params) {
    return get(`${API_URL}/book/detail`, params)
}

export function bookRankSave(params) {
    return get(`${API_URL}/book/rank/save`, params)
}

export function bookContents(params) {
    return get(`${API_URL}/book/contents`, params)
}

//判断图书是否在书架
export function bookisInShelf(params) {
    return get(`${API_URL}/book/shelf/get`, params)
}

//加入书架
export function bookshelfSave(params) {
    return get(`${API_URL}/book/shelf/save`, {
        shelf: JSON.stringify(params)
    })
}

//移除书架
export function bookshelfRemove(params) {
    return get(`${API_URL}/book/shelf/remove`, {
        shelf: JSON.stringify(params)
    })
}

//获取图书列表
export function bookSearchList(params) {
    return get(`${API_URL}/book/search-list`, params)
}

//获取分类列表
export function bookCategoryList() {
    return get(`${API_URL}/book/category/list/v2`)
}

//获取用户加入天数
export function userDay(params){
    return get(`${API_URL}/user/day`,params)
}
import ajax from './ajax'
import jsonp from 'jsonp'

export const resLogin = ({username, password}) => ajax('/login', {username, password}, "post")
export const resConfirmUser = (userId) => ajax('/user/confirm', {userId}, 'post')

//关于天气的请求,要求用jsonp，选用插件jsonp，异步回调函数，要想得到结果需要用promise包一下
export const reqWeather = function (name) {
    return new Promise((resolve, reject) => {
            jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${name}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`, (err, data) => {
                const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                return resolve({
                    imgUrl: dayPictureUrl,
                    weather
                })
            })
        }
    )

}
//请求分类列表的路由
export const reqCategory=(parentId)=>ajax('/manage/category/list', {parentId}, "get")
//添加分类列表的路由
export const addCategory=({categoryName,parentId})=>ajax('/manage/category/add', {categoryName,parentId}, "post")
//更新分类数据
export const updateCategory=({categoryId,categoryName})=>ajax('/manage/category/update', {categoryId,categoryName}, "post")
//删除分类列表数据
export const deleteCategory=(categoryId)=>ajax('/manage/category/delete', {categoryId}, "post")

export const reqProduct=(pageNum,pageSize)=>ajax('/manage/product/list', {pageNum,pageSize}, "get")
//添加商品分类
export const addProduct=({categoryId,pCategoryId,name,price,desc,detail})=>ajax('/manage/product/add',{categoryId,pCategoryId,name,price,desc,detail},'post')
export const updateProduct=({_id,categoryId,pCategoryId,name,price,desc,detail})=>ajax('/manage/product/update',{_id,categoryId,pCategoryId,name,price,desc,detail},'post')
export const updateStatus=({productId,status})=>ajax('/manage/product/updateStatus', {productId,status}, "post")
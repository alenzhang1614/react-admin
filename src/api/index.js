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
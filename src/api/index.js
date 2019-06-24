import ajax from './ajax'
import jsonp from 'jsonp'

export const resLogin = ({username, password}) => ajax('/login', {username, password}, "post")
export const resConfirmUser = (userId) => ajax('/user/confirm', {userId}, 'post')

//关于天气的请求,要求用jsonp，选用插件jsonp
export const reqWeather = function(name){
    return new Promise((resolve,reject) => {
            jsonp(`http://api.map.baidu.com/telematics/v3/weather?location=${name}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,  (err, data) => {
                const {dayPictureUrl, weather} = data.results[0].weather_data[0];
                console.log(dayPictureUrl, weather)
                return resolve({
                    imgUrl: dayPictureUrl,
                    weather
                })
            })
        }
    )

}
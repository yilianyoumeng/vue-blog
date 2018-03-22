var Rxports = {
    api:'/apiEx',
    /**
	  * 获取url传过来的参数
	  * @param name 	获取的参数
	  * @param Url 		自定义获取参数的链接
	  * @param return
	*/
	getUrlQuery:function (name,Url){
		//URL GET 获取值
		var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"),url = Url || location.href;
		if (reg.test(url))
		return unescape(RegExp.$2.replace(/\+/g, " "));
		return "";
	},
}
export default Rxports;
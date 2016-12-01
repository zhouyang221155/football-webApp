var util = {//对象字面量的方法，可写多个公共方法和属性
	setFocus:function(el){
		el.addClass("active").siblings().removeClass("active");
	}
}

//将这个公共的方法暴露出去
module.exports=util;
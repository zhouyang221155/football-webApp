var guideTpl=require("../templates/guide.string");

SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	bindEvents:{//绑定视图事件
		show:function(){//视图显示出来之后执行的回调函数
			var mySwiper=new Swiper('.swiper-container',{
				autoplay:2000,
				loop:false
			})
		}
	},
	bindActions:{//绑定元素事件
		"go.index":function(){
			SPA.open("index")//跳转到某一个视图，参数为跳转到的视图名称
		}
	}
})
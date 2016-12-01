//引入模板
var indexTpl = require("../templates/index.string");


//定义视图
SPA.defineView("index",{
	html:indexTpl,
	plugins:["delegated"],
	modules:[{//引入子视图
		name:"content",//子视图名称
		defaultTag:"home",//默认视图
		views:["home","search","my"],//子视图集
		container:".m-wrapper"//放置子视图的容器
	}],
	bindActions:{
		"switch.tabs":function(e,data){
			this.modules.content.launch(data.tag);
		},
		"switch.my":function(){
			SPA.open("my",{
				ani:{
					name:"dialog"
				}
			})
		}
	}
})

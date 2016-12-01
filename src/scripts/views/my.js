var myTpl=require("../templates/my.string");

SPA.defineView("my",{
	html:myTpl,
	ani:{
		name:"dialog"
	},
	plugins:["delegated"]
})
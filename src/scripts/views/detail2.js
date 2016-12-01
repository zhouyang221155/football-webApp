var detailTpl=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){//暴露到html中
			vm.imgsrc = null;
            vm.title = null;
            vm.description = null;
            vm.isShowLoading = true;
		}
	}],
	init:{
		detailId:""
	},
	bindEvents:{
		beforeShow:function(){
			var that=this;
			var vm=this.getVM();//获取到所有vm
			var data=this.param;
			//ajax请求，渲染详细页
			$.ajax({
				url:"/api/getLivelist.php",
				type:"get",
				data:{
					rtype:"more",
					/*id:data.id*/
				},
				success:function(result){
					var data=result.data;
					vm.imgsrc=data.imgsrc;
					vm.title=data.title;
					vm.description=data.description;
					that.detailId=data.id;
					console.log(data);
				},
				error:function(){
					alert("数据请求失败");
				}
			})
		},
		show:function(){
			var olSwiper=new Swiper('#olBox',{
				loop:false,
				onSlideChangeStart:function(swiper){
					var idx=swiper.activeIndex;
					var tags=$("#title li");
					util.setFocus(tags.eq(idx));
				}
			});	
		}
	}
	/*bindActions:{
		"back":function(){
            this.hide({
            	detailId:this.detailId
            });
		}
		"switch.tabs":function(e,data){
			this.modules.content.launch(data.tag);

	}}*/
})

var detailTpl=require("../templates/detail.string");

SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.title = "";
			vm.imgsrc = "";
			vm.description = "";
			vm.isShowLoading = true;
		}
	}],
	bindEvents:{
		show:function(){//因为获取id发生在点击之后，有条件，所以写在show中
			//获取点击列表时传递的参数
			var that = this;
			var param = this.param;
			var vm = this.getVM();
			//ajax请求数据，渲染详细页
			$.ajax({
				url:"api/getLiveDetail.php",
				type:"get",
				data:{
					id:param.id
				},
				success:function(result){
					var data = result.data;
					vm.title = data.title;
					vm.imgsrc = data.imgsrc;
					vm.description = data.description;
					/*注意：为看效果写setTimeout，上线的产品中不写，已经够慢了*/
					setTimeout(function(){
						vm.isShowLoading = false;
					},1000)
				},
				error:function(){
					alert("数据请求失败！");
				}
			})

		}
	},
	bindActions:{
		"go.back":function(){
			this.hide();//this是对当前视图的引用
			//console.log(this);为什么打印出来的对象的属性的值都是null？？？？
		}
	}
})

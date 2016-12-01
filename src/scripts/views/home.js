var homeTpl=require("../templates/home.string");
var util=require("../util/util");



SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			//所有数据通过vm向外(html)暴露
			vm.homeData=[];
		}
	}],
	init:{
		vm:null,
		originArr:[],
		//将一维数组转化为二维数组
		dataFormat:function(data){
			var tempArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[i*2],data[i*2+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{
		beforeShow:function(){
			//ajax请求，渲染主页
			var that=this;
			that.vm=this.getVM();//spa封装的获取vm的方法
			$.ajax({
				url:"/api/getLivelist.php",
				type:"get",
				data:{
					rtype:"origin"
				},
				success:function(result){
					that.originArr=result.data;
					that.vm.homeData=that.dataFormat(result.data);//转化后的二维数组
				},
				error:function(){
					alert("数据请求失败");
				}
			});
		},
		show:function(){
			//使this在ajax的作用域内可用
			var that=this;
			that.vm=this.getVM();//spa封装的获取vm的方法

			var homeSwiper=new Swiper('#home-swiper',{
				loop:false,
				onSlideChangeStart:function(swiper){
					var idx=swiper.activeIndex;
					var tags=$("#title li");
					util.setFocus(tags.eq(idx));
				}
			});
			var contentSwiper=new Swiper('#content-swiper',{
				loop:false,
				onSlideChangeStart:function(swiper){
					var idx=swiper.activeIndex;
					var tags=$("#nav_title li");
					util.setFocus(tags.eq(idx));
				}
			});


			//下拉刷新 上拉加载
			var myScroll=this.widgets.homeListScroll;//获取滚动的对象
			var scrollSize=30;//上拉刷新盒子的高度


			//隐藏下拉刷新
			myScroll.scrollBy(0,-scrollSize);


			//获取head中的img（因为类要加载img上）及其当前的状态
			var headImg=$(".head img");
			var headImgHasClass=headImg.hasClass("up");
			//获取foot中的img（因为类要加载img上）及其当前的状态
			var footImg=$(".foot img");
			var footImgHasClass=footImg.hasClass('down');


			//当滚动时
			myScroll.on('scroll',function(){
				//获取当前滚动条的位置
				var y=this.y;
				//计算最大的滚动范围
				var maxY=this.maxScrollY-y;

				//当下拉刷新时
				if(y>=0){
					!headImgHasClass && headImg.addClass("up");
					return "";
				}

				//当上拉加载时
				if(maxY>=0){
					!footImgHasClass && footImg.addClass("down");
					return "";
				}

			})

			//当滚动结束时
			myScroll.on("scrollEnd",function(){

			//下拉刷新
				if(this.y>=-scrollSize && this.y<0){
					myScroll.scrollTo(0,-scrollSize);
					//myScroll.refresh();
					headImg.removeClass("up");
				}else if(this.y>=0){
					headImg.attr("src","/footballApp/images/ajax-loader.gif");
					$.ajax({
						url:"/api/getLivelist.php",
						type:"get",
						data:{
							rtype:"refresh"
						},
						success:function(result){
							var data=result.data;
							setTimeout(function(){
							//替换数据，refresh替换原始数据
								//that.vm.homeData=that.dataFormat(data);
							//追加数据(refresh数据追加到origin数据前且可重复刷新)
								that.originArr=data.concat(that.originArr);//重复
								that.vm.homeData=that.dataFormat(that.originArr);
								myScroll.scrollTo(0,-scrollSize);
								//myScroll.refresh();
								headImg.attr("src","/footballApp/images/arrow.png");
								headImg.removeClass("up");	
							},1000)						
						},
						error:function(){
							alert("数据请求失败！");
						}
					});
					myScroll.refresh();
				}

			//上拉加载
				//计算最大的滚动范围
				var maxY=this.maxScrollY-this.y;
				var self=this;
				if(maxY>-scrollSize &&　maxY<0){
					myScroll.scrollTo(0,this.maxScrollY+scrollSize);
					//myScroll.refresh();
					footImg.removeClass("down");
				}else if(maxY>=0){
					footImg.attr("src","/footballApp/images/ajax-loader.gif");
					$.ajax({
						url:"/api/getLivelist.php",
						type:"get",
						data:{
							rtype:"more"
						},
						success:function(result){
							var data=result.data;
							setTimeout(function(){
							//替换数据，more替换原始数据
								//that.vm.homeData=that.dataFormat(data);
							//追加数据(more数据追加到origin数据前且可重复刷新)
								that.originArr=that.originArr.concat(data);//重复
								that.vm.homeData=that.dataFormat(that.originArr);
								myScroll.scrollTo(0,self.maxScrollY+self.y);
								myScroll.refresh();
								footImg.attr("src","/footballApp/images/arrow.png");
								footImg.removeClass("down");	
							},1000)						
						},
						error:function(){
							alert("数据请求失败！");
						}
					});
					myScroll.refresh();
				}	
			})


		}
	},
	bindActions:{
		"go.detail":function(e,data){
			console.log(data);
			SPA.open("detail",{//切换视图时传递参数
				param:data
			});
		}
	}
})

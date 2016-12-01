var searchTpl=require("../templates/search.string");

SPA.defineView("search",{
	html:searchTpl,
    plugins:["delegated"],
    bindEvents:{
    	show:function(){
    		var searchScroll=this.widgets.searchScroll;
    		searchScroll.on("scroll",function(){
    			var y = Math.abs(this.y);
    			if(y>=200){
    				if($(".m-search").siblings(".m-nav").length>0){
    					//return false;
                        "";
    				}else{
    					$(".m-search").after($(".m-nav").clone(true).addClass("fixed"));
    				}
    			}else{
    				$(".m-nav.fixed").remove();
    			}
    		
    		})
    	}
    }
})


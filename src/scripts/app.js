// 引入spa类库
require("./lib/spa.min");
// 引入swiper类库
require("./lib/swiper-3.3.1.min");



// 引入视图文件
require("./views/index");
require("./views/home");
require("./views/search");
require("./views/mine");
require("./views/guide");
require("./views/quit");
require("./views/detail");
require("./views/master")

SPA.config({
	indexView:"guide"
})

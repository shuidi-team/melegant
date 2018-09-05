/**
 * tabBar.js
 * @Des:    实现移动页面中的tabBar中间件
 * @Thinking：   ...
 * @Author: kuan
 * Create on 18-8-28 下午7:44
 */
MElegant.regist("Widget.TabBar");
Widget.TabBar = function(){

    /**
     * 设置view列表
     * @param tabBarJson
     * @param id
     */
    this.setViewList = function (tabBarJson,id) {
        var _tabBarJson = [{text:"未知", url:"", iconPath:"", selectedIconPath:"", clickCallBack:null}];
        // 合并tabBar的配置数据，并加载tabBar绑定的页面
        tabBarJson = Object.extends(_tabBarJson,tabBarJson);
        // 通过绑定的id获取div位置
        var divs = document.getElementById(id);
        // 自定义的css通用样式
        var styles = _tabStyle();
        // 整合tabBar的样式
        divs.setAttribute("style",styles["top_div"]+";"+divs.getAttribute("style"));
        // 获取缓存的样式
        var cache = _itemHtml(tabBarJson,id);
        // tabBar的数据
        var itemJson = tabBarJson;
        // 构造格式化的tabBar
        var val = _stringFormat(itemJson,cache,false,false);
        //计算margin的左右宽度
        var widths=parseInt(((screen.availWidth||screen.width)-(itemJson.length * 50))/(itemJson.length*2));
        // 替换像素
        val=val.replace(/[{]margin[}]/g,widths+"px");
        // 最终显示的tabBar
        divs.innerHTML=val;

        /**
         * 点击加载
         */
        itemClickShowView = function (guid,url) {
            itemJson.filter(function(obj){
                if(obj["guid"]==guid){
                    if(typeof obj["clickCallBack"]=="function"){
                        obj["clickCallBack"](obj);
                    }else{
                        RootController.addView(url);
                        // Source.loadView(url);
                    }
                }
            });
            // RootController.addView(url);

        };

    };


    /**
     * 合并tabBar的配置数据
     * @param destination
     * @param source
     * @returns {*}
     */
    Object.extends = function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
            if(typeof source[property]=="object"){
                destination[property]["guid"]= guid();
            }else{
                destination["guid"]= guid();
            }
            // 应该在此处通过 destination.url 来加载View
            // Source.loadView(destination.url);
        }
        // Source.loadView()
        return destination;
    };


    /**
     * 生成guid的方法
     */
    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        })
    }

    /**
     * 处理数据 块
     * @param json          后台json数据
     * @param cacheHtmls    trName 前台模板tr
     * @param isClear       清空{margin},方便调试，默认false就正常输出样式
     * @param isSplite      替换多余符号“,”，方便调试，默认false就正常输出样式
     * @returns {string}
     */
    function _stringFormat (json, cacheHtmls,isClear,isSplite) {
        // isSplite||false;
        // isClear||true;
        var tbodyHtml = "";
        for (var i = 0; i < json.length; i++) {
            var innerHtmls = cacheHtmls;
            for (var _json in json[i]) {
                var value = eval("(json[i]." + _json + ")");//==>json[i].ID
                var regex = new RegExp("[{]" + _json + "[}]", "g");
                innerHtmls = innerHtmls.replace(regex, value);
            }
            tbodyHtml +=isClear==true? innerHtmls.replace(/[{][a-zA-Z0-9]*[}]/g,""):innerHtmls;
            isSplite==true&&(tbodyHtml+=i>= json.length-1?"":",");
        }
        return tbodyHtml;
    }

    /**
     * tab item 的装饰HTML
     * @param {Object} json
     * @param {Object} id
     * @returns {string}
     */
    function _itemHtml (json, id){
        return '<div style="width:50px;height: 50px;float: left;margin-left: {margin};margin-right: {margin};">'+
            '<a href="#" onclick=itemClickShowView(\'{guid}\',\'{url}\') style="text-decoration: none;">'+
            '<div style="width: 30px;height: 30px;padding-left:10px;padding-right:10px;">'+
            '<img src="{iconPath}" style="width:100%;height:100%"></div>'+
            '<div style="text-align:center"><div style="color: #848484;font-size: 8px;padding-top: 4px;">{text}</div></div>'+
            '</a>'+
            '</div>';
    }

    function _tabStyle() {
        return {
            top_div:"position: fixed;margin-bottom: 0px;height: 50px;bottom: 0px;margin-left: 0px;z-index:2;width: 100%;margin-right: 0px;left: 0px;background-color:#fff;border-top: 1px solid #e6e3e3;",
        };
    }



};
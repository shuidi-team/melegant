/**
 * tabBar.js
 * @Des:    实现移动页面中的tabBar中间件
 * @Thinking：   ...
 * @Author: kuan
 * Create on 18-8-28 下午7:44
 */
MElegant.regist("Widget.TabBar");
Widget.TabBar = function(){
    // // 字体颜色
    // this._color = "#000";
    // // 选中后字体颜色
    // this._selectedColor = "#555";
    // // tabBat背景颜色
    // this._backgroundColor = "#fff";
    // this._tabList =[];
    // // tabList: [
    // //     {
    // //         "viewPath": "sample/view/index",
    // //         "iconPath": "sample/images/index.png",
    // //         "selectedIconPath": "sample/images/index-se.png",
    // //         "text": "首页"
    // //     }
    // // ],
    //
    // /**
    //  * 设置view列表
    //  * @param tabBarList
    //  */
    // this.setViewList = function (tabBarList) {
    //     var tabIndex = this._tabList.length;
    // };
    //
    // /**
    //  * 通过index显示视图
    //  */
    // this.showViewAtIndex = function () {
    //
    // };

    /**
     * 具体创建tab的方法
     * @param json
     * @param id
     */
    this.createTab = function (json, id) {
        var _json=[{text:"未知",url:"",iconPath:"",clickCallBack:null}];
        json = Object.extends(_json,json);

        var divs = document.getElementById(id);

        var styles= this.tabStyle();

        divs.setAttribute("style",styles["top_div"]+";"+divs.getAttribute("style"));

        var cache = this.itemHtml(json,id);
        var itemJson = json;
        var val = this.stringFormat(itemJson,cache,false);
        //计算margin的左右宽度
        var widths=parseInt(((screen.availWidth||screen.width)-(itemJson.length * 50))/(itemJson.length*2));
        val=val.replace(/[{]margin[}]/g,widths+"px");
        divs.innerHTML=val;

        itemClick = function(guid,url){
            itemJson.filter(function(obj){
                if(obj["guid"]==guid){
                    if(typeof obj["clickCallBack"]=="function"){
                        obj["clickCallBack"](obj);
                    }else{
                        window.location.href=url;
                    }
                }
            });
        }

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
     * 合并数据
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
        }
        console.log(destination);
        return destination;
    };

    /**
     * 处理数据 块
     * @param json          后台json数据
     * @param cacheHtmls    trName 前台模板tr
     * @param isClear       是否替换多余符号
     * @param isSplite
     * @returns {string}
     */
    this.stringFormat = function (json, cacheHtmls,isClear,isSplite) {
        isSplite||false;
        isClear||true;
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
    };

    /**
     * tab item 的装饰HTML
     * @param {Object} json
     * @param {Object} id
     * @returns {string}
     */
    this.itemHtml = function (json, id){
        return '<div style="width:50px;height: 50px;float: left;margin-left: {margin};margin-right: {margin};">'+
            '<a href="#" onclick="itemClick(\'{url}\')" style="text-decoration: none;">'+
            '<div style="width: 30px;height: 30px;padding-left:10px;padding-right:10px;">'+
            '<img src="{iconPath}" style="width:100%;height:100%"></div>'+
            '<div style="text-align:center"><div style="color: #848484;font-size: 8px;padding-top: 4px;">{text}</div></div>'+
            '</a>'+
            '</div>';
    };

    this.tabStyle = function  () {
        return {
            top_div:"position: fixed;margin-bottom: 0px;height: 50px;bottom: 0px;margin-left: 0px;z-index:2;width: 100%;margin-right: 0px;left: 0px;background-color:#fff;border-top: 1px solid #e6e3e3;",
        };
    };



};
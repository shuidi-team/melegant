/**
 * tabBar.js
 * @Des:    实现移动页面中的tabBar中间件
 * @Thinking：   ...
 * @Author: kuan
 * Create on 18-8-28 下午7:44
 */

MElegant.regist("Widget.TabBar");
Widget.TabBar = {
    // 字体颜色
    _color: "#000",
    // 选中后字体颜色
    _selectedColor: "#555",
    // tabBat背景颜色
    _backgroundColor: "#fff",
    _tabList :[],
    // tabList: [
    //     {
    //         "viewPath": "sample/view/index",
    //         "iconPath": "sample/images/index.png",
    //         "selectedIconPath": "sample/images/index-se.png",
    //         "text": "首页"
    //     }
    // ],

    /**
     * 设置view列表
     * @param tabBarList
     */
    setViewList:function (tabBarList) {
        var tabIndex = this._tabList.length;

    },

    /**
     * 通过index显示视图
     */
    showViewAtIndex:function () {

    }
};
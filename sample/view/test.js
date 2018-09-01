/**
 * test.js
 * @Des:    ...
 * @Thinking：   ...
 * @Author: kuan
 * Create on 18-8-31 下午9:42
 */
MElegant.regist('View.Test');
View.Test   = function(){
    MElegant.extend(this,Widget.View,arguments);
    MElegant.extend(this,Widget.TabBar,arguments);
    // tabBar的json格式配置
    var tabBarConfig=[
        {
            text:"首页",
            iconPath:'http://debug.cool/images/avatar.jpeg',
            selectIconPath:'http://debug.cool/images/avatar.jpeg',
            url:"View.Index",
            clickCallBack:function(obj){
                alert(obj.url);
            }
        },
        {
            text:"测试",
            iconPath:'http://debug.cool/images/avatar.jpeg',
            selectIconPath:'http://debug.cool/images/avatar.jpeg',
            url:"View.Test"
        }
    ];
    this.setViewList(tabBarConfig,"main-tabBar");
};

View.Test.prototype = {

};
/**
 * Created by reco on 2018/8/16.
 */
MElegant.regist('View.Index');
View.Index   = function(){
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

View.Index.prototype = {

};


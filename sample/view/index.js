/**
 * Created by reco on 2018/8/16.
 */
MElegant.regist('View.Index');
View.Index   = function(){
    MElegant.extend(this,Widget.View,arguments);

    MElegant.extend(this,Widget.TabBar,arguments);
    var tab=[
        {
            text:"首页",
            url:"http://debug.cool",
            iconPath:'http://debug.cool/images/avatar.jpeg',
            clickCallBack:function(obj){
                alert(obj.url);
            }
        },
        {
            text:"个人",
            iconPath:'http://debug.cool/images/avatar.jpeg',
            url:"http://debug.cool"
        },
        {
            text:"设置",
            iconPath:'http://debug.cool/images/avatar.jpeg',
            url:"http://debug.cool"
        }
    ];
    this.createTab(tab,"bottom");

};

View.Index.prototype = {

};


/**
 * test.js
 * @Des:    ...
 * @Thinking：   ...
 * @Author: kuan
 * Create on 18-8-31 下午6:17
 */
MElegant.regist('View.Test');
View.Test = function(){
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

View.Test.prototype = {

};
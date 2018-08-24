/**
 * Created by reco on 2018/8/16.
 */
MElegant.regist("Widget.View");
Widget.View = function(){
    this.destroy = function(){
    };
    this.shown = function(){
    };
    this.showIn = function(container){
        container.append($(this.viewClass.html));
    };
    this.find = function(){

    }
};

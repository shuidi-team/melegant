/**
 * Created by reco on 2018/8/24.
 */
MElegant.regist("WindowLayer");
WindowLayer = function(){
    this.animate = true;
    this.dom = null;
    this.view = null;
    this.index = -1;
};
WindowLayer.prototype = {
    in:function(){
        console.log(this.animate);
        if(this.animate) {
            this.dom.css({
                'transform':'translate('+screen.availWidth+'px,0)',
                'left': 0,
                'top': 0,
                'positon':'absolute'
            });
            RootController.mainContainer.append(this.dom);
            this.dom.animate({
                translateX: '0',
                duration:200
            },function(){
                this.view.shown();
            }.bind(this));
        } else {
            RootController.mainContainer.append(this.dom);
            this.view.shown();
        }
    },
    out:function(){
        if(this.animate) {
            this.dom.animate({
                'translateX':screen.availWidth+'px'
            },function(){
                this.view.destroy();
                this.dom.remove();
            }.bind(this));
        } else {
            this.view.destroy();
            this.dom.remove();
        }
    }
};
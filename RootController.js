/**
 * Created by reco on 2018/8/13.
 */
MElegant.regist('RootController');

RootController = function(){
    this._windowStack = [];
    this._mainContainer = null;
};

RootController.prototype = {
    init:function(mainContainer){
        this._mainContainer = mainContainer;
        this._mainContainer.css({
            'width':'100%',
            'height':"100%",
            'overflow':'hidden',
            'position':'relative'
        });
        window.addEventListener("popstate", this._popState.bind(this), false);
    },
    /**
     * 添加一个view进场
     * @param view
     * @param animate 是否带动画
     */
    addView:function(view,animate) {


        var windowIndex = this._windowStack.length;
        var window = this._createWindow(windowIndex);
        this._windowStack.push(window);

        Source.loadView(view,function(){
            var viewName = eval(view.split('/').join('.'));



            window.view = new viewName();
            window.view.load();
        });

        if(animate) {
            window.css({
                'transform':'translate('+screen.availWidth+'px,0)',
                'left': 0,
                'top': 0,
                'positon':'absolute'
            });
            this._mainContainer.append(window);
            window.animate({
                translateX: '0',
                duration:200
            });
        } else {
            this._mainContainer.append(window);
        }
    },
    /**
     * 出栈一个view
     * @param animate 是否带动画
     */
    popView:function(animate) {

    },
    _createWindow:function(index) {
        var newWindow = $('<div class="window"></div>')
        newWindow.css({
            'width':"100%",
            'height':"100%",
            'z-index':index,
            'background-color':"red"
        });
        return newWindow;
    },
    _popState:function(state) {

    }
};


/**
 * Created by reco on 2018/8/13.
 */
MElegant.regist('RootController');

RootController =  {
    _windowStack : [],
    mainContainer : null,
    _currentIndex : -1,
    init:function(mainContainer){
        this.mainContainer = mainContainer;
        this.mainContainer.css({
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
    addView:function(viewClassString,animate) {


        var windowIndex = this._windowStack.length;
        if(windowIndex==0) {
            animate = false;
        }
        this._currentIndex = windowIndex;
        var window = this._createWindow(windowIndex);
        window.animate = animate;
        this._windowStack.push(window);

        Source.loadView(viewClassString).then(function(viewClass){
            window.view = new viewClass();
            window.view.viewClass = viewClass;
            window.view.showIn(window.dom);
        }.bind(this)).then(function(){
            window.in();
            if(windowIndex>0) {
                history.pushState({"viewClassName": viewClassString}, null, "#" + viewClassString + '-' + windowIndex);
            }
        });
    },
    /**
     * 出栈一个view
     * @param animate 是否带动画
     */
    popView:function(animate) {

    },
    /**
     *
     * @param index
     * @returns {WindowLayer}
     * @private
     */
    _createWindow:function(index) {
        var window = new WindowLayer();
        var newWindow = $('<div class="window"></div>');
        newWindow.css({
            'width':"100%",
            'height':"100%",
            'z-index':index,
            'background-color':"red"
        });
        window.dom = newWindow;
        window.index = index;
        return window;
    },
    _popState:function(state) {
        var hash = location.hash;
        var pageInfo = /^#(.+)\-(\d+)/.exec(hash);
        var className = pageInfo[1];
        var index = pageInfo[2];
        var topWindow = this._windowStack[this._currentIndex];
        topWindow.out();
    }
};


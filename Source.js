MElegant.regist('Source');
Source = {
    LOADING_STATUS_LOADING:0,
    LOADING_STATUS_DONE:1,
    jsCache:{},
    loadView:function(viewClassString){
         return this.loadJs(viewClassString);
    },
    loadJs:function(viewClassString){
        return new Promise(function(complete,rej){
            var cacheInfo =  this.jsCache[viewClassString];
            if(cacheInfo) {
                if (cacheInfo.status == this.LOADING_STATUS_DONE) {
                    complete(cacheInfo.viewClass);
                } else if (cacheInfo.status == this.LOADING_STATUS_LOADING) {
                    cacheInfo.completedStack.push(complete);
                }
            } else {
                this.jsCache[viewClassString]  = {
                    'status':this.LOADING_STATUS_LOADING,
                    'completedStack':[complete]
                };

                var js = this.getViewPathFromClassName(viewClassString) + '.js';
                var script = document.createElement('script');
                script.src = js;
                script.onload = function(){
                    var viewClass = eval(viewClassString.split('/').join('.'));
                    this.loadHtml(viewClassString).then(function(html){
                        viewClass.html = html;
                        return this.loadCss(viewClassString);
                    }.bind(this)).then(function() {
                        this.jsCache[viewClassString].viewClass = viewClass;
                        this.jsCache[viewClassString].status = this.LOADING_STATUS_DONE;
                        this.jsCache[viewClassString].completedStack.forEach(function(callback){
                            callback(viewClass);
                        });
                    }.bind(this));
                }.bind(this);
                document.body.appendChild(script);
            }

        }.bind(this));
    },
    loadHtml:function(viewClassString){
        return new Promise(function(complete,rej){
            var htmlPath = this.getViewPathFromClassName(viewClassString) + '.html';
            $.get(htmlPath, function(response){
                complete(response);
            }.bind(this));
        }.bind(this));
    },
    loadCss:function(viewClassString){
        return new Promise(function(complete,rej){
            var cssPath = this.getViewPathFromClassName(viewClassString) + '.css';
            $.get(cssPath, function(response){

                response = ScreenAdJust.formatCss(response);
                var style = document.createElement('style');
                style.innerHTML = response;
                document.head.appendChild(style);

                complete();
            }.bind(this));
        }.bind(this));
    },
    getViewPathFromClassName:function(className){
        return className.toLowerCase().split('.').join('/');
    }
};
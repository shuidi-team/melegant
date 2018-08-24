MSimple.regist('Source');
Source = {
    LOADING_STATUS_LOADING:0,
    LOADING_STATUS_DONE:1,
    jsCache:{},
    loadView:function(viewPath,complete){
        var cacheInfo =  this.jsCache[viewPath];
        if(cacheInfo) {
            if (cacheInfo.status == this.LOADING_STATUS_DONE) {
                complete();
            } else if (cacheInfo.status == this.LOADING_STATUS_LOADING) {
                cacheInfo.completedStack.push(complete);
            }
        } else {
            this.jsCache[viewPath]  = {
                'status':this.LOADING_STATUS_LOADING,
                'completedStack':[complete]
            };
        }
        var js = viewPath + '.js';
        var script = document.createElement('script');
        script.src = js;
        script.onload = function(){
            this.jsCache[viewPath].status = this.LOADING_STATUS_DONE;
            this.jsCache[viewPath].completedStack.forEach(function(callback){
                callback();
            });
        }.bind(this);
        document.body.appendChild(script);
    }
};
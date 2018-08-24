MElegant.regist('Source');
Source = {
    LOADING_STATUS_LOADING:0,
    LOADING_STATUS_DONE:1,
    jsCache:{},
    loadView:function(viewClassString,complete){
        var cacheInfo =  this.jsCache[viewClassString];
        if(cacheInfo) {
            if (cacheInfo.status == this.LOADING_STATUS_DONE) {
                complete();
            } else if (cacheInfo.status == this.LOADING_STATUS_LOADING) {
                cacheInfo.completedStack.push(complete);
            }
        } else {
            this.jsCache[viewClassString]  = {
                'status':this.LOADING_STATUS_LOADING,
                'completedStack':[complete]
            };
        }




        var js = this.getViewPathFromClassName(viewClassString) + '.js';
        var script = document.createElement('script');
        script.src = js;
        script.onload = function(){
            this.jsCache[viewClassString].status = this.LOADING_STATUS_DONE;
            this.jsCache[viewClassString].completedStack.forEach(function(callback){
                callback();
            });
        }.bind(this);
        document.body.appendChild(script);
    },
    getViewPathFromClassName:function(className){
        return className.toLowerCase().split('.').join('/');
    }
};
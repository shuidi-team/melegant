var ScreenAdJust = {
    psdWidth:1080,
    setPsdWidth:function(width){
        this.psdWidth = width;
    },
    formatCss:function(content){
        content = content.replace(/(\d+)cm/g,function(all,v){
            return this.getRealPx(parseInt(v))+'px';
        }.bind(this));
        return content;
    },
    getRealPx : function(px){
        return  Math.round(screen.availWidth/this.psdWidth*px);
    }
};
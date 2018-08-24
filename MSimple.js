/**
 * Created by reco on 2018/8/13.
 */

var MSimple  = {
    regist:function(className,ClassObject) {
        ClassObject = ClassObject || function(){};
        var path = className.split(".");
        var current = window;
        for(var i=0;i<path.length;i++) {
            if(i!=(path.length-1)) {
                if(typeof current[path[i]]=='undefined') {
                    current[path[i]] = {};
                }
            } else {
                if(typeof current[path[i]] =='undefined') {
                    current[path[i]] = ClassObject;
                } else {
                    throw className+"命名空间重复,请修改！";
                    return false;
                }
            }
            current = current[path[i]];
        }
    },
    extend:function(instance,parent,arg){
        instance.extend = parent;
        instance.extend.apply(instance,arg);
        instance.extend = null;
        delete instance.extend;
    }
};


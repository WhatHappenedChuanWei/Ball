/**
 * 字典
 */

　  function dictionary() {
    　　this.count=0;
        this.keys = new Array();
        this.values = new Array();
    }

    dictionary.prototype.containKey=function(key){
        var index = this.checkKeyId(key);
        if(index != -1)
        {
            return true;
        }
        return false;
    },

    dictionary.prototype.add=function(key,value){
        var index = this.checkKeyId(key);
        if(index != -1)
        {
            //print(key + " is exit");
            //alert(key + " is exit");
            console.log(this);
            console.log(key + " is exit");
            return;
        }       
        this.keys[this.count] = key;
        this.values[this.count] = value;
        ++this.count;
        // console.log(key+":"+value);
    },

    dictionary.prototype.remove=function(key){
        var index = this.checkKeyId(key);
        if(-1==index)
        {
            console.log(key+" does not exist");
            return;
        }
        this.keys.splice(index,1);
        this.values.splice(index,1);
        --this.count;
    }

    dictionary.prototype.get=function(key){
        var index = this.checkKeyId(key);
        if(-1==index)
        {
            console.log(key+" does not exist:");
            return null;
        }
        return this.values[index];
    }

    dictionary.prototype.checkKeyId=function(key){
        for(var i=0;i<this.count;i++)
        {
            if(key==this.keys[i])
            {
                return i;
            }
        }
        return -1;
    }

    dictionary.prototype.getNameByIndex = function(index)
    {
        return this.keys[index];
    }

module.exports = dictionary;
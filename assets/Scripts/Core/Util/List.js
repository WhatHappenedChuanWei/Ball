
function List(){

     this.count = 0;
     this.values = new Array();
 }
 List.prototype.length=function()
 {
     return this.count;
 }

 List.prototype.checkValue = function(value)
 {   
     for(var i=0;i<this.count;i++)
     {  
        var isExist = false;      
        isExist = this.values[i]==value;
         if(isExist)
         {
             return i;            
         }
     }
     return -1;
 },
 List.prototype.contains = function(value)
 {   
     for(var i=0;i<this.count;i++)
     {  
        var isExist = false;      
        isExist = this.values[i]==value;
         if(isExist)
         {
             return true;            
         }
     }
     return false;
 },
 List.prototype.add = function(value)
 {
    this.values.push(value);
    this.count = this.count + 1;
 },
 
 List.prototype.removeByIndex = function(index)
 {
    this.values.splice(index,1);
    this.count = this.count-1;
 },

 List.prototype.remove = function(value)
 {
    var index = this.checkValue(value);
    if(index >= 0)
    {
        this.values.splice(index,1);
        this.count = this.count-1;
    }
 },

 List.prototype.get = function(index)
 {
    if(index>=this.count)
    {
        console.log("Array crossing");
        return;
    }
    return this.values[index];
 },

 List.prototype.clear = function()
 {
    this.values.splice(0,this.count);
    this.count = 0;
 },

 module.exports = List;
 

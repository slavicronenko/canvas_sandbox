function Parts() {
    this.parts = [];
}
Parts.prototype = {
    renderAll: function (context) {
        var i = 0,
            l = this.parts.length;

        for (i; i < l; i += 1) {
            this.parts[i].render(context);
        }
    },
    add: function(item){
        if(typeof item.render === 'function'){
            this.parts.push(item);
        } else {
            throw new Error('This item hace no "render" method!');
        }
    }
};
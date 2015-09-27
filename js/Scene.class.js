function Scene(id){
    $this = this;
    this.canvas = document.getElementById(id);
    this.context = this.canvas.getContext('2d');
    this.parts = new Parts();

    if(!this.canvas){
        throw  new DOMException('DOM Element "' + id + '" not found!');
    }

    (function animloop() {
        requestAnimFrame(animloop);
        $this.context.clearRect(0, 0, $this.canvas.width, $this.canvas.height);
        $this.parts.renderAll($this.context);
    })();
}
Scene.prototype = {
    getContext: function(){
        return this.context;
    },
    addPart: function(item){
        this.parts.add(item);
    }
};
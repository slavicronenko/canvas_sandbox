function Part(){
    return {
        render: function(){
            throw new Error('You should redefine this method!');
        }
    };
}
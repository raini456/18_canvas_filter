(function () {
    
    var red=helper.q('[name="red"]');
    var green=helper.q('[name="green"]');
    var blue=helper.q('[name="blue"]');
    var alpha=helper.q('[name="alpha"]');
    var cf =canvasFilter;
    
    
    var colors ={
        red:red.value,
        green:green.value,
        blue:blue.value,
        alpha:alpha.value 
    }; 
    
    
    
    cf.init({
        canvas: 'canvas',
        width: 600,
        height: 400
    });
    cf.setImage('assets/images/bild.jpg', 0, 0);
    var changeColor= function(){
        colors[this.name]=this.value;
        cf.setColor(colors.red,colors.green, colors.blue,colors.alpha, 0, 0);
    };
    
    helper.addEv('[name="red"]', 'change', changeColor);
    helper.addEv('[name="green]"', 'change', changeColor);
    helper.addEv('[name="blue"]', 'change', changeColor);
    helper.addEv('[name="alpha"]', 'change', changeColor);
    
    helper.addEv('button[data-filter="grey"]', 'click', cf.setFilterGrey);
    helper.addEv('button[data-filter="luminance"]', 'click', cf.setFilterLuminance);
    ////                    r  g    b  a    x1 y1 w    h    x2  y2
//    canvasFilter.setColor(0, 125, 0, 125, 0, 0);// Farbe + Transparenz 0-255
//    canvasFilter.setColor(0, 125, 0, 125, 0, 0, 100, 100);// Farbe + Transparenz 0-255
//    canvasFilter.setColor(0, 125, 0, 125, 0, 0, 100, 100, 50, 75);// Farbe + Transparenz 0-255

    
    
//    window.setTimeout(function () {
//        canvasFilter.setColor(124, -1, -1, 255, 0, 0, 100, 100, 50, 75);  
//    },1000);
   



})();
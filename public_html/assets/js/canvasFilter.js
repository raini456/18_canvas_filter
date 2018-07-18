(function () {

    window.canvasFilter = {};

    canvasFilter.objects = {};

    canvasFilter.objects.canvas = null;

    canvasFilter.styles = {};
    
    canvasFilter.image = {};

    canvasFilter.ctx = null;

    canvasFilter.init = function (cfg) {
        this.objects.canvas = helper.q(cfg.canvas);

        this.objects.canvas.width = cfg.width;
        this.objects.canvas.height = cfg.height;

        this.objects.canvas.style.width = cfg.width + 'px';
        this.objects.canvas.style.height = cfg.height + 'px';

        this.ctx = this.objects.canvas.getContext('2d');
        this.ctx.translate(-0.5, -0.5);
    };
    canvasFilter.setFilter = function(){
        var c, imgData;
        c = canvasFilter.objects.canvas;        
        var imgData = canvasFilter.getPixel(0, 0, c.width, c.height);        
        canvasFilter.setPixel(imgData, 0, 0);
            
    };    
    canvasFilter.setFilterGrey = function(imgData){
        var i, max, r, g, b, grey;
         for (var i = 0, max = imgData.data.length; i < max; i += 4) {
           r=imgData.data[i];
           g=imgData.data[i + 1];
           b=imgData.data[i + 2];
           grey = (r + b + g) / 3;
           r=imgData.data[i] = grey;
           g=imgData.data[i + 1] = grey;
           b=imgData.data[i + 2] = grey;
        }            
    };
    canvasFilter.setFilterLuminance = function(){
        var c, imgData, i, max, r, g, b, luminance;
        c = canvasFilter.objects.canvas;        
        var imgData = canvasFilter.getPixel(0, 0, c.width, c.height);
        for (var i = 0, max = imgData.data.length; i < max; i += 4) {
           r=imgData.data[i];
           g=imgData.data[i + 1];
           b=imgData.data[i + 2];
           
           luminance = 0.2125*r + 0.7151*g + 0.0722*b;
           
           r=imgData.data[i] = luminance;
           g=imgData.data[i + 1] = luminance;
           b=imgData.data[i + 2] = luminance;
        }
        canvasFilter.setPixel(imgData, 0, 0);
            
    };
    canvasFilter.setImage = function (path, x, y) {
        var that = this;
        this.image = new Image();
        this.image.src = path;       
        this.image.onload = function () {
            //nun nicht mehr this, da nun nicht das image gemeint ist
            that.ctx.drawImage(that.image, x, y);
        };
    };

    canvasFilter.setColor = function (r, g, b, a, x1, y1, w, h, x2, y2) {
        if (arguments.length === 6) {
            w = this.objects.canvas.width;
            h = this.objects.canvas.height;
        } else if (arguments.length === 8) {
            x2 = x1;
            y2 = y1;
        } else if (arguments.length < 6 || arguments.length !== 10) {
            return false;
        }
        var imgData = this.getPixel(x1, y1, w, h);  // x y w h 
        
//        for (var i = 0, max = imgData.data.length; i < max; i += 4) {
//            imgData.data[i] = (r === -1) ? imgData.data[i] : r;
//            imgData.data[i + 1] = (g === -1) ? imgData.data[i + 1] : g;
//            imgData.data[i + 2] = (b === -1) ? imgData.data[i + 2] : b; //blue
//            imgData.data[i + 3] = (a === -1) ? imgData.data[i + 3] : a; //alpha
//        }
        
        
        for (var i = 0, max = imgData.data.length; i < max; i += 4) {            
            imgData.data[i] = (r === -1) ? imgData.data[i] : imgData.data[i]*r/100;//red
            imgData.data[i + 1] = (g === -1) ? imgData.data[i + 1] : imgData.data[i+1]*g/100; //green
            imgData.data[i + 2] = (b === -1) ? imgData.data[i + 2] : imgData.data[i+2]*b/100; //blue
            imgData.data[i + 3] = (a === -1) ? imgData.data[i + 3] : imgData.data[i+3]*a/100; //alpha
        }
        this.setPixel(imgData, x2, y2); // y, x
    };
    
    canvasFilter.getPixel = function (x, y, w, h) {
        return this.ctx.getImageData(x, y, w, h);
    };

    canvasFilter.setPixel = function (imgData, x, y) {
        this.ctx.putImageData(imgData, x, y);
    };  

})();


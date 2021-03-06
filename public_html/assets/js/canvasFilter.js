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
        var c, imgData, type, option;
        c = canvasFilter.objects.canvas;
        imgData = canvasFilter.getPixel(0, 0, c.width, c.height);
        canvasFilter.savedR = imgData[0];
        canvasFilter.savedG = imgData[1];
        canvasFilter.savedB = imgData[2];
        canvasFilter.savedA = imgData[3];
        type = this.getAttribute('data-filter');//holt den Wert des Attributes ['data-filter="grey"'] etc.
        
        switch (type) {
            case 'grey':
                imgData = canvasFilter.setFilterGrey(imgData);
                break;
            case 'luminance':
                imgData = canvasFilter.setFilterLuminance(imgData);
                break;
            case 'invert':
                imgData = canvasFilter.setFilterInvert(imgData);
                break;
            case 'sepia':
                imgData = canvasFilter.setFilterSepia(imgData);
                break;
            case 'noise':
                imgData = canvasFilter.setFilterNoise(imgData);
                break;
            case 'bright':
                option = parseInt(this.getAttribute('data-filter-brightness'));
                imgData = canvasFilter.setFilterBrightness(imgData, option);
                break;
            case 'dark':
                option = parseInt(this.getAttribute('data-filter-brightness'));
                imgData = canvasFilter.setFilterBrightness(imgData, option);
                break;            
            default:
                return false;
        }          
        canvasFilter.setPixel(imgData, 0, 0);            
    };    
    canvasFilter.reset=function(){        
        canvasFilter.ctx.drawImage(canvasFilter.image, 0, 0);
    };
    canvasFilter.setFilterGrey = function(arg){
        var i, max, grey;
         for (i = 0, max = arg.data.length; i < max; i += 4) {
           grey = (arg.data[i] + arg.data[i + 1] + arg.data[i + 2]) / 3;
           arg.data[i] = grey;
           arg.data[i + 1] = grey;
           arg.data[i + 2] = grey;
        }   
        return arg;
    };
    canvasFilter.setFilterLuminance = function(arg){
        var i, max, luminance;
        for (i = 0, max = arg.data.length; i < max; i += 4) {                     
           luminance = 0.2125*arg.data[i] + 0.7151*arg.data[i + 1] + 0.0722*arg.data[i + 2];           
           arg.data[i] = luminance;
           arg.data[i + 1] = luminance;
           arg.data[i + 2] = luminance;
        }
        return arg;            
    };
    canvasFilter.setFilterInvert= function(arg){
        var i, max;
        for (i = 0, max = arg.data.length; i < max; i += 4) {          
           arg.data[i] = 255 - arg.data[i];
           arg.data[i + 1] = 255 - arg.data[i +1];
           arg.data[i + 2] = 255 - arg.data[i +2];
        }
        return arg;            
    };
    canvasFilter.setFilterBrightness = function(arg, opt){
        var i, max;
        for (i = 0, max = arg.data.length; i < max; i += 4) {            
            arg.data[i] += opt;
            arg.data[i + 1] += opt;
            arg.data[i + 2] += opt;
        }
        return arg;   
    };
    
    canvasFilter.setFilterNoise = function(arg){
        var i, max, factor=100, rand;
        for (i = 0, max = arg.data.length; i < max; i += 4) {
            rand = (0.5 - Math.random() * factor);
            arg.data[i] += rand;
            arg.data[i + 1] += rand;
            arg.data[i + 2] += rand;
        }
        return arg;   
    };
    canvasFilter.setFilterSepia= function(arg){
        var i, max, r, g, b;        
        for (i = 0, max = arg.data.length; i < max; i += 4) {
            r = arg.data[i];
            g = arg.data[i + 1];
            b = arg.data[i + 2];
            arg.data[i] = r*0.393 + g*0.769 + b*0.188;
            arg.data[i + 1] = r*0.349 + g*0.686 + b*0.168;
            arg.data[i + 2] = r*0.272 + g*0.534 + b*0.131;
        }
        return arg;            
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


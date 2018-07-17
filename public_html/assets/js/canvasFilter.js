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

    canvasFilter.setImage = function (path, x, y) {
        canvasFilter.image = new Image();
        canvasFilter.image.src = path;       
        canvasFilter.image.onload = function () {
            canvasFilter.ctx.drawImage(canvasFilter.image, x, y);
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


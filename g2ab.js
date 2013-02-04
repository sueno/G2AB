
function printProperties(obj) {
    var properties = '';
    for (var prop in obj){
        properties += prop + "=" + obj[prop] + "\n";
    }
    alert(properties);
}

$(window).load(function(){

    var g2ab = {
        createLoadingCanvas :
    function(targetDiv, canvasSize){
        var ldcanvas = new g2ab.LoadingCanvas(targetDiv);

        ldcanvas.setSize = function(size){
            this.size = size;
            this.r = size / 2;
            this.w = Math.round(size * 0.1);
            this.h = Math.round(size * 0.25);
            this.canvasElem.width = size;
            this.canvasElem.height = size;
            this.canvasContext.setTransform(1,0,0,1,this.r,this.r);
        }

        ldcanvas.setColor = function(r,g,b){
            if(arguments.length == 3){
                this.color[0] = r ;
                this.color[1] = g ;
                this.color[2] = b ;
            }else if(arguments.length == 1){

            }else{
                console.error('setColor' + arguments);
                console.dir(arguments);
            }
        }

        ldcanvas.start = function(){
            this.loadingTimer = setInterval(g2ab.drawLoadingImage, 50, this);
            console.dir(this);
        }
        ldcanvas.stop = function(){
            clearInterval(this.loadingTimer);
        }
        ldcanvas.setSize(canvasSize);

        return ldcanvas;
    },
LoadingCanvas :
    function(parentElem){
        this.parentElem = parentElem;
        this.canvasElem = document.createElement('canvas');
        this.canvasContext = this.canvasElem.getContext('2d');
        this.color = [0,100,255];
        this.alphas = [];
        this.parentElem.appendChild(this.canvasElem);
    },
drawLoadingImage :
    function(ldcanvas){
        var nodeC = 12;
        ldcanvas.canvasContext.clearRect(-ldcanvas.r, -ldcanvas.r, (ldcanvas.r*2), (ldcanvas.r*2));

        for(var i = 0; i < nodeC; i++){
            if(ldcanvas.alphas.length < nodeC){
                ldcanvas.alphas.push(i / nodeC);
            }

            ldcanvas.canvasContext.fillStyle = 'rgba(' + ldcanvas.color[0] + ',' + ldcanvas.color[1] + ',' + ldcanvas.color[2] + ',' + ldcanvas.alphas[i] + ')';
            ldcanvas.canvasContext.strokeStyle = 'transparent';
            ldcanvas.canvasContext.beginPath();

            ldcanvas.canvasContext.moveTo((0-ldcanvas.w/4), (ldcanvas.r-ldcanvas.h));
            ldcanvas.canvasContext.quadraticCurveTo(0, (ldcanvas.r-ldcanvas.h-ldcanvas.w/2),(0+ldcanvas.w/4),(ldcanvas.r-ldcanvas.h));
            ldcanvas.canvasContext.lineTo((0+ldcanvas.w/2), (ldcanvas.r-ldcanvas.w/3));
            ldcanvas.canvasContext.quadraticCurveTo(0, (ldcanvas.r+ldcanvas.w/3), (0-ldcanvas.w/2),(ldcanvas.r-ldcanvas.w/3));
            ldcanvas.canvasContext.closePath();
            ldcanvas.canvasContext.fill();
            ldcanvas.canvasContext.stroke();

            ldcanvas.canvasContext.rotate((360/nodeC) * Math.PI / 180);

        }

        ldcanvas.alphas.splice(0,0,ldcanvas.alphas[nodeC-1]).pop();

    },
    }

    $('div' + '.amebloGist').each(function(){
        var param = $(this).attr('id');
        if(param && param.match(/^[0-9]*$/)){
            var gisturl = 'https://gist.github.com/'+param+'.json';
            var gistcodeDiv = $('#' + param);
            var ldcanvas = g2ab.createLoadingCanvas(gistcodeDiv.get(0), 180);
            ldcanvas.setSize(40);
            ldcanvas.setColor(55,55,255);
            ldcanvas.start();

            $('<span>' + gisturl +'</span>').appendTo(gistcodeDiv);

            $.ajax({
                url: gisturl,
                type: 'GET',
                dataType: 'jsonp'
            }).success(function(gistdata) {
                // link要素の追加
                $('<link />',{
                    'media':'screen',
                    'rel':'stylesheet',
                    'href':gistdata.stylesheet
                }).appendTo('head');
                ldcanvas.stop();
                // gistコードの追加
                gistcodeDiv.html(gistdata.div);
            }).error(function() {
                alert("error")
            });
        }else{
            notice(param, "Illigal parameter.");
        }
    });
});


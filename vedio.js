window.onload = function(){
    var play = document.getElementsByClassName("play")[0],
        video = document.getElementsByClassName("video")[0],
        curtime = document.getElementsByClassName("curtime")[0],
        currenttime = document.getElementsByClassName("currenttime")[0],
        fulltime = document.getElementsByClassName("fulltime")[0],
        controtime = document.getElementsByClassName("controtime")[0],
        current = document.getElementsByClassName("current")[0],
        cir = document.getElementsByClassName("cir")[0],
        audioline = document.querySelector(".audioline")
        cir2 = document.querySelector(".cir2"),
        fullscreen = document.querySelector(".fullscreen"),
        playbln = true;
    // 点击播放和暂停    
    play.onclick = function(){
        // video.play();
        playbln = !playbln;
        if( playbln == false){
            video.play();
            this.className = "pause";
        }else{
            video.pause();
            this.className = "play";
        }
    }
    // 视频进度时间
    video.addEventListener("canplay",function(){
        var m = parseInt(video.duration/60);
        var s = parseInt(video.duration%60);
        fulltime.innerHTML = todou(m)+":"+todou(s);
    },false)
    function todou(time){
        return time<10? "0"+time:time
    }
    // 播放视频后
    video.addEventListener("timeupdate",function(){
         // 视频进度条推移
        current.style.width = (video.currentTime/video.duration)*100+"%";
        // 圆形按钮和进度条跟着走
        cir.style.left = current.offsetWidth-8.5+"px";
        // 视频时间推移
        var cm = parseInt(video.currentTime/60);
        var cs = parseInt(video.currentTime%60);
        currenttime.innerHTML = todou(cm)+":"+todou(cs);
    },false)
        // 拖拽进度条
        cir.onmousedown = function(e){
            var e = e||event;
            video.pause();
            var l = e.clientX-cir.offsetLeft;console.log(l)
            document.onmousemove = function(e){
                var e = e||event;
                 var needX = e.clientX-l;
                var needX = e.clientX - l;
                var maxX = controtime.offsetWidth - 8.5;
                needX = needX < -8.5 ? -8.5 : needX;
                needX = needX > maxX ? maxX : needX;
                //  console.log(line);
                cir.style.left=needX+"px";
                current.style.width = (cir.offsetLeft+9)/controtime.offsetWidth*100+"%";
                // console.log(cir.offsetLeft/controtime.offsetWidth)
            }
            document.onmouseup = function(){
                // video.play();
                document.onmousemove = document.onmouseup = null;
                video.currentTime = video.duration*((cir.offsetLeft+9)/controtime.offsetWidth)
                if( playbln == false){
                    video.play();
                    this.className = "pause";
                }else{
                    video.pause();
                    this.className = "play";
                }
            }
            return false;
        }
        // 拖动音量键
        cir2.onmousedown = function(e){
            var e = e||event;
            var lx = e.clientX-this.offsetLeft;
            console.log(lx);
            document.onmousemove = function(e){
                var e = e||event;
                var needx2 = e.clientX-lx;
                if(needx2<0){
                    needx2 = 0;
                }else if(needx2>audioline.offsetWidth-7.5){
                    needx2=audioline.offsetWidth-7.5;
                }
                cir2.style.left = needx2+"px"
                video.volume = cir2.offsetLeft/audioline.offsetWidth;
            }
            document.onmouseup = function(){
                document.onmousemove = document.onmouseup = null;
            }
            return false;
        }
        // 全屏
        fullscreen.onclick = function(){
            if(video.mozRequestFullscreen){
                video.mozRequestFullscreen();
            }else if(video.webkitRequestFullscreen){
                video.webkitRequestFullscreen();
            }else{
                video.requestFullscreen();
            }
        }
}

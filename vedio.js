window.onload = function(){
    var play = document.getElementsByClassName("play")[0],
        video = document.getElementsByClassName("video")[0],
        curtime = document.getElementsByClassName("curtime")[0],
        currenttime = document.getElementsByClassName("currenttime")[0],
        fulltime = document.getElementsByClassName("fulltime")[0],
        controtime = document.getElementsByClassName("controtime")[0],
        current = document.getElementsByClassName("current")[0],
        cir = document.getElementsByClassName("cir")[0],
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
        // 视频时间推移
        var cm = parseInt(video.currentTime/60);
        var cs = parseInt(video.currentTime%60);
        currenttime.innerHTML = todou(cm)+":"+todou(cs);
        // 视频进度条推移
        current.style.width = (video.currentTime/video.duration)*100+"%";
    },false)
}
    // 拖拽进度条
    cir.onmousedown = function(){
        video.pause();

    }
    cir.onmousemove = function(e){
        var e = e||window.event;
        
    }
    cir.onmouseup = function(){
        video.play();
    }

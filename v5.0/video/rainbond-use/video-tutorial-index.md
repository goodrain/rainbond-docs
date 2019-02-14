---
title: Rainbond 5.X 视频教程索引
summary: Rainbond 5.X 官方入门系列教程
toc: false
---
<div class="video-list">
  <div
    class="video-list-item video-show"
    data-src="https://grstatic.oss-cn-shanghai.aliyuncs.com/mp4/video-tutorial/1-overview.mp4"
    >
    <div class="videolist-icon"></div>
    <img
    src="https://grstatic.oss-cn-shanghai.aliyuncs.com/mp4/video-tutorial/1-overview.png"/>
    <div class="video-list-item-label">
       速览Rainbond基础操作
    </div>
  </div>
</div> 
<script>
    var modalVideo = new ModalVideo({ width: 1200, height: 650 });
    $('.video-show').click(function () {
        modalVideo.show({ url: $(this).data('src') });
    })
</script>
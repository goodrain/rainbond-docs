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
       1-Rainbond快速体验
    </div>
  </div>
  <div
    class="video-list-item video-show"
    data-src="https://grstatic.oss-cn-shanghai.aliyuncs.com/mp4/video-tutorial/2-install.mp4"
    >
    <div class="videolist-icon"></div>
    <img
    src="https://grstatic.oss-cn-shanghai.aliyuncs.com/mp4/video-tutorial/2-overview.png"/>
    <div class="video-list-item-label">
       2-Rainbond集群安装
    </div>
  </div>
</div> 

#### 反馈
你对Rainbond教程视频有任何意见和建议，或者需要查看更新计划，请点击 [Rainbond 5.X 视频教程更新计划](http://t.goodrain.com/t/rainbond-5-x/698)
<script>
    var modalVideo = new ModalVideo({ width: 1200, height: 650 });
    $('.video-show').click(function () {
        modalVideo.show({ url: $(this).data('src') });
    })
</script>
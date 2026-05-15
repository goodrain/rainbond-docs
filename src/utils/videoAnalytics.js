function buildVideoAnalyticsPayload(video, extraPayload) {
  const extra = extraPayload || {};
  const payload = {
    video_id: video.id,
    video_title: video.title,
    video_category: video.category,
    video_href: video.href,
  };

  return Object.assign(payload, extra);
}

function buildVideoStepAnalyticsPayload(video, stepTitle, extraPayload) {
  const payload = Object.assign({ step_title: stepTitle }, extraPayload || {});
  return buildVideoAnalyticsPayload(video, payload);
}

module.exports = {
  buildVideoAnalyticsPayload,
  buildVideoStepAnalyticsPayload,
};

import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import copyToClipboard from 'copy-to-clipboard';
import {
  ArrowLeft,
  Check,
  Clock3,
  Copy,
  ExternalLink,
  FileCode2,
  Maximize2,
  MonitorPlay,
  Play,
  Search,
  Tag,
  UserRound,
} from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import {
  videoTutorials,
  type VideoStep,
  type VideoTutorial,
} from '@site/src/data/videoTutorials';
import TrackedLink from '@site/src/components/Analytics/TrackedLink';
import { trackUmamiEvent } from '@src/utils/umami';
import {
  buildVideoAnalyticsPayload,
  buildVideoStepAnalyticsPayload,
} from '@src/utils/videoAnalytics';
import 'react-photo-view/dist/react-photo-view.css';
import styles from './styles.module.css';

const getBilibiliVideoUrl = (bvid: string): string => {
  return `https://www.bilibili.com/video/${bvid}`;
};

const formatIndex = (index: number): string => {
  return String(index + 1).padStart(2, '0');
};

type VideoHubFilter = 'all' | 'ai' | 'install' | 'usage';

const videoHubFilterOptions: { id: VideoHubFilter; label: string }[] = [
  { id: 'all', label: '全部视频' },
  { id: 'ai', label: 'AI' },
  { id: 'install', label: '平台安装' },
  { id: 'usage', label: '功能使用' },
];

const videoHubFilterLabels: Record<Exclude<VideoHubFilter, 'all'>, string> = {
  ai: 'AI',
  install: '平台安装',
  usage: '功能使用',
};

const videoHubFilterById: Record<string, Exclude<VideoHubFilter, 'all'>> = {
  'quick-install': 'install',
  'cluster-install': 'install',
  'helm-install': 'install',
  'offline-xinchuang-install': 'install',
  'rainskills-ai-deploy': 'ai',
  'rainagent-install-use': 'ai',
};

const getVideoHubFilter = (video: VideoTutorial): Exclude<VideoHubFilter, 'all'> => {
  return videoHubFilterById[video.id] || 'usage';
};

function VideoCard({ video }: { video: VideoTutorial }) {
  const hasCover = Boolean(video.cover);
  const filter = getVideoHubFilter(video);

  return (
    <TrackedLink
      className={styles.videoCard}
      to={video.href}
      eventName="video_card_clicked"
      eventProps={buildVideoAnalyticsPayload(video, {
        module: 'video_hub_card',
        source_page: '/videos',
      })}
    >
      <span className={styles.coverWrap}>
        {hasCover ? (
          <img className={styles.cover} src={video.cover} alt="" loading="lazy" />
        ) : (
          <span className={styles.coverPlaceholder}>
            <MonitorPlay size={26} aria-hidden="true" />
            封面待补充
          </span>
        )}
        <span className={styles.playBadge} aria-hidden="true">
          <Play size={22} fill="currentColor" />
        </span>
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardTitleRow}>
          <span className={styles.cardTitle}>{video.title}</span>
          <span className={styles.cardMeta}>{videoHubFilterLabels[filter]}</span>
        </span>
        <span className={styles.cardSummary}>{video.summary}</span>
      </span>
    </TrackedLink>
  );
}

export function VideoTutorialHub() {
  const [activeFilter, setActiveFilter] = useState<VideoHubFilter>('all');
  const [searchText, setSearchText] = useState('');
  const normalizedSearchText = searchText.trim().toLowerCase();
  const searchedVideos = normalizedSearchText
    ? videoTutorials.filter((video) =>
        [
          video.title,
          video.summary,
          video.category,
          video.difficulty,
          video.audience,
          ...video.tags,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearchText)
      )
    : videoTutorials;
  const visibleVideos =
    activeFilter === 'all'
      ? searchedVideos
      : searchedVideos.filter((video) => getVideoHubFilter(video) === activeFilter);

  useEffect(() => {
    trackUmamiEvent('video_hub_opened', {
      module: 'video_hub',
    }, '/videos');
  }, []);

  return (
    <div className={styles.videoPage}>
      <section className={styles.hero} aria-labelledby="video-hub-title">
        <div>
          <h1 id="video-hub-title">视频教程</h1>
          <p className={styles.deck}>
            面向首次使用 Rainbond 的用户，以及正在查找指定功能操作方法的用户，聚合常用视频、关键步骤和截图对照。
          </p>
        </div>
      </section>

      <div className={styles.hubToolbar}>
        <label className={styles.searchBox}>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            aria-label="搜索视频教程"
            placeholder="搜索视频名称或关键词"
          />
        </label>

        <div className={styles.filterBar} role="group" aria-label="筛选视频方向">
          {videoHubFilterOptions.map((option) => {
            const count =
              option.id === 'all'
                ? searchedVideos.length
                : searchedVideos.filter((video) => getVideoHubFilter(video) === option.id).length;
            const isActive = option.id === activeFilter;

            return (
              <button
                className={isActive ? styles.filterButtonActive : styles.filterButton}
                key={option.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActiveFilter(option.id);
                  trackUmamiEvent(
                    'video_hub_filter_clicked',
                    {
                      module: 'video_hub_filter',
                      filter: option.id,
                      filter_label: option.label,
                    },
                    '/videos'
                  );
                }}
              >
                <span>{option.label}</span>
                <strong>{count}</strong>
              </button>
            );
          })}
        </div>
      </div>

      {visibleVideos.length > 0 ? (
        <section className={styles.videoGrid} aria-label="视频教程列表">
          {visibleVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </section>
      ) : (
        <section className={styles.emptyState} aria-live="polite">
          没有找到匹配的视频教程
        </section>
      )}
    </div>
  );
}

function VideoSwitcher({ activeVideo }: { activeVideo: VideoTutorial }) {
  const switcherVideos = [
    activeVideo,
    ...videoTutorials.filter((video) => video.id !== activeVideo.id),
  ];
  const location = useLocation();

  return (
    <aside className={styles.videoSwitcher} aria-label="切换视频教程">
      <div className={styles.switcherTitle}>
        <strong>切换视频</strong>
        <span>封面导航</span>
      </div>

      <nav className={styles.switcherList}>
        {switcherVideos.map((video) => {
          const isActive = video.id === activeVideo.id;
          const originalIndex = videoTutorials.findIndex((item) => item.id === video.id);

          return (
            <TrackedLink
              className={isActive ? styles.switcherItemActive : styles.switcherItem}
              key={video.id}
              to={video.href}
              aria-current={isActive ? 'page' : undefined}
              eventName={isActive ? undefined : 'video_switcher_clicked'}
              eventProps={
                isActive
                  ? undefined
                  : buildVideoAnalyticsPayload(video, {
                      module: 'video_switcher',
                      source_page: location.pathname,
                    })
              }
            >
              <span className={styles.switcherCover}>
                <img src={video.cover} alt="" loading="lazy" />
                <span>{formatIndex(originalIndex)}</span>
                {isActive ? <strong>当前</strong> : null}
              </span>
              <span className={styles.switcherCopy}>
                <strong>{video.title}</strong>
              </span>
            </TrackedLink>
          );
        })}
      </nav>
    </aside>
  );
}

function MobileVideoSelect({ activeVideo }: { activeVideo: VideoTutorial }) {
  const location = useLocation();
  return (
    <label className={styles.mobileSwitcher}>
      <span>切换视频</span>
      <select
        value={activeVideo.href}
        onChange={(event) => {
          const targetVideo = videoTutorials.find((video) => video.href === event.target.value);
          if (targetVideo) {
            trackUmamiEvent(
              'video_mobile_switch_changed',
              buildVideoAnalyticsPayload(targetVideo, {
                module: 'video_mobile_switcher',
                source_page: location.pathname,
              }),
              location.pathname
            );
          }
          window.location.href = event.target.value;
        }}
      >
        {videoTutorials.map((video, index) => (
          <option key={video.id} value={video.href}>
            {formatIndex(index)} {video.title}
          </option>
        ))}
      </select>
    </label>
  );
}

function VideoCoverLink({ video }: { video: VideoTutorial }) {
  const hasCover = Boolean(video.cover);
  const videoUrl = video.bvid ? getBilibiliVideoUrl(video.bvid) : '';
  const location = useLocation();
  const handleWatchClick = (module: string) => {
    trackUmamiEvent(
      'video_watch_clicked',
      buildVideoAnalyticsPayload(video, {
        module,
        source_page: location.pathname,
      }),
      location.pathname
    );
  };
  const coverContent = hasCover ? (
    <img src={video.cover} alt={`${video.title} 视频封面`} loading="lazy" />
  ) : (
    <span className={styles.playerPlaceholder}>
      <MonitorPlay size={34} aria-hidden="true" />
      <strong>视频封面待补充</strong>
    </span>
  );

  return (
    <section className={styles.player} aria-label={`${video.title} 视频封面`}>
      {videoUrl ? (
        <a
          className={styles.playerCover}
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`在 B 站打开 ${video.title}`}
          onClick={() => handleWatchClick('video_detail_cover')}
        >
          {coverContent}
          <span className={styles.playerButton} aria-hidden="true">
            <Play size={34} fill="currentColor" />
          </span>
        </a>
      ) : (
        <div className={styles.playerCover} aria-label={`${video.title} 视频封面待补充`}>
          {coverContent}
        </div>
      )}
      <div className={styles.playerCaption}>
        <span>
          {videoUrl ? '点击封面后将在新窗口打开 Rainbond 官方 B 站视频。' : '视频链接待补充。'}
        </span>
        {videoUrl ? (
          <a
            className={styles.playerAction}
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWatchClick('video_detail_action')}
          >
            <ExternalLink size={15} aria-hidden="true" />
            B 站打开
          </a>
        ) : null}
      </div>
    </section>
  );
}

function CommandBlock({ title, command, video }: { title: string; command: string; video: VideoTutorial }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  const handleCopy = () => {
    copyToClipboard(command);
    setCopied(true);
    trackUmamiEvent(
      'video_command_copied',
      buildVideoStepAnalyticsPayload(video, title, {
        module: 'video_command_block',
        source_page: location.pathname,
      }),
      location.pathname
    );
  };

  return (
    <div className={styles.commandBlock}>
      <div className={styles.commandHead}>
        <span>{title}</span>
        <button
          className={copied ? styles.commandCopyButtonActive : styles.commandCopyButton}
          type="button"
          onClick={handleCopy}
          aria-label={`复制命令：${title}`}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <pre>
        <code>{command}</code>
      </pre>
    </div>
  );
}

function StepCodePanel({
  panel,
  video,
}: {
  panel: NonNullable<VideoStep['codePanel']>;
  video: VideoTutorial;
}) {
  const [value, setValue] = useState(panel.content);
  const [copied, setCopied] = useState(false);
  const isEditable = panel.editable !== false;
  const location = useLocation();

  useEffect(() => {
    setValue(panel.content);
    setCopied(false);
  }, [panel.content]);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  const handleCopy = () => {
    copyToClipboard(isEditable ? value : panel.content);
    setCopied(true);
    trackUmamiEvent(
      'video_command_copied',
      buildVideoStepAnalyticsPayload(video, panel.title, {
        module: 'video_code_panel',
        source_page: location.pathname,
      }),
      location.pathname
    );
  };

  return (
    <div className={styles.stepCodePanel}>
      <div className={styles.stepCodeHead}>
        <span className={styles.stepCodeTitle}>
          <FileCode2 size={15} aria-hidden="true" />
          {panel.title}
          {panel.language ? <em>{panel.language}</em> : null}
        </span>
        <button
          className={copied ? styles.commandCopyButtonActive : styles.commandCopyButton}
          type="button"
          onClick={handleCopy}
          aria-label={`复制内容：${panel.title}`}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? '已复制' : panel.copyLabel || '复制'}
        </button>
      </div>

      {isEditable ? (
        <textarea
          className={styles.stepCodeEditor}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          aria-label={`${panel.title} 可编辑内容`}
          spellCheck={false}
          wrap="off"
        />
      ) : (
        <pre className={styles.stepCodePre}>
          <code>{panel.content}</code>
        </pre>
      )}
    </div>
  );
}

function StepImageGallery({
  images,
  fallbackCaption,
  video,
  stepTitle,
}: {
  images: NonNullable<VideoStep['images']>;
  fallbackCaption: string;
  video: VideoTutorial;
  stepTitle: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] || images[0];
  const imageKey = images.map((image) => image.src).join('|');
  const location = useLocation();

  useEffect(() => {
    setActiveIndex(0);
  }, [imageKey]);

  if (!activeImage) {
    return null;
  }

  const caption = activeImage.caption || fallbackCaption;
  const hasMultipleImages = images.length > 1;

  return (
    <div className={styles.shotGallery}>
      <PhotoView src={activeImage.src}>
        <button
          className={styles.shotPreviewButton}
          type="button"
          aria-label={`预览截图：${activeImage.caption || fallbackCaption}`}
          onClick={() => {
            trackUmamiEvent(
              'video_step_image_opened',
              buildVideoStepAnalyticsPayload(video, stepTitle, {
                module: 'video_step_preview',
                source_page: location.pathname,
              }),
              location.pathname
            );
          }}
        >
          <img src={activeImage.src} alt={activeImage.alt} loading="lazy" />
          <span className={styles.shotPreviewIcon} aria-hidden="true">
            <Maximize2 size={17} />
          </span>
        </button>
      </PhotoView>

      {hasMultipleImages ? <div className={styles.shotCaption}>{caption}</div> : null}

      {hasMultipleImages ? (
        <div className={styles.shotThumbs} aria-label="切换步骤截图">
          {images.map((image, imageIndex) => {
            const isActive = imageIndex === activeIndex;

            return (
              <button
                className={isActive ? styles.shotThumbActive : styles.shotThumb}
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(imageIndex)}
                aria-pressed={isActive}
                aria-label={`查看截图：${image.caption}`}
              >
                <img src={image.src} alt="" loading="lazy" />
                <span>{imageIndex + 1}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {!hasMultipleImages ? <div className={styles.shotCaption}>{caption}</div> : null}
    </div>
  );
}

function TutorialStep({ step, index, video }: { step: VideoStep; index: number; video: VideoTutorial }) {
  const stepImages =
    step.images && step.images.length > 0
      ? step.images
      : step.image
        ? [{ src: step.image, alt: step.imageAlt, caption: step.imageCaption }]
        : [];
  const hasImages = stepImages.length > 0;

  return (
    <div className={styles.stepRow}>
      <div className={styles.stepNumber} aria-hidden="true">
        {formatIndex(index)}
      </div>

      <article className={styles.stepCard}>
        <div className={styles.stepCopy}>
          <h3>{step.title}</h3>
          {step.description ? <p>{step.description}</p> : null}

          {step.bullets.length > 0 ? (
            <ul className={styles.instructionList}>
              {step.bullets.map((bullet, bulletIndex) => {
                const relatedLinks =
                  step.bulletLinks?.filter((linkGroup) => linkGroup.bulletIndex === bulletIndex) || [];

                return (
                  <li key={`${bullet}-${bulletIndex}`}>
                    <span>{bullet}</span>
                    {relatedLinks.length > 0 ? (
                      <span className={styles.bulletInlineLinks}>
                        {relatedLinks.flatMap((linkGroup) =>
                          linkGroup.links.map((link) => (
                            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                              {link.label}
                              <ExternalLink size={14} aria-hidden="true" />
                            </a>
                          ))
                        )}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}

          {step.links && step.links.length > 0 ? (
            <div className={styles.stepLinks}>
              {step.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          ) : null}

          {step.command && step.commandTitle ? (
            <CommandBlock title={step.commandTitle} command={step.command} video={video} />
          ) : null}

          {step.commands?.map((commandItem) => (
            <CommandBlock
              key={`${step.title}-${commandItem.title}`}
              title={commandItem.title}
              command={commandItem.command}
              video={video}
            />
          ))}

          {step.note ? <div className={styles.noteBox}>{step.note}</div> : null}
        </div>

        <figure className={styles.stepShot}>
          <div className={styles.shotImageWrap}>
            {step.codePanel ? (
              <StepCodePanel panel={step.codePanel} video={video} />
            ) : hasImages ? (
              <StepImageGallery
                images={stepImages}
                fallbackCaption={step.imageCaption}
                video={video}
                stepTitle={step.title}
              />
            ) : (
              <div className={styles.shotPlaceholder}>
                <MonitorPlay size={28} aria-hidden="true" />
                <strong>步骤截图待补充</strong>
                <span>{step.imageCaption}</span>
              </div>
            )}
          </div>
        </figure>
      </article>
    </div>
  );
}

export function VideoTutorialDetail({ video }: { video: VideoTutorial }) {
  const categoryLine = [video.category, video.difficulty].filter(Boolean).join(' / ');
  const hasMeta = Boolean(video.duration || video.operationTime || video.audience);
  const location = useLocation();

  useEffect(() => {
    trackUmamiEvent(
      'video_detail_opened',
      buildVideoAnalyticsPayload(video, {
        module: 'video_detail',
      }),
      location.pathname
    );
  }, [location.pathname, video]);

  return (
    <div className={styles.detailPage}>
      <VideoSwitcher activeVideo={video} />

      <div className={styles.detailMain}>
        <Link className={styles.backLink} to="/videos">
          <ArrowLeft size={16} aria-hidden="true" />
          返回视频教程列表
        </Link>

        <MobileVideoSelect activeVideo={video} />

        <section className={styles.detailTop}>
          <header className={styles.detailHeader}>
            {categoryLine ? <p className={styles.eyebrow}>{categoryLine}</p> : null}
            <h1>{video.title}</h1>
            <p>{video.summary}</p>

            {hasMeta ? (
              <div className={styles.detailMeta}>
                {video.duration ? (
                  <span>
                    <Clock3 size={15} aria-hidden="true" />
                    时长 {video.duration}
                  </span>
                ) : null}
                {video.operationTime ? (
                  <span>
                    <MonitorPlay size={15} aria-hidden="true" />
                    预计操作 {video.operationTime}
                  </span>
                ) : null}
                {video.audience ? (
                  <span>
                    <UserRound size={15} aria-hidden="true" />
                    {video.audience}
                  </span>
                ) : null}
              </div>
            ) : null}

            {video.tags.length > 0 ? (
              <div className={styles.tagList}>
                {video.tags.map((tag) => (
                  <span key={tag}>
                    <Tag size={14} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </header>

          <VideoCoverLink video={video} />
        </section>

        <section aria-labelledby="video-steps-title">
          <div className={styles.stepsSectionHead}>
            <h2 id="video-steps-title">
              {video.steps.length > 0
                ? `本教程共 ${video.steps.length} 个操作步骤`
                : '操作步骤待补充'}
            </h2>
          </div>

          {video.steps.length > 0 ? (
            <PhotoProvider>
              <div className={styles.steps}>
                {video.steps.map((step, index) => (
                  <TutorialStep key={`${video.id}-${step.title}`} step={step} index={index} video={video} />
                ))}
              </div>
            </PhotoProvider>
          ) : (
            <div className={styles.stepsEmpty}>真实截图和操作说明待补充。</div>
          )}
        </section>
      </div>
    </div>
  );
}

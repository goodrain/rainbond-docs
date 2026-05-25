export type VideoStep = {
  label: string;
  title: string;
  duration: string;
  description: string;
  bullets: string[];
  images?: {
    src: string;
    alt: string;
    caption: string;
  }[];
  commandTitle?: string;
  command?: string;
  commands?: {
    title: string;
    command: string;
  }[];
  codePanel?: {
    title: string;
    language?: string;
    content: string;
    editable?: boolean;
    copyLabel?: string;
  };
  links?: {
    label: string;
    href: string;
  }[];
  bulletLinks?: {
    bulletIndex: number;
    links: {
      label: string;
      href: string;
    }[];
  }[];
  note?: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  timestamp: string;
};

export type VideoTutorial = {
  id: string;
  title: string;
  summary: string;
  category: string;
  difficulty: string;
  duration: string;
  operationTime: string;
  audience: string;
  cover: string;
  bvid: string;
  tags: string[];
  href: string;
  relatedIds: string[];
  steps: VideoStep[];
};

export const videoTutorials: VideoTutorial[] = [
  {
    id: 'quick-install',
    title: '快速安装',
    summary: '通过一条脚本在 Linux 或 MacOS 上启动 Rainbond 体验环境，完成控制台访问验证。',
    category: '快速入门',
    difficulty: '新手推荐',
    duration: '00:41',
    operationTime: '3 分钟',
    audience: '首次体验 Rainbond、想快速搭建单机环境的用户',
    cover: '/img/video/quick-install-cover.jpg',
    bvid: 'BV1a3dGBfEAG',
    tags: ['快速安装', '单机版'],
    href: '/videos/quick-install',
    relatedIds: [],
    steps: [
      {
        label: '',
        title: '准备 Linux 或 MacOS 运行环境',
        duration: '',
        description: '安装前先确认机器规格和网络端口，避免脚本安装成功后控制台或应用无法访问。',
        bullets: [
          '机器规格至少 4 核 CPU、8GB 内存。',
          '对外开放 7070、80、443、6060 端口。',
          '安装前确认这些端口没有被其他进程占用。',
          '确认终端可以访问外网，用于下载安装脚本和拉取镜像。',
        ],
        commandTitle: '检查端口占用',
        command: "sudo ss -lntp | grep -E ':(7070|80|443|6060)\\b' || echo \"端口未被占用\"",
        image: '/img/video/quick-install-step-env-check.png',
        imageAlt: '服务器中检查 Rainbond 快速安装端口未被占用的终端截图',
        imageCaption: '安装前确认端口未被占用',
        timestamp: '',
      },
      {
        label: '',
        title: '复制并执行快速安装脚本',
        duration: '',
        description: '在目标机器终端执行快速安装命令。脚本会检测环境，并拉起 Rainbond 单机版容器。',
        bullets: [
          'Linux 用户直接在服务器终端执行命令。',
          'MacOS 用户确认 OrbStack 已启动后，再在终端执行同一条命令。',
          '执行过程中不要关闭终端，等待镜像拉取、容器启动和平台初始化完成。',
        ],
        commandTitle: '快速安装命令',
        command: 'curl -o install.sh https://get.rainbond.com && bash ./install.sh',
        image: '/img/video/quick-install-step-run-install-script.png',
        imageAlt: '服务器中执行 Rainbond 快速安装脚本的终端截图',
        imageCaption: '执行安装脚本',
        timestamp: '',
      },
      {
        label: '',
        title: '填写公网 IP',
        duration: '',
        description: '安装脚本提示输入 IP 地址时，填写当前服务器对外访问的公网 IP，后续控制台访问地址会基于这个 IP 生成。',
        bullets: [
          '云服务器优先填写公网 IP，不要填写内网 IP。',
          '如果只是本地体验环境，按实际可访问地址填写。',
          '填写完成后按 Enter，继续等待脚本安装。',
        ],
        image: '/img/video/quick-install-step-public-ip.png',
        imageAlt: 'Rainbond 快速安装过程中填写服务器公网 IP 的终端截图',
        imageCaption: '填写服务器公网 IP',
        timestamp: '',
      },
      {
        label: '',
        title: '等待安装成功提示并记录控制台地址',
        duration: '',
        description: '脚本执行后通常需要等待 2-3 分钟。看到成功提示后，记录输出中的 Console 地址。',
        bullets: [
          '成功输出中会出现 Rainbond Installation Successful。',
          '重点记录 Access Rainbond 下方的 Console 地址，例如 http://你的IP:7070。',
        ],
        commandTitle: '成功输出示例',
        command: '🎉 Rainbond Installation Successful!\n......\nAccess Rainbond:\n    🌐 Console: http://192.168.1.1:7070',
        image: '/img/video/quick-install-step-install-success.png',
        imageAlt: 'Rainbond 快速安装成功并输出控制台访问地址的终端截图',
        imageCaption: '安装成功提示',
        timestamp: '',
      },
      {
        label: '',
        title: '打开控制台并验证安装结果',
        duration: '',
        description: '安装完成后，在浏览器中打开 Console 地址。如果页面可以正常打开，说明快速安装环境已经可用。',
        bullets: [
          '在浏览器访问 http://你的IP:7070。',
          '确认 Rainbond 控制台页面可以正常加载。',
          '如果打不开页面，优先检查主机防火墙、安全组和端口访问策略。',
        ],
        image: '/img/video/quick-install-step-open-console.png',
        imageAlt: '浏览器打开 Rainbond 控制台并验证安装成功的截图',
        imageCaption: '访问 Rainbond 控制台',
        timestamp: '',
      },
    ],
  },
  {
    id: 'cluster-install',
    title: '集群安装',
    summary: '通过视频了解 Rainbond 多节点集群安装流程，完成集群安装前准备、节点配置和控制台访问验证。',
    category: '安装部署',
    difficulty: '多节点集群',
    duration: '01:13',
    operationTime: '15 分钟',
    audience: '准备在多台服务器上部署 Rainbond 集群的用户',
    cover: '/img/video/cluster-install-cover.jpg',
    bvid: 'BV1x2546oEVP',
    tags: ['集群安装', '多节点'],
    href: '/videos/cluster-install',
    relatedIds: ['quick-install'],
    steps: [
      {
        label: '',
        title: '准备环境',
        duration: '',
        description: '先确认主机数量、资源规格、节点连通性和端口状态，避免安装过程被基础环境阻断。',
        bullets: [
          '准备至少 3 台 Linux 主机，所有节点内网互通并可访问互联网。',
          '生产环境建议每台机器至少 8 核 CPU、16GB 内存、200GB 磁盘。',
          'bootstrap 节点需能通过 root SSH 访问其它节点，并开放 7070、80、443、6060 端口。',
        ],
        commands: [
          {
            title: '检查节点连通性和基础资源',
            command: `for host in 192.168.1.10 192.168.1.11 192.168.1.12; do
  echo "===== $host ====="
  ssh -o ConnectTimeout=5 root@$host 'hostname; hostname -I; nproc; free -h | awk "/Mem:/ {print \\$2}"; df -h / | awk "NR==2 {print \\$4}"'
done`,
          },
          {
            title: '检查关键端口占用',
            command: `for host in 192.168.1.10 192.168.1.11 192.168.1.12; do
  echo "===== $host ====="
  ssh root@$host "sudo ss -lntp | grep -E ':(7070|80|443|6060)\\b' || echo '端口未被占用'"
done`,
          },
        ],
        image: '/img/video/cluster-install-step-1-env-check.png',
        imageAlt: '在 bootstrap 节点检查多节点连通性、基础资源和关键端口占用的终端截图',
        imageCaption: '节点资源与端口检查结果',
        timestamp: '',
      },
      {
        label: '',
        title: '下载 ROI',
        duration: '',
        description: '在 bootstrap 节点按服务器架构下载 ROI 命令行工具，X86 和 ARM 二选一即可。',
        bullets: [
          'Intel、AMD 服务器通常选择 X86(amd64) 版本。',
          '鲲鹏、飞腾等服务器通常选择 ARM(arm64) 版本。',
          '下载命令已经包含 chmod +x，执行后 ROI 会具备可执行权限。',
        ],
        commands: [
          {
            title: 'X86(amd64) 下载命令',
            command: 'curl -o roi https://get.rainbond.com/roi/roi-amd64 && chmod +x roi',
          },
          {
            title: 'ARM(arm64) 下载命令',
            command: 'curl -o roi https://get.rainbond.com/roi/roi-arm64 && chmod +x roi',
          },
        ],
        image: '/img/video/cluster-install-step-2-download-roi.png',
        imageAlt: '在 bootstrap 节点下载 ROI 并添加执行权限的终端截图',
        imageCaption: 'ROI 下载结果',
        timestamp: '',
      },
      {
        label: '',
        title: '查看 ROI 版本',
        duration: '',
        description: '下载完成后执行 version 命令，确认 ROI 可以正常运行，并查看默认安装的 Rainbond 版本。',
        bullets: [
          '如果命令可以正常输出版本信息，说明 ROI 已经准备完成。',
          '如果提示权限不足，检查是否执行过 chmod +x roi。',
          '记录输出中的 Rainbond 版本，便于后续排查和升级。',
        ],
        commandTitle: '查看 ROI 版本',
        command: './roi version',
        image: '/img/video/cluster-install-step-3-roi-version.png',
        imageAlt: '查看 ROI 和默认 Rainbond 版本的终端截图',
        imageCaption: 'ROI 版本检查结果',
        timestamp: '',
      },
      {
        label: '',
        title: '编写 cluster.yaml',
        duration: '',
        description: '在 bootstrap 节点创建 cluster.yaml，配置所有节点的 SSH 信息、节点角色和默认存储。',
        bullets: [
          'hosts 中填写每台节点的名称、IP、root 用户、密码和 SSH 端口。',
          'bootstrap: true 只能配置在一个 master 节点上，也就是执行 roi up 的节点。',
          'roleGroups 中指定 etcd、master、worker、rbd-gateway、rbd-chaos、nfs-server 所在节点。',
          '默认示例使用 ROI 配置集群内 NFS，并自动安装 nfs-client-provisioner StorageClass。',
        ],
        codePanel: {
          title: 'cluster.yaml 配置示例',
          language: 'yaml',
          editable: true,
          copyLabel: '复制配置',
          content: `hosts:
  - name: node1
    address: 192.168.1.10
    internalAddress: 192.168.1.10
    user: root
    password: "your-password"
    port: 22
    bootstrap: true

  - name: node2
    address: 192.168.1.11
    internalAddress: 192.168.1.11
    user: root
    password: "your-password"
    port: 22

  - name: node3
    address: 192.168.1.12
    internalAddress: 192.168.1.12
    user: root
    password: "your-password"
    port: 22

roleGroups:
  etcd:
    - node1
  master:
    - node1
  worker:
    - node1
    - node2
    - node3
  rbd-gateway:
    - node1
  rbd-chaos:
    - node1
  nfs-server:
    - node1

storage:
  nfs:
    enabled: true
    sharePath: /nfs-data/k8s
    storageClass:
      enabled: true`,
        },
        image: '',
        imageAlt: '编写 Rainbond 集群安装 cluster.yaml 的编辑器截图待补充',
        imageCaption: '编写 cluster.yaml',
        timestamp: '',
      },
      {
        label: '',
        title: '执行安装命令',
        duration: '',
        description: '在 bootstrap 节点执行安装命令，ROI 会根据 cluster.yaml 安装 RKE2 Kubernetes 集群和 Rainbond 平台。',
        bullets: [
          '确认当前目录下已经有 roi 和 cluster.yaml。',
          '执行安装后保持终端连接，不要中断安装过程。',
          '如果需要排查安装过程，可以追加 -d 查看调试日志。',
        ],
        commandTitle: '执行集群安装',
        command: './roi up -f cluster.yaml',
        image: '/img/video/cluster-install-step-run-install.png',
        imageAlt: '在 bootstrap 节点执行 ROI 集群安装命令的终端截图',
        imageCaption: '执行集群安装命令',
        timestamp: '',
      },
      {
        label: '',
        title: '等待安装成功提示并记录控制台地址',
        duration: '',
        description: '安装命令执行完成后，先查看终端中的成功提示，并记录日志里输出的 Rainbond 控制台访问地址。',
        bullets: [
          '成功日志中会输出 Rainbond 安装完成提示。',
          '重点记录控制台访问地址，通常为 http://节点IP:7070。',
          '如果安装失败，先根据终端错误信息处理阻塞项，再重新执行安装命令。',
        ],
        image: '/img/video/cluster-install-step-install-success.png',
        imageAlt: 'ROI 集群安装成功并输出 Rainbond 控制台访问地址的终端截图',
        imageCaption: '安装成功提示',
        timestamp: '',
      },
      {
        label: '',
        title: '打开控制台并验证安装结果',
        duration: '',
        description: '安装完成后，在浏览器中打开 Console 地址。如果页面可以正常打开，说明集群环境已经可用。',
        bullets: [
          '在浏览器访问 http://你的IP:7070。',
          '确认 Rainbond 控制台页面可以正常加载。',
          '如果打不开页面，优先检查主机防火墙、安全组和端口访问策略。',
        ],
        image: '/img/video/quick-install-step-open-console.png',
        imageAlt: '浏览器访问 Rainbond 控制台并验证集群状态的截图',
        imageCaption: '访问 Rainbond 控制台',
        timestamp: '',
      },
    ],
  },
  {
    id: 'helm-install',
    title: '基于 K8s 集群上 Helm 安装',
    summary: '在已有 Kubernetes 集群中添加 Rainbond Helm 仓库，执行 Helm 安装并验证控制台访问。',
    category: '安装部署',
    difficulty: '已有 K8s 集群',
    duration: '00:51',
    operationTime: '8 分钟',
    audience: '已经有 Kubernetes 集群、希望通过 Helm 安装 Rainbond 的用户',
    cover: '/img/video/helm-install-cover.jpg',
    bvid: 'BV1av5K6CES2',
    tags: ['Helm 安装', 'Kubernetes'],
    href: '/videos/helm-install',
    relatedIds: ['cluster-install', 'quick-install'],
    steps: [
      {
        label: '',
        title: '准备 Kubernetes 环境',
        duration: '',
        description: '先确认已有 Kubernetes 集群、kubectl 和 Helm 都已经可用，并检查 Rainbond 需要使用的端口。',
        bullets: [
          '准备 Containerd 运行时的 Kubernetes 1.24+ 集群。',
          '操作终端已安装 kubectl 和 Helm CLI，并能访问目标集群。',
          '确认 80、443、6060、7070、8443 端口可用。',
        ],
        commands: [
          {
            title: '检查集群和工具',
            command: 'kubectl get nodes -o wide\nkubectl version --client\nhelm version',
          },
          {
            title: '检查关键端口占用',
            command: "sudo ss -lntp | grep -E ':(80|443|6060|7070|8443)\\b' || echo \"端口未被占用\"",
          },
        ],
        image: '/img/video/helm-install-step-1-env.png',
        imageAlt: '检查 Kubernetes 集群节点、kubectl 和 Helm 版本的终端截图',
        imageCaption: '确认 Kubernetes 环境',
        timestamp: '',
      },
      {
        label: '',
        title: '执行安装前健康检查',
        duration: '',
        description: '使用 Rainbond 提供的检查脚本扫描集群基础环境，提前发现资源、端口或集群配置问题。',
        bullets: [
          '检查脚本会对当前 Kubernetes 集群做基础校验。',
          '如果输出阻塞项，先按提示处理后再继续安装。',
          '健康检查通过后，再进入 Helm 仓库和安装命令步骤。',
        ],
        commandTitle: '安装前检查命令',
        command: 'curl -sfL https://get.rainbond.com/k8s-health-check.sh | bash',
        image: '/img/video/helm-install-step-2-health-check.png',
        imageAlt: '执行 Rainbond Kubernetes 安装前健康检查脚本的终端截图',
        imageCaption: '安装前健康检查',
        timestamp: '',
      },
      {
        label: '',
        title: '添加 Rainbond Helm 仓库',
        duration: '',
        description: '将 Rainbond 官方 Helm 仓库添加到本地，并更新 Chart 索引，确保后续可以直接安装 Rainbond Chart。',
        bullets: [
          'helm repo add 只需要执行一次。',
          'helm repo update 用于拉取最新的 Chart 索引。',
          '如果网络访问失败，先检查服务器出网和 DNS 解析。',
        ],
        commandTitle: '添加 Helm 仓库',
        command: 'helm repo add rainbond https://chart.rainbond.com\nhelm repo update',
        image: '/img/video/helm-install-step-3-repo.png',
        imageAlt: '添加 Rainbond Helm 仓库并更新 Chart 索引的终端截图',
        imageCaption: '添加 Helm 仓库',
        timestamp: '',
      },
      {
        label: '',
        title: '执行 Helm 安装命令',
        duration: '',
        description: '在目标 Kubernetes 集群中安装 Rainbond，默认会创建 rbd-system 命名空间并部署平台组件。',
        bullets: [
          '普通场景可以直接使用默认安装命令。',
          '如果需要自定义网关 IP、外部数据库或镜像仓库，可以通过 -f values.yaml 指定配置。',
          '如果 Containerd socket 不在默认路径，需要在 values.yaml 中配置 Cluster.containerdRuntimePath。',
        ],
        commands: [
          {
            title: '默认安装命令',
            command: 'helm install rainbond rainbond/rainbond --create-namespace -n rbd-system',
          },
          {
            title: '使用 values.yaml 安装',
            command: 'helm install rainbond rainbond/rainbond --create-namespace -n rbd-system -f values.yaml',
          },
        ],
        image: '/img/video/helm-install-step-4-install.png',
        imageAlt: '执行 Rainbond Helm 安装命令的终端截图',
        imageCaption: '执行 Helm 安装',
        timestamp: '',
      },
      {
        label: '',
        title: '查看安装进度',
        duration: '',
        description: '安装命令执行后，持续查看 rbd-system 命名空间中的 Pod 状态，等待核心组件全部启动完成。',
        bullets: [
          '重点关注 rainbond-operator、rbd-api、rbd-app-ui、rbd-gateway 等组件。',
          '当所有 Pod 进入 Running 状态，且 rbd-app-ui 正常运行后，说明安装基本完成。',
          '如果 Pod 长时间 Pending 或 CrashLoopBackOff，可以继续查看 describe 和 logs 定位原因。',
        ],
        commands: [
          {
            title: '查看 Pod 状态',
            command: 'kubectl get pod -n rbd-system',
          }
        ],
        image: '/img/video/helm-install-step-5-progress.png',
        imageAlt: '查看 rbd-system 命名空间 Pod 状态的终端截图',
        imageCaption: '查看安装进度',
        timestamp: '',
      },
      {
        label: '',
        title: '打开控制台并验证安装结果',
        duration: '',
        description: '安装完成后，在浏览器中打开 Console 地址。如果页面可以正常打开，说明 Helm 安装环境已经可用。',
        bullets: [
          '在浏览器访问 http://你的IP:7070。',
          '确认 Rainbond 控制台页面可以正常加载。',
          '如果打不开页面，优先检查主机防火墙、安全组和端口访问策略。',
        ],
        image: '/img/video/quick-install-step-open-console.png',
        imageAlt: '浏览器访问 Rainbond 控制台并验证 Helm 安装结果的截图',
        imageCaption: '访问 Rainbond 控制台',
        timestamp: '',
      },
    ],
  },
  {
    id: 'offline-xinchuang-install',
    title: '离线、信创安装',
    summary: '在麒麟 V10、ARM 等国产化信创离线环境中，通过 ROI 离线包完成 Rainbond 单节点安装和访问验证。',
    category: '安装部署',
    difficulty: '麒麟 V10 / ARM',
    duration: '00:56',
    operationTime: '10 分钟',
    audience: '需要在鲲鹏CPU、麒麟 V10、ARM 或内网离线环境中部署 Rainbond',
    cover: '/img/video/offline-xinchuang-install-cover.jpg',
    bvid: 'BV1ZB556CEpA',
    tags: ['离线安装', '国产化信创', '麒麟 V10', 'ARM'],
    href: '/videos/offline-xinchuang-install',
    relatedIds: ['cluster-install', 'helm-install'],
    steps: [
      {
        label: '',
        title: '规划麒麟 V10 / ARM 离线环境',
        duration: '',
        description: '先确认当前服务器架构、操作系统、资源规格和访问端口，确保离线信创环境满足安装要求。',
        bullets: [
          '确认服务器为 ARM64 架构，操作系统为麒麟 V10 或兼容信创系统。',
          '建议准备至少 4 核 CPU、8GB 内存、50GB 可用磁盘的干净环境。',
          '对外开放 7070、80、443、6060 端口。',
          '离线服务器不需要访问外网，但需要提前准备好完整离线包。',
        ],
        commands: [
          {
            title: '检查关键端口占用',
            command: "sudo ss -lntp | grep -E ':(7070|80|443|6060)\\b' || echo \"端口未被占用\"",
          },
        ],
        image: '/img/video/offline-xinchuang-install-step-1.png',
        imageAlt: '在麒麟 V10 ARM 服务器上检查系统架构、资源和端口的终端截图',
        imageCaption: '确认麒麟 V10 / ARM 环境',
        timestamp: '',
      },
      {
        label: '',
        title: '下载 ARM 版 ROI 和离线包',
        duration: '',
        description: '先在一台可以访问外网的环境中下载 ARM64 版 ROI，并提前生成后续离线安装需要的完整离线包。',
        bullets: [
          '这一步在有网环境执行。',
          '复制命令后等待 ROI 下载完成，当前目录会生成 roi 文件和 offline-packages 目录。',
          '下载完成后，把 roi 和 offline-packages 一起导入到离线环境。',
        ],
        commands: [
          {
            title: '下载 ROI 和离线安装包',
            command: 'curl -o roi https://get.rainbond.com/roi/roi-arm64 && chmod +x roi\n./roi download',
          },
        ],
        image: '/img/video/offline-xinchuang-install-step-2.png',
        imageAlt: '在有网环境下载 ARM 版 ROI 和 Rainbond 离线安装包的终端截图',
        imageCaption: '下载离线安装包',
        timestamp: '',
      },
      {
        label: '',
        title: '导入离线包并检查目录',
        duration: '',
        description: '使用 U 盘或光盘将 roi 和 offline-packages 拷贝到离线服务器同一目录，然后确认目录可用。',
        bullets: [
          '建议放在 /root，后续命令都在这个目录执行。',
          '确认 roi 和 offline-packages 位于同一级目录。',
        ],
        commandTitle: '检查导入结果',
        command: 'cd /root\nls -lh roi offline-packages\nls -lh offline-packages | head\nchmod +x roi',
        image: '/img/video/offline-xinchuang-install-step-3.png',
        imageAlt: '检查导入后的 roi 和 offline-packages 目录截图',
        imageCaption: '确认离线包已导入',
        timestamp: '',
      },
      {
        label: '',
        title: '开始安装',
        duration: '',
        description: '在离线服务器上执行安装命令，ROI 会从 offline-packages 中加载 RKE2、镜像和 Rainbond Chart。',
        bullets: [
          '安装过程中不要关闭终端，等待脚本完成集群、存储和 Rainbond 组件初始化。',
          '如果安装失败，先根据终端错误检查资源、磁盘、端口和离线包完整性。',
        ],
        links: [
          {
            label: '多节点离线安装请查看离线安装文档',
            href: '/docs/installation/offline',
          },
        ],
        commandTitle: '开始单节点离线安装',
        command: './roi up --single',
        image: '/img/video/offline-xinchuang-install-step-4.png',
        imageAlt: '在麒麟 V10 ARM 服务器上执行 ROI 单节点离线安装命令的终端截图',
        imageCaption: '执行单节点离线安装',
        timestamp: '',
      },
      {
        label: '',
        title: '安装成功并记录访问入口',
        duration: '',
        description: '记录终端输出的 Console 地址，按需执行下面的安装后命令。',
        bullets: [],
        commands: [
          {
            title: '配置 KUBECONFIG 并查看组件状态',
            command: 'export KUBECONFIG=/etc/rancher/rke2/rke2.yaml\n/var/lib/rancher/rke2/bin/kubectl get pods -A',
          },
          {
            title: '可选：启用源码构建离线组件',
            command: './roi addon sourcebuild',
          },
        ],
        images: [
          {
            src: '/img/video/offline-xinchuang-install-step-5.png',
            alt: '安装完成后记录 Rainbond 控制台地址并查看 Pod 状态的终端截图',
            caption: '安装成功提示和后续检查',
          },
          {
            src: '/img/video/offline-xinchuang-install-step-5-2.png',
            alt: '离线信创安装后执行源码构建离线组件命令的终端截图',
            caption: '启用源码构建离线组件',
          },
        ],
        image: '/img/video/offline-xinchuang-install-step-5.png',
        imageAlt: '安装完成后记录 Rainbond 控制台地址并查看 Pod 状态的终端截图',
        imageCaption: '安装成功提示和后续检查',
        timestamp: '',
      },
      {
        label: '',
        title: '打开控制台并验证安装结果',
        duration: '',
        description: '安装完成后，在浏览器中打开 Console 地址。如果页面可以正常打开，说明离线安装环境已经可用。',
        bullets: [
          '在浏览器访问 http://你的IP:7070。',
          '确认 Rainbond 控制台页面可以正常加载。',
          '如果打不开页面，优先检查主机防火墙、安全组和端口访问策略。',
        ],
        image: '/img/video/quick-install-step-open-console.png',
        imageAlt: '浏览器访问 Rainbond 控制台并验证离线安装结果的截图',
        imageCaption: '访问 Rainbond 控制台',
        timestamp: '',
      },
    ],
  },
  {
    id: 'source-ruoyi-deploy',
    title: '源码部署',
    summary: '从零创建应用，准备 MySQL 和 Redis，再通过源码构建完成若依后端、前端部署和访问验证。',
    category: '应用部署',
    difficulty: '源码部署',
    duration: '05:00',
    operationTime: '10 分钟',
    audience: '想通过源码构建部署 Java 后端和前端项目的用户',
    cover: '/img/video/source-ruoyi-deploy-cover.jpg',
    bvid: 'BV1Hc5C6aEBC',
    tags: ['源码部署', 'RuoYi', 'Java', '前后端分离'],
    href: '/videos/source-ruoyi-deploy',
    relatedIds: ['quick-install', 'helm-install'],
    steps: [
      {
        label: '',
        title: '安装 MySQL 和 Redis',
        duration: '',
        description: '先在 Rainbond 中创建若依应用，并从应用市场安装 MySQL 和 Redis，把运行底座补齐。',
        bullets: [
          'MySQL 用于保存若依业务数据和系统表。',
          'Redis 用于缓存、验证码和登录状态等功能。',
          '安装完成后，等待两个组件进入运行中状态。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-1-1.png',
            alt: '创建若依应用的截图',
            caption: '创建若依应用',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-1-2.png',
            alt: '从应用市场安装 MySQL 的截图',
            caption: '安装 MySQL',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-1-3.png',
            alt: '从应用市场安装 Redis 的截图',
            caption: '安装 Redis',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-1-4.png',
            alt: '确认 MySQL 和 Redis 运行状态的截图',
            caption: '确认组件运行',
          },
        ],
        image: '',
        imageAlt: '在 Rainbond 应用市场安装 MySQL 和 Redis 的截图待补充',
        imageCaption: '安装 MySQL 和 Redis',
        timestamp: '',
      },
      {
        label: '',
        title: '获取 MySQL 连接信息',
        duration: '',
        description: '进入 MySQL 组件，打开端口并查看连接信息，用页面提供的地址、端口、账号和密码连接数据库。',
        bullets: [
          '在端口页面开启 MySQL 对外访问。',
          '进入连接信息页面，复制访问地址、端口、root 账号和 root 密码。',
          '使用数据库工具或终端先确认 MySQL 可以正常连接。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-2-1.png',
            alt: '打开 MySQL 组件端口页面的截图',
            caption: '打开 MySQL 对外访问',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-2-2.png',
            alt: '查看 MySQL 连接信息的截图',
            caption: '复制 MySQL 连接信息',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-2-3.png',
            alt: '使用连接信息连接 MySQL 的截图',
            caption: '连接 MySQL',
          },
        ],
        image: '',
        imageAlt: '在 MySQL 组件中打开端口并查看连接信息的截图待补充',
        imageCaption: '获取数据库连接信息',
        timestamp: '',
      },
      {
        label: '',
        title: '创建 ry-vue 数据库并导入 SQL',
        duration: '',
        description: '连接 MySQL 后创建 ry-vue 数据库，并按顺序导入若依业务库和 Quartz 调度库 SQL。',
        bullets: [
          '新建数据库时填写 ry-vue。',
          '字符集和排序规则在建库时一起选好，避免后续中文内容乱码。',
          '先执行若依系统业务表和默认数据 SQL，再执行 Quartz 定时任务调度表 SQL。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-3-1.png',
            alt: '创建 ry-vue 数据库的截图',
            caption: '创建 ry-vue 数据库',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-3-2.png',
            alt: '导入若依 SQL 的截图',
            caption: '导入初始化 SQL',
          },
        ],
        image: '',
        imageAlt: '创建 ry-vue 数据库并导入若依初始化 SQL 的截图待补充',
        imageCaption: '初始化数据库',
        timestamp: '',
      },
      {
        label: '',
        title: 'Fork 源码并修改连接配置',
        duration: '',
        description: '把若依项目 Fork 到自己的仓库，然后把后端里的 MySQL 和 Redis 配置改成环境变量形式。',
        bullets: [
          '修改 application-druid.yml，将 MySQL 数据源改成环境变量。',
          '修改 application.yml，将 Redis host 和 port 改成环境变量。',
          '后续连接依赖后，Rainbond 会自动把数据库和缓存连接信息注入给组件。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-4-1.png',
            alt: '修改 application-druid.yml MySQL 数据源配置的截图',
            caption: '修改 MySQL 数据源配置',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-4-2.png',
            alt: '修改 application.yml Redis 配置的截图',
            caption: '修改 Redis 配置',
          },
        ],
        image: '',
        imageAlt: '修改若依后端 MySQL 和 Redis 配置文件的截图待补充',
        imageCaption: '修改后端连接配置',
        timestamp: '',
      },
      {
        label: '',
        title: '部署 ruoyi-admin 后端源码',
        duration: '',
        description: '回到 Rainbond 选择源码部署，填写仓库地址和分支，识别为 Java 多模块后选择 ruoyi-admin 开始构建。',
        bullets: [
          '代码地址和分支按实际 Fork 后的仓库分支填写。',
          '语言识别为 Java 多模块后，构建模块选择 ruoyi-admin。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-5-1.png',
            alt: '填写 ruoyi-admin 后端源码仓库地址的截图',
            caption: '填写源码仓库',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-5-2.png',
            alt: '填写 ruoyi-admin 后端源码分支的截图',
            caption: '填写代码分支',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-5-3.png',
            alt: 'Rainbond 识别若依 Java 多模块项目的截图',
            caption: '识别 Java 多模块',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-5-4.png',
            alt: '选择 ruoyi-admin 构建模块的截图',
            caption: '选择 ruoyi-admin',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-5-5.png',
            alt: '开始构建 ruoyi-admin 后端组件的截图',
            caption: '开始构建后端',
          },
        ],
        links: [
          {
            label: '查看 Java 源码部署文档',
            href: '/docs/how-to-guides/app-deploy/source-code/springboot',
          },
        ],
        image: '',
        imageAlt: '在 Rainbond 中通过源码部署 ruoyi-admin 后端组件的截图待补充',
        imageCaption: '部署 ruoyi-admin',
        timestamp: '',
      },
      {
        label: '',
        title: '部署 ruoyi-ui 前端源码',
        duration: '',
        description: '后端构建过程中继续新增前端组件，源码目录填写 ruoyi-ui，识别为 Vue 项目后配置构建命令。',
        bullets: [
          '源码仓库继续使用 Fork 后的若依仓库。',
          '子目录填写 ruoyi-ui，再填写代码分支。',
          '识别为 Vue 项目后，构建命令填写 build:prod。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-6-1.png',
            alt: '填写 ruoyi-ui 前端源码仓库和子目录的截图',
            caption: '填写 ruoyi-ui 子目录',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-6-2.png',
            alt: 'Rainbond 识别若依前端 Vue 项目的截图',
            caption: '识别 Vue 项目',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-6-3.png',
            alt: '配置若依前端 build:prod 构建命令的截图',
            caption: '配置构建命令',
          },
        ],
        image: '',
        imageAlt: '在 Rainbond 中通过源码部署 ruoyi-ui 前端组件的截图待补充',
        imageCaption: '部署 ruoyi-ui',
        timestamp: '',
      },
      {
        label: '',
        title: '调整 admin 存储和端口',
        duration: '',
        description: 'ruoyi-admin 构建完成后，补充日志存储目录，并把服务端口调整为若依后端实际使用的 8080。',
        bullets: [
          '给 ruoyi-admin 添加存储目录 logs，用来单独挂载运行日志。',
          '删除默认 5000 端口前，先关闭该端口的对内和对外访问。',
          '新增 8080 端口，并打开对内和对外访问。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-7-1.png',
            alt: '为 ruoyi-admin 添加 logs 存储目录的截图',
            caption: '添加 logs 存储目录',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-7-2.png',
            alt: '关闭 ruoyi-admin 默认 5000 端口访问的截图',
            caption: '关闭 5000 端口访问',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-7-3.png',
            alt: '删除 ruoyi-admin 默认 5000 端口的截图',
            caption: '删除 5000 端口',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-7-4.png',
            alt: '为 ruoyi-admin 新增并打开 8080 端口的截图',
            caption: '新增 8080 端口',
          },
        ],
        image: '',
        imageAlt: '为 ruoyi-admin 配置 logs 存储目录并调整 8080 端口的截图待补充',
        imageCaption: '调整后端端口和存储',
        timestamp: '',
      },
      {
        label: '',
        title: '打开 UI 访问并连接依赖',
        duration: '',
        description: '进入 ruoyi-ui 组件打开对外端口，然后把 MySQL、Redis、admin 和 UI 的依赖关系连接好。',
        bullets: [
          'ruoyi-ui 必须开启对外访问，否则无法从浏览器访问前端页面。',
          '将 admin 连接到 MySQL 和 Redis，让连接信息自动注入后端。',
          '将 UI 与 admin 建立依赖，确保前端请求可以访问后端服务。',
        ],
        images: [
          {
            src: '/img/video/source-ruoyi-deploy-step-8-1.png',
            alt: '打开 ruoyi-ui 对外访问端口的截图',
            caption: '打开 UI 对外访问',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-8-2.png',
            alt: '连接 MySQL 依赖关系的截图',
            caption: '连接 MySQL 依赖',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-8-3.png',
            alt: '连接 Redis 依赖关系的截图',
            caption: '连接 Redis 依赖',
          },
          {
            src: '/img/video/source-ruoyi-deploy-step-8-4.png',
            alt: '连接 admin 和 UI 依赖关系的截图',
            caption: '连接 admin 服务',
          },
        ],
        image: '',
        imageAlt: '打开 ruoyi-ui 对外访问并配置若依组件依赖关系的截图待补充',
        imageCaption: '连接组件依赖',
        timestamp: '',
      },
      {
        label: '',
        title: '访问若依 UI 验证部署',
        duration: '',
        description: '等待 MySQL、Redis、admin 和 UI 全部变绿后，打开 ruoyi-ui 访问地址验证页面。',
        bullets: [
          '确认若依 UI 页面可以正常打开。',
          '验证码、登录接口和后台菜单加载正常，说明部署成功。',
          '如果页面打不开，优先检查前端端口、网关访问策略和后端 API 地址。',
        ],
        image: '/img/video/source-ruoyi-deploy-step-9-1.png',
        imageAlt: '打开若依 UI 页面并验证部署成功的截图',
        imageCaption: '访问若依系统',
        timestamp: '',
      },
    ],
  },
  {
    id: 'app-store-install',
    title: '应用商店安装软件',
    summary: '了解 Rainbond 应用商店的使用方式，并演示从应用市场一键安装开源应用。',
    category: '应用商店',
    difficulty: '功能介绍',
    duration: '00:53',
    operationTime: '8 分钟',
    audience: '想了解应用市场和一键安装应用能力的用户',
    cover: '/img/video/app-store-install-cover.jpg',
    bvid: 'BV12Q5k6BEkx',
    tags: ['应用商店', '一键安装', '开源应用'],
    href: '/videos/app-store-install',
    relatedIds: ['source-ruoyi-deploy', 'quick-install'],
    steps: [
      {
        label: '',
        title: '进入 Rainbond 应用商店',
        duration: '',
        description: '先进入 Rainbond 应用商店，浏览常用开源应用和软件分类，找到适合当前场景的应用。',
        bullets: [
          '应用商店中包含 AI 智能体与应用、业务与生产力应用、开发工具、开发环境、数据和中间件等类型。',
          '用户可以通过分类或搜索快速找到需要的软件。',
        ],
        image: '/img/video/app-store-install-step-1.png',
        imageAlt: 'Rainbond 应用商店首页和应用分类列表截图',
        imageCaption: '浏览应用商店',
        timestamp: '',
      },
      {
        label: '',
        title: '搜索并选择 Dify 应用',
        duration: '',
        description: '以 Dify 为例，在应用商店中找到对应应用，进入应用详情后确认应用信息并开始安装。',
        bullets: [
          '在应用列表中找到 Dify，或直接通过搜索定位应用。',
          '进入详情页后确认应用名称、版本和说明。',
          '点击安装，进入安装确认流程。',
        ],
        image: '/img/video/app-store-install-step-2.png',
        imageAlt: 'Rainbond 应用商店中选择 Dify 应用的截图',
        imageCaption: '选择 Dify 应用',
        timestamp: '',
      },
      {
        label: '',
        title: '选择安装团队并确认安装',
        duration: '',
        description: '选择应用要安装到的团队，确认后 Rainbond 会自动创建应用并开始部署。',
        bullets: [
          '根据实际使用场景选择目标团队。',
          '确认安装信息无误后提交安装。',
          '提交后无需手动编排组件，Rainbond 会自动处理应用部署流程。',
        ],
        image: '/img/video/app-store-install-step-3.png',
        imageAlt: '选择 Dify 安装团队并确认安装的页面截图',
        imageCaption: '确认安装目标团队',
        timestamp: '',
      },
      {
        label: '',
        title: '等待组件部署完成',
        duration: '',
        description: '安装提交后等待组件启动。组件状态全部变绿后，说明应用已经部署完成并可用。',
        bullets: [
          'Rainbond 会自动处理组件关系和依赖编排。',
          '等待应用拓扑中的组件陆续进入运行中状态。',
          '如果组件长时间未变绿，可以进入组件详情查看构建和运行日志。',
        ],
        image: '/img/video/app-store-install-step-4.png',
        imageAlt: 'Dify 应用拓扑中组件状态全部运行中的截图',
        imageCaption: '等待 Dify 组件运行',
        timestamp: '',
      },
      {
        label: '',
        title: '访问 Dify 验证安装结果',
        duration: '',
        description: '组件全部运行后，点击访问入口进入 Dify，确认应用页面可以正常打开。',
        bullets: [
          '在应用或组件页面点击访问入口，打开 Dify 页面。',
          '确认页面可以正常加载，说明应用安装成功。',
        ],
        image: '/img/video/app-store-install-step-5.png',
        imageAlt: '访问 Dify 应用并验证安装结果的截图',
        imageCaption: '访问 Dify 应用',
        timestamp: '',
      },
      {
        label: '',
        title: '新版本完成应用升级',
        duration: '',
        description: '后续应用有新版本时，不需要重新部署一遍，直接在应用升级中选择新版本并确认升级。',
        bullets: [
          '进入应用升级页面，查看可升级的新版本。',
          '选择目标版本后确认升级。',
          '等待升级完成并确认组件状态恢复正常。',
        ],
        image: '/img/video/app-store-install-step-6.png',
        imageAlt: '在 Rainbond 中选择 Dify 新版本并执行应用升级的截图',
        imageCaption: '升级应用版本',
        timestamp: '',
      },
    ],
  },
  {
    id: 'rainskills-ai-deploy',
    title: 'RainSkills 安装使用',
    summary: '了解如何把 RainSkills 接入 Codex 或 Claude Code，让 AI 从生成代码继续完成 Rainbond 部署、排错和访问验证。',
    category: 'AI 部署',
    difficulty: '功能介绍',
    duration: '01:46',
    operationTime: '10 分钟',
    audience: '正在使用 Codex、Claude Code 等 AI 编码工具，并希望把项目继续部署到 Rainbond 的开发者',
    cover: '/img/video/rainskills-ai-deploy-cover.jpg',
    bvid: 'BV1TxG46WE3L',
    tags: ['RainSkills', 'AI 部署', 'Codex', 'Claude Code', 'Rainbond'],
    href: '/videos/rainskills-ai-deploy',
    relatedIds: ['source-ruoyi-deploy', 'app-store-install', 'ops-management'],
    steps: [
      {
        label: '',
        title: '安装 RainSkills',
        duration: '',
        description: '在本地终端执行 RainSkills 安装流程，把 Rainbond 部署能力接入到本机 AI 编码工具环境中。',
        bullets: [
          '在本机终端中启动 RainSkills 安装。',
          '等待安装流程写入对应的 Skills 配置。',
          '如果后续要立刻使用，需要按终端提示重新加载环境或重启 AI 工具。',
        ],
        commandTitle: 'RainSkills 安装命令',
        command: 'bash <(curl -fsSL https://get.rainbond.com/rainskills/install.sh)',
        image: '/img/video/rainskills-step-1.png',
        imageAlt: '终端中执行 RainSkills 安装流程的截图',
        imageCaption: '执行 RainSkills 安装',
        timestamp: '',
      },
      {
        label: '',
        title: '选择接入工具',
        duration: '',
        description: '根据实际使用场景选择 Codex、Claude Code，或同时配置两个工具。',
        bullets: [
          '使用 Codex 的用户选择 Codex。',
          '使用 Claude Code 的用户选择 Claude Code。',
          '如果两种工具都会使用，可以同时配置。',
        ],
        image: '/img/video/rainskills-step-2.png',
        imageAlt: 'RainSkills 安装过程中选择 Codex 或 Claude Code 的终端截图',
        imageCaption: '选择 AI 编码工具',
        timestamp: '',
      },
      {
        label: '',
        title: '选择部署环境',
        duration: '',
        description: '选择使用 Rainbond Cloud，或连接自己的私有化 Rainbond 环境。',
        bullets: [
          '想快速开始，可以选择官方维护的 Rainbond Cloud。',
          '已有自己的 Rainbond 环境时，选择私有化部署并填写 Console 地址。',
          '确认部署环境后，RainSkills 会继续进入认证流程。',
        ],
        bulletLinks: [
          {
            bulletIndex: 0,
            links: [
              {
                label: '打开 Rainbond Cloud',
                href: 'https://run.rainbond.com',
              },
            ],
          },
          {
            bulletIndex: 1,
            links: [
              {
                label: '查看私有部署入口',
                href: '/install-hub',
              },
            ],
          },
        ],
        image: '/img/video/rainskills-step-3.png',
        imageAlt: 'RainSkills 安装过程中选择 Rainbond Cloud 或私有化部署的终端截图',
        imageCaption: '选择 Rainbond 部署环境',
        timestamp: '',
      },
      {
        label: '',
        title: '完成浏览器认证',
        duration: '',
        description: '配置完成后浏览器会自动打开认证页面。认证通过后，重新启动 Codex 或 Claude Code，让配置生效。',
        bullets: [
          '在浏览器中完成 Rainbond 账号认证。',
          '认证成功后回到终端查看完成提示。',
          '重新启动 AI 编码工具，确保 RainSkills 配置被加载。',
        ],
        image: '/img/video/rainskills-step-4.png',
        imageAlt: '浏览器中完成 RainSkills Rainbond 认证的截图',
        imageCaption: '完成 Rainbond 认证',
        timestamp: '',
      },
      {
        label: '',
        title: '导入项目并发起部署',
        duration: '',
        description: '进入项目目录，在 Codex 或 Claude Code 中直接发起部署请求，让 AI 接管后续上线流程。',
        bullets: [
          '在 AI 编码工具中打开需要部署的项目目录。',
          '明确告诉 AI 需要把当前项目部署到 Rainbond。',
          'RainSkills 会基于当前项目继续执行识别、配置和部署动作。',
        ],
        commandTitle: '部署指令示例',
        command: '帮我把当前项目部署到 Rainbond',
        image: '/img/video/rainskills-step-5.png',
        imageAlt: '在 Codex 或 Claude Code 中输入 Rainbond 部署指令的截图',
        imageCaption: '一句话发起部署',
        timestamp: '',
      },
      {
        label: '',
        title: '识别组件和依赖关系',
        duration: '',
        description: 'RainSkills 会分析项目结构，识别数据库、后端服务、前端服务以及组件之间的依赖关系。',
        bullets: [
          '扫描项目目录，判断项目类型和运行方式。',
          '识别数据库、后端、前端等组件边界。',
          '整理组件依赖关系，为创建 Rainbond 应用拓扑做准备。',
        ],
        image: '/img/video/rainskills-step-6.png',
        imageAlt: 'RainSkills 识别项目组件和依赖关系的输出截图',
        imageCaption: '识别组件和依赖',
        timestamp: '',
      },
      {
        label: '',
        title: '配置部署参数并触发上线',
        duration: '',
        description: '根据识别结果，为组件配置环境变量、端口、存储和访问入口，再触发部署并持续观察运行状态。',
        bullets: [
          '为后端、前端和依赖组件补齐环境变量。',
          '按服务实际监听情况配置端口和访问入口。',
          '触发部署后持续查看构建、启动和运行状态。',
        ],
        image: '/img/video/rainskills-step-7.png',
        imageAlt: 'RainSkills 配置环境变量、端口、存储和访问入口的截图',
        imageCaption: '配置并触发部署',
        timestamp: '',
      },
      {
        label: '',
        title: '排错修复并验证访问',
        duration: '',
        description: '如果部署过程中出现异常，RainSkills 会查看事件和日志，定位原因并修复；修复后再次验证组件状态并给出访问地址。',
        bullets: [
          '遇到异常时先查看事件、日志和组件状态。',
          '根据原因修复配置，例如资源规格、环境变量或依赖连接。',
          '二次验证组件运行状态，最终确认应用访问地址可用。',
        ],
        image: '/img/video/rainskills-step-8.png',
        imageAlt: 'RainSkills 排查部署异常、修复问题并输出访问地址的截图',
        imageCaption: '排错修复并验证访问',
        timestamp: '',
      },
    ],
  },
  {
    id: 'rainagent-install-use',
    title: 'RainAgent 安装使用',
    summary: '了解如何在 Rainbond 控制台中安装 RainAgent，并通过对话让 AI 助手完成应用部署、关键操作确认、异常排查和访问验证。',
    category: 'AI 部署',
    difficulty: '功能介绍',
    duration: '01:46',
    operationTime: '8 分钟',
    audience: '希望在 Rainbond 控制台内通过 AI 助手完成应用部署和运维排错的用户',
    cover: '/img/video/rainagent-install-use-cover.jpg',
    bvid: 'BV1HiG462Ezz',
    tags: ['RainAgent', 'AI 助手', '应用部署', '部署排错', 'Rainbond 控制台'],
    href: '/videos/rainagent-install-use',
    relatedIds: ['rainskills-ai-deploy', 'source-ruoyi-deploy', 'ops-management'],
    steps: [
      {
        label: '',
        title: '准备 Rainbond 控制台环境',
        duration: '',
        description: '使用 RainAgent 前需要先有一个可访问的 Rainbond 控制台。已经有控制台环境的用户，直接登录后进入下一步。',
        bullets: [
          '确认 Rainbond 控制台可以正常访问。',
          '如果还没有安装 Rainbond，可以先通过快速安装完成环境部署。',
          '登录控制台后，确认当前账号具备安装平台插件和配置 AI 助手的权限。',
        ],
        bulletLinks: [
          {
            bulletIndex: 1,
            links: [
              {
                label: '快速安装视频',
                href: '/videos/quick-install',
              },
            ],
          },
        ],
        image: '/img/video/rainagent-step-1.png',
        imageAlt: '准备 Rainbond 控制台环境的截图',
        imageCaption: '准备 Rainbond 控制台环境',
        timestamp: '',
      },
      {
        label: '',
        title: '安装 RainAgent 插件',
        duration: '',
        description: '在控制台右上角打开 AI 助手入口，根据页面引导进入平台插件安装流程，安装 RainAgent 插件。',
        bullets: [
          '点击控制台右上角的 AI 助手入口。',
          '按照提示进入平台插件页面。',
          '选择 RainAgent 或 AI 助手插件并完成安装。',
        ],
        image: '/img/video/rainagent-step-2.png',
        imageAlt: '在 Rainbond 控制台中安装 RainAgent 插件的截图',
        imageCaption: '安装 RainAgent 插件',
        timestamp: '',
      },
      {
        label: '',
        title: '配置大模型连接信息',
        duration: '',
        description: '进入 RainAgent 配置页面，填写模型服务地址、模型名称和认证信息，让 AI 助手可以正常调用大模型。',
        bullets: [
          '填写可用的大模型服务地址和模型名称。',
          '认证信息使用后台配置或环境变量保存，不要在页面说明、截图或文档中暴露密钥。',
          '保存配置后，回到控制台准备测试 AI 助手。',
        ],
        image: '/img/video/rainagent-step-3.png',
        imageAlt: '配置 RainAgent 大模型连接信息的页面截图',
        imageCaption: '配置大模型连接',
        timestamp: '',
      },
      {
        label: '',
        title: '测试 AI 助手是否可用',
        duration: '',
        description: '回到工作空间打开 AI 助手，发送一个简单问题，确认 RainAgent 可以正常响应。',
        bullets: [
          '从控制台右上角重新打开 AI 助手。',
          '发送简单问题或当前应用相关问题。',
          '确认 AI 助手可以返回正常结果，再开始执行部署任务。',
        ],
        image: '/img/video/rainagent-step-4.png',
        imageAlt: '在 Rainbond 控制台中测试 RainAgent 是否可用的截图',
        imageCaption: '测试 AI 助手',
        timestamp: '',
      },
      {
        label: '',
        title: '开始部署项目',
        duration: '',
        description: '把代码仓库地址和部署目标告诉 RainAgent，让它识别项目结构、组件关系和依赖服务。涉及创建组件、修改配置、调整资源或重新部署时，确认操作后继续推进部署。',
        bullets: [
          '在对话中说明需要部署的项目和目标环境。',
          'RainAgent 会识别前端、后端、数据库等组件边界。',
          '根据项目需要，让 RainAgent 同步创建数据库、组件、端口、环境变量和依赖关系。',
          '查看 RainAgent 给出的操作计划，对关键动作确认授权。',
          '执行过程中持续观察构建、启动和组件状态变化。',
        ],
        image: '/img/video/rainagent-step-5.png',
        imageAlt: '通过 RainAgent 发起项目部署的对话截图',
        imageCaption: '发起项目部署',
        timestamp: '',
      },
      {
        label: '',
        title: '授权确认操作',
        duration: '',
        description: 'RainAgent 给出部署计划后，先确认它将要创建或修改的组件、环境变量、端口、依赖关系和资源配置，再授权继续执行。',
        bullets: [
          '阅读 RainAgent 给出的操作计划，确认应用、组件、数据库和访问入口配置符合预期。',
          '确认会创建或修改的资源范围，避免误操作到其他应用。',
          '确认无误后，在对话中输入授权确认，让 RainAgent 继续执行部署。',
        ],
        image: '/img/video/rainagent-step-6.png',
        imageAlt: 'RainAgent 授权确认部署操作的对话截图',
        imageCaption: '授权确认部署操作',
        timestamp: '',
      },
      {
        label: '',
        title: '排查异常并验证访问结果',
        duration: '',
        description: '如果部署过程中出现异常，继续在对话中让 RainAgent 查看组件状态、日志和事件，定位问题并修复，最后验证访问结果。',
        bullets: [
          '组件异常时，让 RainAgent 查看状态、日志和事件信息。',
          '根据分析结果修复环境变量、端口、依赖连接或资源配置。',
          '组件全部运行后，打开访问入口确认应用页面可以正常加载。',
        ],
        image: '/img/video/rainagent-step-7.png',
        imageAlt: 'RainAgent 排查组件异常并验证应用访问结果的截图',
        imageCaption: '排错并验证访问',
        timestamp: '',
      },
    ],
  },
  {
    id: 'gateway-management',
    title: '网关管理',
    summary: '通过 Rainbond 网关统一管理应用访问入口、域名解析、证书 HTTPS、TCP 网关和 LoadBalancer 暴露方式。',
    category: '网关管理',
    difficulty: '功能介绍',
    duration: '00:49',
    operationTime: '5 分钟',
    audience: '需要为应用配置域名、证书和外部访问入口的用户',
    cover: '/img/video/gateway-management-cover.jpg',
    bvid: 'BV11R5k6iE7k',
    tags: ['网关', '域名', '证书', 'HTTPS'],
    href: '/videos/gateway-management',
    relatedIds: ['quick-install', 'app-store-install'],
    steps: [
      {
        label: '',
        title: '进入网关管理页面',
        duration: '',
        description: '先进入 Rainbond 网关管理页面，在同一个入口中管理 HTTP 路由、域名、证书和其他对外访问方式。',
        bullets: [
          '网关管理用于统一处理应用访问入口。',
          'HTTP 路由、证书管理、TCP 网关和 LoadBalancer 都可以在这里找到对应配置入口。',
        ],
        image: '/img/video/gateway-management-step-1.png',
        imageAlt: 'Rainbond 网关管理首页截图',
        imageCaption: '进入网关管理',
        timestamp: '',
      },
      {
        label: '',
        title: '添加 HTTP 路由并填写域名',
        duration: '',
        description: '新建 HTTP 路由并填写访问域名，页面会提示这个域名需要解析到哪个网关 IP。',
        bullets: [
          '填写要对外访问的域名。',
          '根据页面提示记录网关 IP。',
          '后续域名解析需要指向这个网关 IP。',
        ],
        image: '/img/video/gateway-management-step-2.png',
        imageAlt: '新增 HTTP 路由并填写域名的页面截图',
        imageCaption: '填写访问域名',
        timestamp: '',
      },
      {
        label: '',
        title: '完成域名解析',
        duration: '',
        description: '根据页面提示，把域名解析到对应网关 IP。解析完成后，域名才能正常进入 Rainbond 网关。',
        bullets: [
          '到域名服务商或 DNS 管理平台中添加解析记录。',
          '解析目标填写 Rainbond 页面提示的网关 IP。',
          '等待解析生效后，再继续验证访问入口。',
        ],
        image: '/img/video/gateway-management-step-3.png',
        imageAlt: '域名解析配置或 Rainbond 网关 IP 提示截图',
        imageCaption: '配置域名解析',
        timestamp: '',
      },
      {
        label: '',
        title: '选择路径并绑定组件端口',
        duration: '',
        description: '为路由设置访问路径，选择需要暴露的组件和端口，完成 HTTP 路由创建。',
        bullets: [
          '按实际访问需求设置路径规则。',
          '选择要对外暴露的组件。',
          '绑定组件中实际提供服务的端口。',
        ],
        image: '/img/video/gateway-management-step-4.png',
        imageAlt: 'HTTP 路由中选择路径、组件和端口的截图',
        imageCaption: '绑定组件端口',
        timestamp: '',
      },
      {
        label: '',
        title: '访问域名验证转发结果',
        duration: '',
        description: '路由和解析都配置完成后，直接访问域名，确认请求可以通过网关转发到对应组件。',
        bullets: [
          '在浏览器中打开配置好的域名。',
          '确认应用页面可以正常加载。',
          '如果访问失败，优先检查域名解析、路由规则、组件端口和防火墙策略。',
        ],
        image: '/img/video/gateway-management-step-5.png',
        imageAlt: '浏览器访问配置好的应用域名并正常打开页面的截图',
        imageCaption: '验证域名访问',
        timestamp: '',
      },
      {
        label: '',
        title: '添加证书并启用 HTTPS',
        duration: '',
        description: '如果需要安全访问，在证书管理中添加证书。证书和域名匹配后，系统会自动为路由启用 HTTPS。',
        bullets: [
          '进入证书管理并添加域名证书。',
          '确保证书中的域名和路由域名匹配。',
          '如果暴露的不是 HTTP/HTTPS 服务，可以使用 TCP 网关或 LoadBalancer 对外开放。',
        ],
        image: '/img/video/gateway-management-step-6.png',
        imageAlt: 'Rainbond 证书管理中添加证书并启用 HTTPS 的截图',
        imageCaption: '配置证书和 HTTPS',
        timestamp: '',
      },
    ],
  },
  {
    id: 'offline-delivery',
    title: '离线交付',
    summary: '通过应用模板把开发环境中的业务系统导出为离线包，并在客户内网环境中完成导入、安装和后续升级。',
    category: '离线交付',
    difficulty: '交付场景',
    duration: '01:14',
    operationTime: '10 分钟',
    audience: '需要在客户现场、内网或完全离线环境中交付和升级业务系统的团队',
    cover: '/img/video/offline-delivery-cover.jpg',
    bvid: 'BV1xz5165Epa',
    tags: ['离线交付', '应用模板', '离线导入', '应用升级'],
    href: '/videos/offline-delivery',
    relatedIds: ['offline-xinchuang-install', 'app-store-install'],
    steps: [
      {
        label: '',
        title: '准备开发环境和离线交付环境',
        duration: '',
        description: '先准备两套 Rainbond 环境：开发环境用于构建、测试和发布应用模板，离线交付环境用于客户现场导入和安装应用。',
        bullets: [
          '开发环境中应已经完成业务应用部署和功能验证。',
          '离线交付环境需要提前安装好 Rainbond。',
          '两套环境通过应用模板离线包完成交付衔接。',
        ],
        image: '/img/video/offline-delivery-step-1-1.png',
        imageAlt: '开发环境中 Dify 应用已完成部署并处于运行状态的截图',
        imageCaption: '确认开发环境应用状态',
        timestamp: '',
      },
      {
        label: '',
        title: '创建应用快照',
        duration: '',
        description: '发布版本前先为当前应用创建快照，固化已经验证通过的组件、配置和依赖关系。',
        bullets: [
          '进入开发环境中的业务应用。',
          '确认当前应用已经完成测试验证。',
          '创建应用快照，作为后续发布应用模板版本的基础。',
        ],
        images: [
          {
            src: '/img/video/offline-delivery-step-2-1.png',
            alt: '在应用总览中进入快照创建入口的截图',
            caption: '进入应用快照入口',
          },
          {
            src: '/img/video/offline-delivery-step-2-2.png',
            alt: '填写并创建应用快照的截图',
            caption: '填写快照信息',
          },
          {
            src: '/img/video/offline-delivery-step-2-3.png',
            alt: '应用快照创建完成的截图',
            caption: '确认快照创建完成',
          },
        ],
        image: '',
        imageAlt: '在开发环境创建应用快照的页面截图',
        imageCaption: '创建应用快照',
        timestamp: '',
      },
      {
        label: '',
        title: '发布应用模板版本',
        duration: '',
        description: '基于刚刚创建的应用快照发布到本地组件库，生成可交付的应用模板版本。',
        bullets: [
          '进入应用发布页面，选择发布到本地组件库或应用市场。',
          '选择已创建的应用快照。',
          '填写应用模板信息和版本信息后提交发布。',
        ],
        images: [
          {
            src: '/img/video/offline-delivery-step-3-1.png',
            alt: '在应用版本页面选择发布到组件库的截图',
            caption: '选择发布到组件库',
          },
          {
            src: '/img/video/offline-delivery-step-3-2.png',
            alt: '选择已创建应用快照的截图',
            caption: '选择应用快照',
          },
          {
            src: '/img/video/offline-delivery-step-3-3.png',
            alt: '填写应用模板发布信息的截图',
            caption: '填写模板信息',
          },
          {
            src: '/img/video/offline-delivery-step-3-4.png',
            alt: '确认发布应用模板版本的截图',
            caption: '确认发布版本',
          },
          {
            src: '/img/video/offline-delivery-step-3-5.png',
            alt: '应用模板版本发布完成的截图',
            caption: '等待发布完成',
          },
        ],
        image: '',
        imageAlt: '基于应用快照发布应用模板版本的页面截图',
        imageCaption: '发布模板版本',
        timestamp: '',
      },
      {
        label: '',
        title: '确认应用模板版本',
        duration: '',
        description: '发布完成后，在应用市场的本地组件库中查看应用模板，确认版本已经生成并可用于导出。',
        bullets: [
          '进入平台管理中的应用市场。',
          '打开本地组件库，找到刚刚发布的应用模板。',
          '确认版本号、模板信息和发布状态正确。',
        ],
        images: [
          {
            src: '/img/video/offline-delivery-step-4-1.png',
            alt: '在应用版本页面打开发布记录的截图',
            caption: '打开发布记录',
          },
          {
            src: '/img/video/offline-delivery-step-4-2.png',
            alt: '发布记录中确认应用模板版本状态的截图',
            caption: '确认模板版本状态',
          },
        ],
        image: '',
        imageAlt: '本地组件库中查看应用模板版本的截图',
        imageCaption: '确认模板版本',
        timestamp: '',
      },
      {
        label: '',
        title: '导出应用模板离线包',
        duration: '',
        description: '选择需要交付的应用模板版本，导出离线包并下载到本地，再通过 U 盘或光盘带到离线环境。',
        bullets: [
          '在应用模板操作中选择导出应用模板。',
          '选择要交付的版本和导出类型。',
          '导出完成后下载离线包，并保存到离线传输介质中。',
        ],
        image: '/img/video/offline-delivery-step-5-1.png',
        imageAlt: '从发布记录中导出应用模板离线包的截图',
        imageCaption: '导出离线包',
        timestamp: '',
      },
      {
        label: '',
        title: '在离线环境导入应用模板',
        duration: '',
        description: '进入离线交付环境的应用市场，上传刚刚导出的离线包，并选择导入范围完成导入。',
        bullets: [
          '在离线环境中打开平台管理的应用市场。',
          '点击离线导入，上传应用模板离线包。',
          '根据交付范围选择企业或团队可见，并确认导入。',
        ],
        images: [
          {
            src: '/img/video/offline-delivery-step-6-1.png',
            alt: '在离线环境选择上传应用模板入口的截图',
            caption: '选择上传应用模板',
          },
          {
            src: '/img/video/offline-delivery-step-6-2.png',
            alt: '上传应用模板离线包并开始导入的截图',
            caption: '上传离线包',
          },
          {
            src: '/img/video/offline-delivery-step-6-3.png',
            alt: '选择离线包架构并确认导入的截图',
            caption: '确认导入配置',
          },
        ],
        image: '',
        imageAlt: '在离线环境上传并导入应用模板离线包的截图',
        imageCaption: '离线导入模板',
        timestamp: '',
      },
      {
        label: '',
        title: '一键安装并验证应用运行',
        duration: '',
        description: '导入完成后，在本地组件库中找到应用模板并点击安装。等待组件运行成功后，访问业务系统完成交付验证。',
        bullets: [
          '从导入后的应用模板中发起安装。',
          '选择目标团队或应用安装位置。',
          '等待组件状态变为运行中，再打开访问入口验证业务页面。',
        ],
        images: [
          {
            src: '/img/video/offline-delivery-step-7-1.png',
            alt: '在本地组件库中选择应用模板并点击安装的截图',
            caption: '从本地组件库安装',
          },
          {
            src: '/img/video/offline-delivery-step-7-2.png',
            alt: '离线环境中应用组件运行并完成拓扑验证的截图',
            caption: '验证应用运行状态',
          },
        ],
        image: '',
        imageAlt: '离线环境中一键安装应用并验证运行的截图',
        imageCaption: '安装并验证应用',
        timestamp: '',
      },
    ],
  },
  {
    id: 'ops-management',
    title: '应用运维',
    summary: '从部署入口、组件状态、日志排查、Web 终端到手动伸缩和自动伸缩，快速了解 Rainbond 的日常应用运维入口。',
    category: '应用运维',
    difficulty: '日常维护',
    duration: '01:07',
    operationTime: '5 分钟',
    audience: '需要快速了解 Rainbond 应用维护、排障和伸缩能力的开发与运维人员',
    cover: '/img/video/ops-management-cover.jpg',
    bvid: 'BV1sR5k6iE2f',
    tags: ['应用运维', '组件状态', '日志排查', 'Web 终端', '自动伸缩'],
    href: '/videos/ops-management',
    relatedIds: ['source-ruoyi-deploy', 'app-store-install', 'gateway-management'],
    steps: [
      {
        label: '',
        title: '选择部署方式并接入应用',
        duration: '',
        description: '应用运维的起点是把业务应用部署进来。Rainbond 提供源码、镜像、Yaml 和应用市场等多种部署方式。',
        bullets: [
          '根据应用来源选择合适的部署入口。',
          '源码、镜像、Yaml 适合已有业务系统接入。',
          '应用市场适合快速安装常用开源软件。',
        ],
        image: '/img/video/ops-management-step-1-1.png',
        imageAlt: 'Rainbond 新建应用时选择源码、镜像、Yaml 或应用市场部署方式的截图',
        imageCaption: '选择应用部署方式',
        timestamp: '',
      },
      {
        label: '',
        title: '查看应用拓扑和组件状态',
        duration: '',
        description: '部署完成后回到应用拓扑图，先看每个组件当前的运行状态，快速判断应用整体是否正常。',
        bullets: [
          '在拓扑图中查看组件之间的依赖关系。',
          '关注运行中、启动中、更新中、关闭和异常等状态。',
          '通过不同状态颜色快速判断需要处理的组件。',
        ],
        image: '/img/video/ops-management-step-2-1.png',
        imageAlt: 'Rainbond 应用拓扑中展示多个组件运行状态的截图',
        imageCaption: '查看组件状态',
        timestamp: '',
      },
      {
        label: '',
        title: '进入组件查看运行日志',
        duration: '',
        description: '如果组件出现异常，优先进入组件日志页面，查看启动失败、端口未监听、依赖连接失败等具体报错。',
        bullets: [
          '先从日志中确认异常发生的时间点和错误信息。',
          '重点关注启动失败、端口异常和依赖连接失败。',
          '日志能定位的问题，优先在组件配置里直接修复。',
        ],
        image: '/img/video/ops-management-step-3-1.png',
        imageAlt: 'Rainbond 组件详情中查看运行日志的截图',
        imageCaption: '查看组件日志',
        timestamp: '',
      },
      {
        label: '',
        title: '使用 Web 终端排查容器内部问题',
        duration: '',
        description: '日志信息不够明确时，可以进入 Web 终端，直接进入容器内部确认服务是否正常运行。',
        bullets: [
          '进入容器后查看目录、进程和环境变量。',
          '确认业务进程是否存在、端口是否监听。',
          '结合日志判断问题是在应用内部还是外部依赖。',
        ],
        image: '/img/video/ops-management-step-4-1.png',
        imageAlt: 'Rainbond Web 终端中进入容器执行排查命令的截图',
        imageCaption: '进入 Web 终端排查',
        timestamp: '',
      },
      {
        label: '',
        title: '调整实例数量和资源规格',
        duration: '',
        description: '当业务压力上来时，可以直接在界面中调整实例数量、CPU 和内存，完成常规扩缩容操作。',
        bullets: [
          '根据业务压力调整组件实例数量。',
          '按实际负载修改 CPU 和内存规格。',
          '调整后观察组件状态，确认实例正常启动。',
        ],
        image: '/img/video/ops-management-step-5-1.png',
        imageAlt: 'Rainbond 组件伸缩页面中调整实例数量、CPU 和内存的截图',
        imageCaption: '调整实例和资源',
        timestamp: '',
      },
      {
        label: '',
        title: '配置自动伸缩策略',
        duration: '',
        description: '如果流量波动明显，可以基于 CPU、内存等指标配置自动伸缩，让组件按负载自动调整实例数量。',
        bullets: [
          '选择 CPU、内存等适合作为伸缩依据的指标。',
          '配置触发阈值以及最小、最大实例数。',
          '保存后持续观察业务负载和伸缩效果。',
        ],
        image: '/img/video/ops-management-step-6-1.png',
        imageAlt: 'Rainbond 自动伸缩配置页面中设置指标和实例范围的截图',
        imageCaption: '配置自动伸缩',
        timestamp: '',
      },
    ],
  },
];

export const getVideoTutorial = (id: string): VideoTutorial => {
  const video = videoTutorials.find((item) => item.id === id);

  if (!video) {
    throw new Error(`Unknown video tutorial: ${id}`);
  }

  return video;
};

export const getRelatedVideoTutorials = (video: VideoTutorial): VideoTutorial[] => {
  return video.relatedIds
    .map((id) => videoTutorials.find((item) => item.id === id))
    .filter((item): item is VideoTutorial => Boolean(item));
};

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config = {
  title: 'TailorMed Documents Center',
  tagline: 'TailorMed 專案文檔中心',
  favicon: 'img/tailormed-mark.svg', // 使用 TailorMed 標記作為 favicon

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'tailormed', // Usually your GitHub org/user name.
  projectName: 'tm-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  
  // Markdown 配置
  markdown: {
    mermaid: true,
    format: 'mdx',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  // 本地搜尋主題配置（必須放在 themes 中，不是 plugins）
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // 是否啟用雜湊檔名
        hashed: true,
        // 語言設定（支援中文和英文）
        language: ['en', 'zh'],
        // 索引設定
        indexDocs: true,  // 索引文檔
        indexBlog: false, // 不索引部落格
        indexPages: true, // 索引頁面
        // 文檔路徑
        docsRouteBasePath: '/docs',
        // 在目標頁面高亮搜尋關鍵字
        highlightSearchTermsOnTargetPage: true,
        // 明確的搜尋結果路徑
        explicitSearchResultPath: true,
        // 在開發模式下也建立索引（需要先執行一次 build）
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Document Center',
      logo: {
        alt: 'TailorMed Logo',
        src: 'img/tailormed-mark.svg', // 可以改為任何 static/img/ 中的圖片
        width: 32,  // 可選：設定寬度（像素）
        height: 32, // 可選：設定高度（像素）
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        // 搜尋框會自動出現在導航列右側
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文檔',
          items: [
            {
              label: '開始使用',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: '社群',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TailorMed. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;


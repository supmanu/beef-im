<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="th">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          <xsl:value-of select="/rss/channel/title" /> · RSS
        </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@500;700;800&amp;family=IBM+Plex+Mono:wght@400;500&amp;family=Sarabun:wght@400&amp;display=swap"
          rel="stylesheet" />
        <style type="text/css">
          :root {
            --paper: #F0EADC;
            --paper-2: #EDE7D8;
            --ink: #1B1A17;
            --ink-soft: #3A3530;
            --burn: #C2451F;
            --red: #CC3A2F;
          }
          * { box-sizing: border-box; }
          html, body { margin: 0; padding: 0; }
          body {
            background:
              linear-gradient(90deg, rgba(120,100,75,0.11) 1px, transparent 1px),
              linear-gradient(180deg, rgba(120,100,75,0.11) 1px, transparent 1px),
              linear-gradient(180deg, var(--paper) 0%, var(--paper-2) 100%);
            background-size: 24px 24px, 24px 24px, auto;
            color: var(--ink);
            font-family: "Sarabun", "Noto Sans Thai", sans-serif;
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
          }
          .wrap { max-width: 720px; margin: 0 auto; padding: 0 18px 80px; }
          @media (min-width: 768px) { .wrap { padding: 0 24px 96px; } }
          .nav {
            display: flex; justify-content: space-between; align-items: center;
            padding: 18px 24px 16px;
            border-bottom: 1px solid rgba(120,100,75,0.14);
            background: rgba(240,234,220,0.92);
            backdrop-filter: blur(4px);
            position: sticky; top: 0; z-index: 10;
          }
          .brand {
            font-family: "Anuphan", "Noto Sans Thai", sans-serif;
            font-weight: 700; font-size: 16px; letter-spacing: -0.01em;
            color: var(--ink); text-decoration: none; line-height: 1.2;
            position: relative; transition: color 0.35s ease;
          }
          .brand small {
            display: block; font-family: "IBM Plex Mono", monospace;
            font-size: 8px; color: rgba(27,26,23,0.42);
            letter-spacing: 0.22em; text-transform: uppercase; margin-top: 1px;
          }
          .brand::after {
            content: ''; position: absolute; bottom: -2px; left: 0;
            width: 0; height: 1.5px; background: var(--red);
            transition: width 0.4s ease;
          }
          .brand:hover { color: var(--burn); }
          .brand:hover::after { width: 100%; }
          @media (min-width: 768px) {
            .brand { font-size: 20px; }
            .brand small { font-size: 9.5px; margin-top: 2px; }
          }
          @media (min-width: 1200px) {
            .brand { font-size: 22px; }
            .brand small { font-size: 10px; letter-spacing: 0.24em; }
          }
          .back {
            font-family: "IBM Plex Mono", monospace; font-size: 10px;
            color: var(--burn); text-decoration: none; letter-spacing: 0.08em;
          }
          .back:hover { text-decoration: underline; }

          header.hd { padding: 44px 0 12px; }
          .eyebrow {
            font-family: "IBM Plex Mono", monospace; font-size: 10px;
            letter-spacing: 0.18em; text-transform: uppercase;
            color: var(--burn); margin-bottom: 20px; display: block;
          }
          h1 {
            font-family: "Anuphan", "Noto Sans Thai", sans-serif;
            font-weight: 800; font-size: clamp(28px, 5vw, 40px);
            letter-spacing: -0.025em; line-height: 1.15;
            margin: 0 0 8px; color: var(--ink);
          }
          .lede {
            font-family: "Sarabun", "Noto Sans Thai", sans-serif;
            font-size: 16px; line-height: 1.7; color: rgba(27,26,23,0.72);
            margin: 0 0 24px;
          }
          hr.rule {
            border: none; border-top: 1.5px solid var(--red);
            width: 48px; margin: 28px 0; opacity: 0.7;
          }

          .info {
            background: rgba(244,237,214,0.65);
            border-left: 2px solid rgba(120,100,75,0.28);
            padding: 14px 16px; margin: 0 0 36px;
            font-family: "Sarabun", "Noto Sans Thai", sans-serif;
            font-size: 14px; color: var(--ink-soft); line-height: 1.65;
          }
          .info code {
            font-family: "IBM Plex Mono", monospace; font-size: 12px;
            background: rgba(120,100,75,0.1); padding: 1px 6px; border-radius: 3px;
            color: var(--ink);
          }

          .feed-list { list-style: none; padding: 0; margin: 0; }
          .item {
            padding: 22px 0;
            border-bottom: 1px solid rgba(120,100,75,0.12);
          }
          .item:last-child { border-bottom: none; }
          .item-date {
            font-family: "IBM Plex Mono", monospace; font-size: 9.5px;
            color: rgba(27,26,23,0.48); letter-spacing: 0.10em;
            text-transform: uppercase; display: block; margin-bottom: 6px;
          }
          .item-title {
            font-family: "Anuphan", "Noto Sans Thai", sans-serif;
            font-weight: 700; font-size: 18px; line-height: 1.35;
            letter-spacing: -0.01em; margin: 0 0 6px;
          }
          .item-title a { color: var(--ink); text-decoration: none; }
          .item-title a:hover { color: var(--burn); }
          .item-lede {
            font-family: "Sarabun", "Noto Sans Thai", sans-serif;
            font-size: 14.5px; line-height: 1.65;
            color: rgba(27,26,23,0.7); margin: 0;
          }

          .footer {
            margin-top: 56px; padding-top: 16px;
            border-top: 1px solid rgba(120,100,75,0.18);
            font-family: "IBM Plex Mono", monospace; font-size: 10px;
            color: rgba(27,26,23,0.42); letter-spacing: 0.04em;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <nav class="nav">
          <a href="/" class="brand">ประกันเนื้อๆ<small>BEEF · IM · JOURNAL</small></a>
          <a href="/" class="back">← สมุดบันทึก</a>
        </nav>

        <main class="wrap">
          <header class="hd">
            <span class="eyebrow">RSS FEED</span>
            <h1><xsl:value-of select="/rss/channel/title" /></h1>
            <p class="lede"><xsl:value-of select="/rss/channel/description" /></p>
            <hr class="rule" />
          </header>

          <div class="info">
            หน้านี้คือ RSS feed ของ beef.im — สำหรับ feed reader เช่น
            <code>NetNewsWire</code>, <code>Feedly</code>, <code>Inoreader</code>
            ใส่ URL ด้านล่างใน reader ของคุณเพื่อรับบทความใหม่อัตโนมัติ
            <br /><br />
            <code><xsl:value-of select="/rss/channel/link" />rss.xml</code>
          </div>

          <ul class="feed-list">
            <xsl:for-each select="/rss/channel/item">
              <li class="item">
                <span class="item-date"><xsl:value-of select="pubDate" /></span>
                <h2 class="item-title">
                  <a>
                    <xsl:attribute name="href">
                      <xsl:value-of select="link" />
                    </xsl:attribute>
                    <xsl:value-of select="title" />
                  </a>
                </h2>
                <p class="item-lede"><xsl:value-of select="description" /></p>
              </li>
            </xsl:for-each>
          </ul>

          <div class="footer">
            เน้นเนื้อๆ ไม่เอาน้ำ ©2026
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

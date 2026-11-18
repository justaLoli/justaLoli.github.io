/* global KEEP */

// ADDED: documentations page
// 右侧页内 TOC 跟随滚动高亮；移动端点击目录后自动收起。
// pjax 会重复执行本文件，所以用一次性全局函数刷新，避免重复绑定 scroll。

;(function () {
  let tocLinks = []
  let targets = []
  let ticking = false

  function collect() {
    tocLinks = Array.from(document.querySelectorAll('.doc-toc-side a[href^="#"]'))
    targets = tocLinks
      .map((link) => {
        let id = link.getAttribute('href').slice(1)
        try {
          id = decodeURIComponent(id)
        } catch (err) {
          // 标题里带 % 之类的字符时保持原样
        }
        return { link, el: document.getElementById(id) }
      })
      .filter((item) => item.el)
  }

  function activate(link) {
    tocLinks.forEach((item) => item.classList.toggle('is-active', item === link))
  }

  function update() {
    ticking = false
    if (!targets.length) return

    // 视口上方 130px 处作为判定线
    const line = 130
    let active = null
    for (const item of targets) {
      if (item.el.getBoundingClientRect().top <= line) active = item.link
      else break
    }
    activate(active || tocLinks[0] || null)
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(update)
  }

  function bindClose() {
    document.querySelectorAll('.doc-nav-mobile a, .doc-toc-mobile a').forEach((link) => {
      if (link.dataset.docClose === '1') return
      link.dataset.docClose = '1'
      link.addEventListener('click', () => {
        const details = link.closest('details')
        if (details) details.open = false
      })
    })
  }

  function init() {
    const layout = document.querySelector('.doc-layout')
    if (!layout) return

    // /<page>/ 跳到第一篇文档，保持 URL 与页面一致
    if (layout.dataset.docIndex === '1' && layout.dataset.docFirst) {
      window.location.replace(layout.dataset.docFirst)
      return
    }

    collect()
    bindClose()
    update()
  }

  window.__initDocumentations = init

  document.addEventListener('scroll', onScroll, { passive: true })

  if (KEEP.theme_config && KEEP.theme_config.pjax && KEEP.theme_config.pjax.enable === true && KEEP.utils) {
    init()
  } else {
    window.addEventListener('DOMContentLoaded', init)
  }
})()

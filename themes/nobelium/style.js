/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return <style jsx global>{`
    /* 亮色模式 - 护眼纸张色 */
    body{
        background-color: #FAF8F2; /* 温和米白 */
    }

    /* 暗色模式 - 深灰色而非纯黑 */
    .dark body{
        background-color: #1F1F1F; /* 深灰 */
    }
    
    /* 修复DarkModeButton响应性问题 */
    #theme-nobelium .dark-mode-button {
        pointer-events: auto !important;
        cursor: pointer !important;
        opacity: 1 !important;
        transition: opacity 0.1s ease-in-out;
    }
    
    /* 修复Twikoo评论区代码高亮问题 */
    #theme-nobelium .tk-expand,
    .dark #theme-nobelium .tk-expand {
        display: none !important; /* 隐藏展开箭头 */
    }
    
    /* 修复代码块在日夜间模式切换时的样式 */
    #theme-nobelium .tk-content pre,
    .dark #theme-nobelium .tk-content pre {
        position: relative;
        overflow: auto !important; /* 确保代码可滚动而非折叠 */
        max-height: none !important; /* 防止被限制高度 */
    }
    
    /* 确保代码高亮兼容日夜间模式 */
    #theme-nobelium .tk-content pre code,
    .dark #theme-nobelium .tk-content pre code {
        display: block !important;
        overflow: visible !important;
    }
  `}</style>
}

export { Style }

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
  `}</style>
}

export { Style }

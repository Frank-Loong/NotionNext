/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* 移动端悬浮控制按钮共享样式 */
      .catalog-toggle-btn {
        transition: all 0.2s ease-in-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      }
      
      .catalog-toggle-btn:active {
        transform: scale(0.92);
      }
      
      /* 移动端目录抽屉样式优化 */
      @media (max-width: 768px) {
        /* 确保移动端底部有足够的空间不被遮挡 */
        #article-wrapper {
          padding-bottom: 70px;
        }
        
        /* 统一的悬浮按钮动画效果 */
        .mobile-catalog-drawer {
          scrollbar-width: none;
        }
        
        .mobile-catalog-drawer::-webkit-scrollbar {
          display: none;
        }
        
        /* 安全区域适配 */
        .h-safe-area-bottom {
          height: env(safe-area-inset-bottom, 0);
        }
        
        /* 悬浮按钮组样式 */
        .float-btn-group > div {
          margin-bottom: 0.75rem;
          transform: translateZ(0);
          will-change: transform;
        }
      }
      
      /* 优化暗黑模式下的按钮外观 */
      .dark .catalog-toggle-btn,
      .dark #jump-to-top {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
    `}</style>
  )
}

export { Style }

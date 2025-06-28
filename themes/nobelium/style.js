/* eslint-disable react/no-unknown-property */
/**
 * 此处样式只对当前主题生效
 * 此处不支持tailwindCSS的 @apply 语法
 * @returns
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* 移动端目录按钮样式 */
      .catalog-toggle-btn {
        transition: all 0.2s ease-in-out;
      }
      
      .catalog-toggle-btn:active {
        transform: scale(0.95);
      }
      
      /* 移动端目录抽屉样式优化 */
      @media (max-width: 768px) {
        /* 确保移动端底部有足够的空间不被遮挡 */
        #article-wrapper {
          padding-bottom: 70px;
        }
        
        /* 优化滚动条样式 */
        .mobile-catalog-drawer {
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
        }
        
        .mobile-catalog-drawer::-webkit-scrollbar {
          width: 4px;
        }
        
        .mobile-catalog-drawer::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .mobile-catalog-drawer::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        
        .dark .mobile-catalog-drawer::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    `}</style>
  )
}

export { Style }

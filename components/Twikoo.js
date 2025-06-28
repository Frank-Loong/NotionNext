import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useRef } from 'react'
import { useGlobal } from '@/lib/global'

/**
 * Twikoo评论
 * @returns {JSX.Element}
 * @constructor
 */
const Twikoo = () => {
  const envId = siteConfig('COMMENT_TWIKOO_ENV_ID')
  const el = siteConfig('COMMENT_TWIKOO_ELEMENT_ID', '#twikoo')
  const twikooCDNURL = siteConfig('COMMENT_TWIKOO_CDN_URL')
  const lang = siteConfig('LANG')
  const twikooInitRef = useRef(false)
  const { isDarkMode } = useGlobal()
  
  // 处理日夜间模式切换时的代码高亮问题
  useEffect(() => {
    // 当主题模式变化时，如果twikoo已初始化，处理代码高亮
    if (twikooInitRef.current) {
      setTimeout(() => {
        // 隐藏展开箭头
        const expandBtns = document.querySelectorAll('.tk-expand');
        expandBtns.forEach(btn => {
          btn.style.display = 'none';
        });
        
        // 确保代码块正确显示
        const codeBlocks = document.querySelectorAll('.tk-content pre');
        codeBlocks.forEach(block => {
          block.style.maxHeight = 'none';
          block.style.overflow = 'auto';
        });
      }, 300);
    }
  }, [isDarkMode]);

  const loadTwikoo = async () => {
    try {
      await loadExternalResource(twikooCDNURL, 'js')
      const twikoo = window?.twikoo
      if (
        typeof twikoo !== 'undefined' &&
        twikoo &&
        typeof twikoo.init === 'function'
      ) {
        twikoo.init({
          envId: envId, // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
          el: el, // 容器元素
          lang: lang // 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
          // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
          // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
        })
        
        // 标记为已初始化
        twikooInitRef.current = true;
        
        // 初始化后处理代码块
        setTimeout(() => {
          // 隐藏展开箭头
          const expandBtns = document.querySelectorAll('.tk-expand');
          expandBtns.forEach(btn => {
            btn.style.display = 'none';
          });
          
          // 确保代码块正确显示
          const codeBlocks = document.querySelectorAll('.tk-content pre');
          codeBlocks.forEach(block => {
            block.style.maxHeight = 'none';
            block.style.overflow = 'auto';
          });
        }, 500);
      }
    } catch (error) {
      console.error('twikoo 加载失败', error)
    }
  }

  useEffect(() => {
    // 使用更可靠的方法初始化Twikoo
    if (!twikooInitRef.current) {
      loadTwikoo()
      
      // 设置一个备用计时器，确保初始化成功
      const backupTimer = setTimeout(() => {
        if (!twikooInitRef.current) {
          loadTwikoo()
        }
      }, 3000)
      
      return () => clearTimeout(backupTimer)
    }
  }, [])
  
  return <div id="twikoo" className="twikoo-container"></div>
}

export default Twikoo

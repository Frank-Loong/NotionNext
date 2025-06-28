import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useGlobal } from '@/lib/global'

/**
 * 移动端目录导航组件
 * 在屏幕底部显示一个可点击的目录按钮，点击后弹出目录抽屉
 */
const MobileCatalog = ({ toc }) => {
  const { locale } = useGlobal()
  const [showDrawer, setShowDrawer] = useState(false)
  const drawerRef = useRef(null)
  const tocIds = []
  
  // 同步选中目录事件
  const [activeSection, setActiveSection] = useState(null)
  const throttleMs = 200
  
  // 监听滚动事件
  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy)
    actionSectionScrollSpy()
    
    // 添加点击外部关闭抽屉的事件
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && 
          !event.target.classList.contains('catalog-toggle-btn')) {
        setShowDrawer(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const actionSectionScrollSpy = useCallback(
    throttle(() => {
      const sections = document.getElementsByClassName('notion-h')
      let prevBBox = null
      let currentSectionId = activeSection
      
      for (let i = 0; i < sections.length; ++i) {
        const section = sections[i]
        if (!section || !(section instanceof Element)) continue
        if (!currentSectionId) {
          currentSectionId = section.getAttribute('data-id')
        }
        const bbox = section.getBoundingClientRect()
        const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
        const offset = Math.max(150, prevHeight / 4)
        
        if (bbox.top - offset < 0) {
          currentSectionId = section.getAttribute('data-id')
          prevBBox = bbox
          continue
        }
        break
      }
      
      setActiveSection(currentSectionId)
    }, throttleMs)
  )

  // 切换目录抽屉显示状态
  const toggleDrawer = () => {
    setShowDrawer(!showDrawer)
  }

  // 无目录就直接返回空
  if (!toc || toc.length < 1) {
    return <></>
  }

  return (
    <>
      {/* 移动端目录按钮 - 固定在右下角 */}
      <div 
        className='lg:hidden fixed right-4 bottom-16 z-40 rounded-full bg-white dark:bg-gray-800 shadow-md p-3 catalog-toggle-btn'
        onClick={toggleDrawer}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
      
      {/* 移动端目录抽屉 */}
      <div 
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${showDrawer ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {/* 遮罩层 */}
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowDrawer(false)}></div>
        
        {/* 抽屉内容 */}
        <div 
          ref={drawerRef}
          className={`absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-xl shadow-xl transform transition-transform duration-300 max-h-[70vh] overflow-y-auto mobile-catalog-drawer ${showDrawer ? 'translate-y-0' : 'translate-y-full'}`}
        >
          {/* 抽屉头部 */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-gray-100">
              {locale.COMMON.TABLE_OF_CONTENTS || '目录'}
            </h3>
            <button onClick={() => setShowDrawer(false)} className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 目录内容 */}
          <nav className="p-4 text-black dark:text-gray-300">
            {toc?.map(tocItem => {
              const id = uuidToId(tocItem.id)
              tocIds.push(id)
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setShowDrawer(false)}
                  className={`${activeSection === id ? 'text-blue-500 dark:text-blue-400 font-medium' : ''} 
                    block py-2 border-l-4 px-3 mb-1
                    ${activeSection === id ? 'border-blue-500 dark:border-blue-400' : 'border-transparent'}
                    hover:bg-gray-100 dark:hover:bg-gray-800 rounded-r
                    transition-colors duration-200`}
                  style={{ paddingLeft: `${tocItem.indentLevel * 16 + 12}px` }}
                >
                  <span className={`truncate ${activeSection === id ? 'font-medium' : ''}`}>
                    {tocItem.text}
                  </span>
                </a>
              )
            })}
          </nav>
          
          {/* 底部填充 */}
          <div className="h-6"></div>
        </div>
      </div>
    </>
  )
}

export default MobileCatalog 
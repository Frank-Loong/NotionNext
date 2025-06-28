import { useGlobal } from '@/lib/global'
import { useEffect, useState } from 'react'

/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = () => {
  const { locale } = useGlobal()
  const [showButton, setShowButton] = useState(false)
  
  // 监听滚动事件，控制按钮显示
  useEffect(() => {
    const handleScroll = () => {
      // 滚动超过500像素时显示按钮
      setShowButton(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div 
      id="jump-to-top"
      title={locale.POST.TOP}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all duration-300 ${
        showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </div>
  )
}

export default JumpToTopButton

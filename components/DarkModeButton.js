import { useGlobal } from '@/lib/global'
import { useEffect, useImperativeHandle, useState } from 'react'
import { Moon, Sun } from './HeroIcons'

/**
 * 深色模式按钮
 */
const DarkModeButton = props => {
  const { cRef, className } = props
  const { isDarkMode, toggleDarkMode } = useGlobal()
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端渲染后执行
  useEffect(() => {
    setMounted(true)
  }, [])

  /**
   * 对外暴露方法
   */
  useImperativeHandle(cRef, () => {
    return {
      handleChangeDarkMode: () => {
        toggleDarkMode()
      }
    }
  })

  // 立即响应点击，不等待状态更新
  const handleClick = () => {
    toggleDarkMode()
    // 强制触发DOM更新
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={`${className || ''} flex justify-center dark:text-gray-200 text-gray-800`}>
      <div
        onClick={handleClick}
        id='darkModeButton'
        className='dark-mode-button hover:scale-110 cursor-pointer transform duration-200 w-5 h-5'>
        {' '}
        {mounted && (isDarkMode ? <Sun /> : <Moon />)}
      </div>
    </div>
  )
}
export default DarkModeButton

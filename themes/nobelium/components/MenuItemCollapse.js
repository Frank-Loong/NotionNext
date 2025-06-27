import Collapse from '@/components/Collapse'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

/**
 * 折叠菜单
 * @param {*} param0
 * @returns
 */
export const MenuItemCollapse = props => {
  const { link } = props
  const [show, changeShow] = useState(false)
  const hasSubMenu = link?.subMenus?.length > 0
  const [isOpen, changeIsOpen] = useState(false)
  const router = useRouter()

  const toggleShow = () => {
    changeShow(!show)
  }

  const toggleOpenSubMenu = () => {
    changeIsOpen(!isOpen)
  }

  if (!link || !link.show) {
    return null
  }

  const isActive = router.asPath === link.href || router.asPath.startsWith(link.href + '/')

  return (
    <>
      <div
        className='w-full px-4 py-2 text-left dark:bg-hexo-black-gray dark:border-black'
        onClick={toggleShow}>
        {!hasSubMenu && (
          <Link
            href={link?.href}
            target={link?.target}
            className={`font-extralight  flex justify-between pl-2 pr-4 no-underline tracking-widest pb-1 transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'dark:text-gray-200'} hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105`}>
            <span className='items-center'>
              {link?.icon && (
                <span className='mr-2'>
                  <i className={link.icon} />
                </span>
              )}
              {link?.name}
            </span>
          </Link>
        )}
        {hasSubMenu && (
          <div
            onClick={hasSubMenu ? toggleOpenSubMenu : null}
            className={`font-extralight flex justify-between pl-2 pr-4 cursor-pointer tracking-widest pb-1 transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'dark:text-gray-200'} hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105`}>
            <span className='items-center'>
              {link?.icon && (
                <span className='mr-2'>
                  <i className={link.icon} />
                </span>
              )}
              {link?.name}
            </span>
            <i className='px-2 fa fa-plus text-gray-400'></i>
          </div>
        )}
      </div>

      {/* 折叠子菜单 */}
      {hasSubMenu && (
        <Collapse isOpen={isOpen} onHeightChange={props.onHeightChange}>
          {link.subMenus.map((sLink, index) => {
            const activeSub = router.asPath === sLink.href
            return (
              <div
                key={index}
                className={`font-extralight dark:bg-black text-left px-10 justify-start hover:bg-blue-100 dark:hover:bg-blue-800 tracking-widest transition-all duration-200 border-b dark:border-gray-800 py-3 pr-6 ${activeSub ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>
                <Link href={sLink.href} target={link?.target}>
                  <span className='text-xs'>{sLink.title}</span>
                </Link>
              </div>
            )
          })}
        </Collapse>
      )}
    </>
  )
}

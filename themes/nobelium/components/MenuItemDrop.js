import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

export const MenuItemDrop = ({ link }) => {
  const [show, changeShow] = useState(false)
  const router = useRouter()
  if (!link || !link.show) {
    return null
  }

  const hasSubMenu = link?.subMenus?.length > 0
  const isActive = router.asPath === link.href || router.asPath.startsWith(link.href + '/')

  return (
    <li className='mx-3 my-2 group'>
      <div
        className='cursor-pointer '
        onMouseOver={() => changeShow(true)}
        onMouseOut={() => changeShow(false)}>
        {!hasSubMenu && (
          <div className={`block nav transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-black dark:text-gray-50'} group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105`}>
            <Link href={link?.href} target={link?.target}>
              {link?.icon && <i className={link?.icon} />} {link?.name}
            </Link>
          </div>
        )}

        {hasSubMenu && (
          <div className={`block nav transition-all duration-200 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-black dark:text-gray-50'} group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105`}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
            <i
              className={`px-2 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
          </div>
        )}

        {/* 子菜单 */}
        {hasSubMenu && (
          <ul
            className={`${show ? 'visible opacity-100 top-12 ' : 'invisible opacity-0 top-10 '} border-gray-100  bg-white  dark:bg-black dark:border-gray-800 transition-all duration-300 z-20 absolute block drop-shadow-lg `}>
            {link.subMenus.map((sLink, index) => {
              const activeSub = router.asPath === sLink.href
              return (
                <div
                  key={index}
                  className={`border-b text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-800 transition-all duration-200  dark:border-gray-800 py-3 pr-6 pl-3 ${activeSub ? 'text-blue-600 dark:text-blue-400 font-medium' : ''}`}>
                  <Link href={sLink.href} target={link?.target}>
                    <span className='text-sm text-nowrap font-extralight'>
                      {link?.icon && <i className={sLink?.icon}> &nbsp; </i>}
                      {sLink.title}
                    </span>
                  </Link>
                </div>
              )
            })}
          </ul>
        )}
      </div>
    </li>
  )
}

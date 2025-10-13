import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

export default function ArticleCopyright ({ author, url }) {
  const { locale } = useGlobal()
  if (!siteConfig('NOBELIUM_ARTICLE_COPYRIGHT', true, CONFIG)) {
    return <></>
  }
  return (
    <section className="mt-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
      <div className="border-t border-b border-gray-200 dark:border-gray-600 py-6">
        <div className="mb-3">
          <strong className='mr-2'>{locale.COMMON.AUTHOR}:</strong>
          <Link href={'/about'} className="hover:text-black dark:hover:text-gray-100">
            {author}
          </Link>
        </div>
        <div className="mb-3">
          <strong className='mr-2'>{locale.COMMON.URL}:</strong>
          <a className="hover:text-black dark:hover:text-gray-100 break-all" href={url}>
            {url}
          </a>
        </div>
        <div>
          <strong className='mr-2'>{locale.COMMON.COPYRIGHT}:</strong>
          <span>{locale.COMMON.COPYRIGHT_NOTICE}</span>
        </div>
      </div>
    </section>
  )
} 
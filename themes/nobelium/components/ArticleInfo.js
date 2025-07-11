import Image from 'next/image'
import TagItem from './TagItem'
import md5 from 'js-md5'
import { siteConfig } from '@/lib/config'
import NotionIcon from '@/components/NotionIcon'
import WordCount from '@/components/WordCount'
import { useGlobal } from '@/lib/global'

export const ArticleInfo = (props) => {
  const { post } = props
  const { locale } = useGlobal()

  return <section className="flex-wrap flex mt-2 text-gray--600 dark:text-gray-400 font-light leading-8">
        <div>

            <h1 className="font-bold text-3xl text-black dark:text-white">
                {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}{post?.title}
            </h1>

            {post?.type !== 'Page' && <>
                <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
                    <div className="flex mb-4">
                        <a href={siteConfig('CONTACT_GITHUB', '#')} className="flex">
                            <img
                                alt={siteConfig('AUTHOR')}
                                width={24}
                                height={24}
                                src="https://oss.frankloong.com/image/0bb1c8701f21d57711ce043e9de44056.jpg"
                                className="rounded-full"
                            />
                            <p className="ml-2 md:block">{siteConfig('AUTHOR')}</p>
                        </a>
                        <span className="block">&nbsp;/&nbsp;</span>
                    </div>
                    <div className="mr-2 mb-4 md:ml-0">
                        {post?.publishDay}
                    </div>
                    {post?.tags && (
                        <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                            {post?.tags.map(tag => (
                                <TagItem key={tag} tag={tag} />
                            ))}
                        </div>
                    )}
                    <span className="hidden busuanzi_container_page_pv mr-2">
                        <i className='mr-1 fas fa-eye' />
                        &nbsp;
                        <span className="mr-2 busuanzi_value_page_pv" />
                    </span>
                </nav>
                
                <div className="flex flex-wrap gap-3 mt-2 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                        <i className="far fa-calendar-check mr-1" />
                        {locale.COMMON.LAST_EDITED_TIME}: {post.lastEditedDay}
                    </span>
                    <WordCount wordCount={post.wordCount} readTime={post.readTime} />
                </div>
            </>}

        </div>

    </section>
}

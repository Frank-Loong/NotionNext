import { useGlobal } from '@/lib/global'

/**
 * 字数统计和阅读时间组件 - 适配nobelium主题风格
 * @param {*} param0 
 * @returns 
 */
export default function WordCount({ wordCount, readTime }) {
  const { locale } = useGlobal()
  return (
    <div className='flex gap-3'>
      <span className='flex items-center'>
        <i className='fas fa-file-word mr-1' />
        {locale.COMMON.WORD_COUNT}: {wordCount}
      </span>
      <span className='flex items-center'>
        <i className='fas fa-clock mr-1' />
        {locale.COMMON.READ_TIME}≈ {readTime} {locale.COMMON.MINUTE}
      </span>
    </div>
  )
} 
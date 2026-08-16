import { siteConfig } from '@/lib/config'
import AnalyticsBusuanzi from '@/components/AnalyticsBusuanzi'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import SocialButton from './SocialButton'

export const Footer = (props) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const { post } = props
  const fullWidth = post?.fullWidth ?? false
  const since = siteConfig('SINCE')
  const copyrightDate = parseInt(since) < currentYear ? since + '-' + currentYear : currentYear
  const { siteInfo } = useGlobal()

  return <footer
     className={`z-10 relative mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all ${
       !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
     }`}
   >
     <hr className="border-gray-200 dark:border-gray-600" />
     
     {/* 页脚内容 */}
     <div className='w-full py-6'>
       <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-y-4'>
         {/* 左侧：站点信息和版权 */}
         <div className='flex flex-col'>
           {/* 站点信息 */}
           <div className='flex flex-wrap items-center gap-x-2'>
             {siteInfo?.icon && (
               <LazyImage
                 src={siteInfo.icon}
                 className='rounded-full'
                 width={24}
                 alt={siteConfig('TITLE')}
               />
             )}
             <span className='font-bold'>{siteConfig('TITLE')}</span>
             {/* 版权信息 */}
             <div className='flex items-center gap-x-1 ml-2'>
               <i className='fas fa-copyright mx-1'></i>
               <span>{copyrightDate}</span>
             </div>
           </div>
           
           {/* 站点描述 - 限制宽度 */}
           <div className='mt-2 max-w-xs'>{siteConfig('DESCRIPTION')}</div>
           
           {/* 备案信息 */}
           <div className='flex flex-wrap items-center gap-x-2 mt-2'>
             <BeiAnSite />
             <BeiAnGongAn />
           </div>
         </div>
         
         {/* 右侧：统计和社交媒体 */}
         <div className='flex flex-col items-start md:items-end'>
           {/* 统计 */}
           <div className='mb-2'>
             <AnalyticsBusuanzi />
           </div>
           
           {/* 社交媒体按钮 */}
           <SocialButton />
         </div>
       </div>
     </div>
   </footer>
}

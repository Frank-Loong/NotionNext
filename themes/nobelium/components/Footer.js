import DarkModeButton from '@/components/DarkModeButton'
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
     
     {/* 统一的页脚内容 */}
     <div className='w-full py-6'>
       <div className='flex flex-col items-center gap-y-4'>
         {/* 站点信息 */}
         <div className='flex items-center gap-x-2'>
           {siteInfo?.icon && (
             <LazyImage
               src={siteInfo.icon}
               className='rounded-full'
               width={24}
               alt={siteConfig('TITLE')}
             />
           )}
           <span className='font-bold'>{siteConfig('TITLE')}</span>
         </div>
         
         {/* 站点描述 */}
         <div className='text-center max-w-xl'>{siteConfig('DESCRIPTION')}</div>
         
         {/* 社交媒体按钮 */}
         <SocialButton />
         
         {/* 版权信息 */}
         <div className='flex items-center gap-x-1 mt-2'>
           <i className='animate-pulse fas fa-heart text-red-500'></i>
           <i className='fas fa-copyright mx-1'></i>
           <span>{copyrightDate}</span>
         </div>
         
         {/* 功能按钮和统计 */}
         <div className='flex flex-wrap justify-center items-center gap-x-4 gap-y-2'>
           <DarkModeButton />
           <AnalyticsBusuanzi />
         </div>
         
         {/* 备案信息 */}
         <div className='flex flex-wrap justify-center items-center gap-x-2'>
           <BeiAnSite />
           <BeiAnGongAn />
         </div>
       </div>
     </div>
   </footer>
}

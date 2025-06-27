import DarkModeButton from '@/components/DarkModeButton'
import { siteConfig } from '@/lib/config'
import AnalyticsBusuanzi from '@/components/AnalyticsBusuanzi'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import LazyImage from '@/components/LazyImage'
import PoweredBy from '@/components/PoweredBy'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'

export const Footer = (props) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const { post } = props
  const fullWidth = post?.fullWidth ?? false
  const since = siteConfig('SINCE')
  const copyrightDate = parseInt(since) < currentYear ? since + '-' + currentYear : currentYear
  const { siteInfo } = useGlobal()
  const NOBELIUM_FOOTER_LINKS = siteConfig('NOBELIUM_FOOTER_LINKS', [])

  return <footer
     className={`z-10 relative mt-6 flex-shrink-0 m-auto w-full text-gray-500 dark:text-gray-400 transition-all ${
       !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
     }`}
   >
     <hr className="border-gray-200 dark:border-gray-600" />
     
     {/* 信息与链接区块 */}
     <div className='w-full flex flex-col md:flex-row justify-between py-6'>
       <div className='gap-y-2 flex flex-col items-start'>
         <div className='flex gap-x-1 items-center'>
           {siteInfo?.icon && (
             <LazyImage
               src={siteInfo.icon}
               className='rounded-full'
               width={24}
               alt={siteConfig('AUTHOR')}
             />
           )}
           <span className='font-bold'>{siteConfig('AUTHOR')}</span>
         </div>
         <div className='px-1'>{siteConfig('DESCRIPTION')}</div>
         {siteConfig('CONTACT_EMAIL') && (
           <div className='px-1'>{siteConfig('CONTACT_EMAIL')}</div>
         )}
       </div>
     </div>
     
     {/* 页脚底部信息 */}
     <div className='py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-600'>
       <div className='flex gap-x-2 flex-wrap justify-between items-center'>
         <span>© {siteConfig('AUTHOR')} {copyrightDate}</span>
         <PoweredBy />
       </div>

       <DarkModeButton className='my-4 md:my-0'/>

       <div className='flex justify-between items-center gap-x-2'>
         <div className='flex items-center gap-x-4'>
           <AnalyticsBusuanzi />
         </div>
       </div>
     </div>

     {/* 备案 */}
     <div className='w-full text-center flex flex-wrap items-center justify-center gap-x-2 pb-4'>
       <BeiAnSite />
       <BeiAnGongAn />
     </div>
   </footer>
}

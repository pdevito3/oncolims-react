import React from 'react'
import Sidebar from './Sidebar'
import { navigation } from '../../routes/navigation'


interface SidebarProps {
  children: React.ReactNode,
//   navigation: {
//     name: string;
//     exact: boolean;
//     href: string;
//     icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
// }[]
}

function Layout({children}: SidebarProps) {
  return (    
    <div className="min-h-screen max-h-screen bg-gray-100">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  )
}

export default Layout

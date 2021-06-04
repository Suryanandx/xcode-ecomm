import {
    MenuIcon, 
    SearchIcon,
    ShoppingCartIcon
} from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
function Header(){
   const [ session, loading ] = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)
    return (
        <header>
            <div className='flex items-center bg-white p-1 flex-grow py-2'>
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'> 
                    <img onClick={() => router.push('/')} src="https://cdn.logo.com/hotlink-ok/logo-social.png" width={150} height={40} className='cursor-pointer' alt="" />
                </div>
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-blue-800 hover:bg-blue-500 border-2 '>
                    <input type="text" className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focused:outline-none ' />
                        <SearchIcon className='h-12 p-4'/>
                </div>
                <div className='text-blue-800 flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div onClick={!session ? signIn : signOut} className=' link'>
                        {
                            session? `Hello, ${session.user.name}` : 'Sign In'
                        }
                        <p>Account & Lists</p>
                    </div>
                    <div onClick={() => router.push('/orders')} className='link'>
                        <p>Returns</p>
                        <p>& orders</p>
                    </div>
                    <div onClick={() => router.push('/checkout')} className='relative flex item-center link'>
                       <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold '>{items.length}</span>
                        <ShoppingCartIcon  className='h-10'/>
                        <p className='hidden md:inline mt-2'>Basket</p>
                    </div>
                </div>
            </div>
            <div className='flex space-x-4 p-2 pl-6 items-center bg-gray-200'>
                <p className='link flex items-center'>
                    <MenuIcon className='h-6 mr-1'/>
                    All
                </p>
                <a className='link'>Electronics </a>
                 <a className='link'>Gaming</a>
                    <a className='link'>Today's deals </a>
                     <a className='link hidden lg:inline-flex'>Mobiles </a>
                       <a className='link hidden lg:inline-flex'>Tablets </a>
                         <a className='link hidden lg:inline-flex'>Laptops </a>
                           <a className='link hidden lg:inline-flex'>Headphones </a>
                             <a className='link hidden lg:inline-flex'>Health & Personal Care </a>
            </div>
        </header>
    )
}

export default Header

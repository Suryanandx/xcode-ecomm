import { useState } from "react"
import {StarIcon} from '@heroicons/react/solid'
import Currency from 'react-currency-formatter'
import Image from 'next/image'
import { useDispatch } from "react-redux";
import {addToBasket} from '../slices/basketSlice'

const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({product}) {
    const {rating} = useState(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1))) + MIN_RATING
   const dispatch = useDispatch()

   const addItemToBasket = (id,title,price,description,category,image) => {
        const products = {
            id,
            title,
            price,
            description,
            category,
            image
        }
        dispatch(addToBasket(products))
   }
    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10 '>
            <p className='absolute top-2 right-2 text-xs text-gray-400 italic capitalize'>{product.category}</p>
            <div style={{display: 'flex', justifyContent: 'center', objectFit: 'contain', height: 200}}>
                 <img className="" src={product.image}  style={{objectFit: 'contain'}}/>
            </div>
           
            <h4 className='my-3'>{product.title}</h4>
           <p className='my-2 text-xs line-clamp-2'>{product.description}</p>
           <div>
               <Currency quantity={product.price} currency="INR" />
           </div>
           <button onClick={() => addItemToBasket(product.id, product.title, product.price, product.description, product.category, product.image)} className='mt-auto button'>Add to Cart</button>
        </div>
    )
}

export default Product

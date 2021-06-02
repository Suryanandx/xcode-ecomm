import Currency from 'react-currency-formatter'
import { useDispatch } from 'react-redux'
import {addToBasket, removeFromBasket} from '../slices/basketSlice'

function CheckoutProduct({id, title, price, description, category, image}) {
    const dispatch = useDispatch()
    
    const addItemsToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image 

        }
        dispatch(addToBasket(product))
    }
    const removeItemsFromBasket = () => {
   
        dispatch(removeFromBasket({id}))
    }
    
    return (
        <div className='grid grid-cols-5' >
            <div >
                <img height={200} width={200} src={image} alt="" style={{objectFit: 'contain'}} />
              
            </div>
          {/* Mid section */}
            <div className="col-span-3 mx-5">
            <p>{title}</p>
            <p className="text-xs my-2 line-clamp-4">{description}</p>
            <Currency quantity={price} currency='INR' />
           
           </div>
           <div className='flex flex-col space-y-2 my-2 justify-self-end'>
               <button onClick={addItemsToBasket} className='button'>Add to Basket</button>
                <button onClick={removeItemsFromBasket}  className='button'>Remove Item</button>
           </div>
        </div>
    )
}

export default CheckoutProduct

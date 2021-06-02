import Product from "./Product"

function ProductsFeed({products}) {
    return (
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-4'>
           
            {
                products.slice(0,4).map((data) => (
                    <Product key={data.id} product={data}/>
                ))
            }
            <img 
            className="md:col-span-full"
            src="https://links.papareact.com/dyz"
            alt=""
            />
            <div className='md:col-span-2'>
                 {
                products.slice(4,5).map((data) => (
                    <Product key={data.id} product={data}/>
                ))
            }
            </div>
             {
                products.slice(5,products.length).map((data) => (
                    <Product key={data.id} product={data}/>
                ))
            }
        </div>
    )
}

export default ProductsFeed

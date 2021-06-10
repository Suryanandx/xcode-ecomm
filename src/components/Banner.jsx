import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Banner() {
    return (
        <div className='relative'>
            <div className='absolute w-full  bg-gradient-to-t from-gray-200 to-transparent bottom-0 z-20'/>
            <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
                <div className='w-2/3 mx-auto mt-5'>
                <img loading='lazy' src='https://images.unsplash.com/photo-1487014679447-9f8336841d58?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1166&q=80'/>
                </div>
                <div className='w-2/3 mx-auto mt-5'>
                      <img  loading='lazy' src='https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80'/>
                </div>
                <div className='w-1/2 mx-auto mt-5'>
                  <img  loading='lazy' src='https://images.unsplash.com/photo-1605513524006-063ed6ed31e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=949&q=80'/>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner

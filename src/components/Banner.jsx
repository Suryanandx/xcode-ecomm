import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"

function Banner() {
    return (
        <div className='relative'>
            <div className='absolute w-full  bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
            <Carousel
           
              autoPlay
               infiniteLoop showStatus={false}
            showIndicators={false}
            showThumbs={false}
            interval={5000}
            >
                <div>
                <img loading='lazy' src='https://storage.googleapis.com/website-production/uploads/2018/06/banner-ads-amazon.jpg'/>
                </div>
                <div>
                      <img  loading='lazy' src='https://instapage.com/wp-content/uploads/2018/06/ad-banner-microsoft.jpg'/>
                </div>
                <div>
                  <img  loading='lazy' src='http://barbaraelmoredesigns.com/wp-content/uploads/2020/11/banners-ads-do-they-really-work-1.jpg'/>
                </div>
            </Carousel>
        </div>
    )
}

export default Banner

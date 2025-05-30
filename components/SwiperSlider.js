import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function SwiperSlider({ children }) {
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            <Swiper
                navigation={false}
                modules={[Navigation]}
                onSlideChange={(swiper) => setIsEnd(swiper.isEnd)} // Track last slide
                onReachEnd={() => setIsEnd(true)} 
                onFromEdge={() => setIsEnd(false)} // Reset when not at end
                grabCursor={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    600: { slidesPerView: "auto" },
                }}
                slidesPerView={"auto"}
                spaceBetween={30}
                className={`mySwiper ${isEnd ? "hide-next" : ""}`} // Add class when at last slide
            >
                {React.Children.map(children, (child, index) => (
                    <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center", width: "360px" }}>
                        {child}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SwiperSlider;

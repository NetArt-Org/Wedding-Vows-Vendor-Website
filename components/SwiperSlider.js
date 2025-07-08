import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function SwiperSlider({ children, navigation }) {
    const [isClient, setIsClient] = useState(false);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Don't render Swiper during SSR to prevent hydration mismatch
    if (!isClient) {
        return (
            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: "30px", overflow: "hidden" }}>
                    {React.Children.map(children, (child, index) => (
                        <div key={index} style={{ display: "flex", justifyContent: "center", width: "360px", flexShrink: 0 }}>
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div style={{ width: "100%" }}>
            <Swiper
                navigation={navigation ? navigation : false}
                modules={[Navigation]}
                onSlideChange={(swiper) => setIsEnd(swiper.isEnd)} // Track last slide
                onReachEnd={() => setIsEnd(true)} 
                onFromEdge={() => setIsEnd(false)} // Reset when not at end
                grabCursor={true}
                // breakpoints={{
                //     0: { slidesPerView: 1 },
                //     600: { slidesPerView: "auto" },
                // }}
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

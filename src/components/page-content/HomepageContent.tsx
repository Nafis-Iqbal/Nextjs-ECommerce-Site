import { ProductApi } from "@/services/api";

import { ProductInfoCard } from "../data-elements/ProductInfoCard";
import { HeroSectionImageViewer } from "../structure-components/HeroSectionImageViewer";

export const HomepageContent = async () => {
    const productsData = await ProductApi.getProducts();
    console.log("Products Data:", productsData);

    return (
        <div className="flex flex-col items-center space-y-20 w-full mx-auto md:w-[85%] bg-gray-800">
            <HeroSectionImageViewer 
                className="rounded-2xl bg-gray-700 mt-10"
                imageList={[
                    {
                        imageURL: "/DP.jpg",
                        imageAlt: "Hero Image 1"
                    },
                    {
                        imageURL: "/404E.jpg",
                        imageAlt: "Hero Image 2"
                    },
                    {
                        imageURL: "/CPUPIC.webp",
                        imageAlt: "Hero Image 3"
                    }
                ]} 
            />

            <div className="flex flex-col md:grid md:grid-cols-3 md:gap-4 w-full [grid-auto-rows:1fr]">
                {(productsData?.data ?? []).map((item, index) => (
                    
                    <ProductInfoCard key={index} productInfo={item} />
                ))}
            </div>

            <HeroSectionImageViewer
                className="rounded-3xl bg-gray-700"
                imageList={[
                    {
                        imageURL: "/DP.jpg",
                        imageAlt: "Hero Image 1"
                    },
                    {
                        imageURL: "/404E.jpg",
                        imageAlt: "Hero Image 2"
                    },
                    {
                        imageURL: "/CPUPIC.webp",
                        imageAlt: "Hero Image 3"
                    }
                ]} 
            />

            <div className="grid grid-cols-3 gap-4 w-full mb-15">
                {(productsData?.data ?? []).map((item, index) => (
                    <ProductInfoCard key={index} productInfo={item} />
                ))}
            </div>
        </div>
    );
};

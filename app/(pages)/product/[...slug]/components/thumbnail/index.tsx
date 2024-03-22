import { Splide, SplideSlide } from "@splidejs/react-splide";
import { ImageI } from "@/interfaces/product/card";
import Image from "next/image";

interface ThumbnailCarouselProps {
  handhleImageClick: Function;
  selectImage: string;
  images: ImageI[];
}
// Componente principal
function ThumbnailCarousel({
  handhleImageClick,
  images,
  selectImage,
}: ThumbnailCarouselProps) {
  return (
    <>
      <div className="w-full h-full relative">
        <Image src={selectImage} fill className="rounded-md" alt="Imagem 1" />
      </div>

      <Splide
        options={{
          fixedWidth: 100,
          fixedHeight: 64,
          isNavigation: true,
          gap: "1rem",
          pagination: false,
          arrows: false,
          cover: true,
          breakpoints: {
            600: {
              fixedWidth: 66,
              fixedHeight: 40,
            },
          },
        }}
      >
        {images.map((image) => (
          <SplideSlide onClick={() => handhleImageClick(image.url)}>
            <Image src={image.url} alt={image.url} width={100} height={64} className="rounded-md" />
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}

export { ThumbnailCarousel };

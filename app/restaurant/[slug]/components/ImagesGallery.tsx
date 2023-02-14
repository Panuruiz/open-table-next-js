type ImagesGalleryProps = {
  images: string[];
};

const ImagesGallery = ({ images }: ImagesGalleryProps) => {
  return (
    <div>
      <h3 className="pb-5 mt-10 text-3xl font-bold border-b mb-7">
        {images.length} {images.length === 1 ? "photo" : "photos"}
      </h3>
      <div className="flex flex-wrap">
        {images?.map((image) => (
          <img className="w-56 mb-1 mr-1 h-44" key={image} src={image} alt="" />
        ))}
      </div>
    </div>
  );
};

export default ImagesGallery;

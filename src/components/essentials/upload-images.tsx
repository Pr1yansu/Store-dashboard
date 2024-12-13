// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useState, useEffect } from "react";
import { UploadIcon, User } from "lucide-react";

type CloudinaryWidgetProps = {
  onChange: (images: string[]) => void;
  value?: string[]; // Accept an array of strings
  disable?: boolean;
};

const UploadImages: React.FC<CloudinaryWidgetProps> = ({
  onChange,
  value = [],
  disable = false,
}) => {
  const [images, setImages] = useState<string[]>(value);

  useEffect(() => {
    setImages(value);
  }, [value]);

  useEffect(() => {
    if (!disable) {
      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dr0wxzkgc",
          uploadPreset: "hotels4u",
          multiple: true,
          resourceType: "image",
          clientAllowedFormats: ["jpg", "jpeg", "png"],
          maxFileSize: 5000000,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            const imageUrl: string = result.info.secure_url;
            const updatedImages = [...images, imageUrl];
            setImages(updatedImages);
            onChange(updatedImages);
          }
        }
      );

      const handleClick = () => {
        myWidget.open();
      };

      const uploadWidgetElement = document.getElementById("upload_widget");
      if (uploadWidgetElement) {
        uploadWidgetElement.addEventListener("click", handleClick);
      }

      return () => {
        if (uploadWidgetElement) {
          uploadWidgetElement.removeEventListener("click", handleClick);
        }
      };
    }
  }, [images, onChange, disable]);

  return (
    <div>
      <div
        id="upload_widget"
        className={`border-2 rounded-md border-dashed flex justify-center items-center relative overflow-hidden ${
          disable ? "cursor-not-allowed opacity-50" : "cursor-pointer group"
        }`}
      >
        {!disable && (
          <div className="absolute opacity-0 group-hover:opacity-100 bg-black/30 top-0 left-0 bottom-0 right-0 duration-200 flex justify-center items-center">
            <div className="text-white text-sm font-semibold">
              <div className="p-2 border-2 border-white rounded-full">
                <UploadIcon className="w-12 h-12 aspect-square" />
              </div>
            </div>
          </div>
        )}
        <User className="w-12 h-12 text-muted-foreground" />
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-20 h-20">
            <img
              src={image}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
            {!disable && (
              <button
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                onClick={() => {
                  const updatedImages = images.filter((_, i) => i !== index);
                  setImages(updatedImages);
                  onChange(updatedImages);
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImages;

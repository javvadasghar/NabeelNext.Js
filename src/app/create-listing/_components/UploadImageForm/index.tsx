import Image from "next/image";
import { ChangeEvent, FC, useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { CiTrash } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

const MAX_FILE_SIZE = 5120; // 5MB
const MAX_HEIGHT = 1000;
const MAX_WIDTH = 1000;

interface UploadImageFormProps {
  onPdfImageChange: (file: File) => void;
}

const UploadImageForm: FC<UploadImageFormProps> = ({ onPdfImageChange }) => {
  const [image, setImage] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = useCallback(() => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
      setImage(null);
    }
  }, []);

  const handleClick = useCallback(() => {
    imageInputRef.current?.click();
  }, []);

  const checkImageSize = useCallback((image: File) => {
    const imageSizeInKb = image.size / 1024;
    if (imageSizeInKb > MAX_FILE_SIZE) {
      return true;
    }

    return false;
  }, []);

  const checkImageDimensions = useCallback((image: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");

      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
      img.src = URL.createObjectURL(image);
    });
  }, []);

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const img = event.target.files[0];

        const isImageSizeBigger = checkImageSize(img);
        if (isImageSizeBigger) {
          toast.error(`Image should not be greater than 5 MB`);
          return;
        }

        const imageNotOutOfBounds = await checkImageDimensions(img);
        if (!imageNotOutOfBounds) {
          toast.error(
            `Width and height should not be greater than ${MAX_WIDTH} x ${MAX_HEIGHT} pixels`
          );
          return;
        }
        onPdfImageChange(img);

        setImage(img);
      }
    },
    [checkImageDimensions, checkImageSize, onPdfImageChange]
  );

  return (
    <div className="flex items-center justify-center">
      {image ? (
        <div className="relative w-fit group" onClick={handleRemoveImage}>
          <Image
            src={URL.createObjectURL(image)}
            alt="profile image"
            width={188}
            height={188}
            className="object-cover rounded-md flex self-center w-[188px] h-[188px]"
          />

          <div className="absolute top-0 bottom-0 left-0 right-0 items-center justify-center hidden cursor-pointer group-hover:flex">
            <CiTrash size={30} color="red" />
          </div>
        </div>
      ) : (
        <div
          className="w-[188px] h-[188px] rounded-md flex items-center justify-center cursor-pointer bg-gray-50"
          onClick={handleClick}
        >
          <FaPlus size={18} color="#03F719" />
        </div>
      )}

      <input
        ref={imageInputRef}
        hidden
        type="file"
        name="profileImage"
        accept=".png, .jgp, .jpeg, .heic"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default UploadImageForm;

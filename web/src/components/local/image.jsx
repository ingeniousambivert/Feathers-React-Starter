/* eslint-disable react/prop-types */
import React from "react";
import { Input } from "@/components/ui/input";
import { Minus } from "./icons";
import { generateId, replaceById } from "@/utils";

const ImageViewer = ({ src, ...restProps }) => {
  const [isImageValid, setIsImageValid] = React.useState(true);

  React.useEffect(() => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => {
      setIsImageValid(true);
    };

    img.onerror = () => {
      setIsImageValid(false);
    };
  }, [src]);

  return (
    <div>
      {isImageValid ? (
        <img
          {...restProps}
          src={src}
          loading="lazy"
          className="w-auto max-w-[400px] h-auto max-h-[400px] rounded mb-2 bg-auto border-gray-200 border-2"
        />
      ) : (
        <img
          {...restProps}
          loading="lazy"
          src={"https://placehold.co/400x400?text=Invalid+Image"}
          alt="Placeholder"
        />
      )}
    </div>
  );
};

const ImageEditor = ({ src, onEdit, ...restProps }) => {
  const [isImageValid, setIsImageValid] = React.useState(true);

  React.useEffect(() => {
    const img = document.createElement("img");
    img.src = src;

    img.onload = () => {
      setIsImageValid(true);
    };

    img.onerror = () => {
      setIsImageValid(false);
    };
  }, [src]);

  return (
    <div>
      <div className="relative">
        <div className="absolute top-2 right-2">
          <Minus
            className="rounded-full text-white bg-red-500 cursor-pointer"
            onClick={() => {
              onEdit(src);
            }}
          />
        </div>
        <div>
          {isImageValid ? (
            <img
              {...restProps}
              src={src}
              loading="lazy"
              className="w-auto max-w-[400px] h-auto max-h-[400px] rounded mb-2 bg-auto border-gray-200 border-2"
            />
          ) : (
            <img
              {...restProps}
              loading="lazy"
              src={"https://placehold.co/400x400?text=Invalid+Image"}
              alt="Placeholder"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const ImageUploader = ({ onFinish, shouldHaveKey = false, allowMultiple = false }) => {
  const [previewUrls, setPreviewUrls] = React.useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    const filePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        if (!allowedTypes.includes(file.type)) {
          alert(`File ${file.name} is not allowed. Only JPEG, PNG, GIF, SVG, and WebP files are allowed.`);
          reject("type error");
        }
        if (file.size > maxSize) {
          alert(
            `File ${file.name} size exceeds 5 MB. Please compress it or choose a file with smaller size.`
          );
          reject("size error");
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
      });
    });

    Promise.allSettled(filePromises).then((results) => {
      if (shouldHaveKey) {
        const validResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => ({ src: result.value, key: null, id: generateId() }));
        setPreviewUrls(validResults);
      } else {
        const validResults = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value);
        setPreviewUrls(validResults);
      }
    });
  };

  React.useEffect(() => {
    if (typeof onFinish === "function") {
      onFinish(previewUrls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrls]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Input type="file" accept="image/*" onChange={handleFileChange} multiple={allowMultiple} />
      </div>
      <div>
        {shouldHaveKey ? (
          <div className="flex justify-center gap-2 overflow-x-auto">
            {previewUrls.map((preview, index) => (
              <div key={preview.id} className="flex flex-col flex-shrink-0 justify-center items-center ">
                <img
                  src={preview.src}
                  alt={`Preview ${index + 1}`}
                  loading="lazy"
                  className="w-auto max-w-[200px] h-auto max-h-[200px] rounded bg-auto border-gray-200 border-2 m-2"
                />

                <Input
                  className="w-[150px] mx-2 mb-2"
                  value={preview.key}
                  onChange={(e) => {
                    const newPreviewUrls = replaceById(
                      preview.id,
                      { ...preview, key: e.target.value },
                      previewUrls
                    );
                    setPreviewUrls(newPreviewUrls);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 overflow-x-auto">
            {previewUrls.map((src, index) => (
              <div key={index} className="flex flex-col flex-shrink-0 justify-center items-center ">
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  loading="lazy"
                  className="w-auto max-w-[200px] h-auto max-h-[200px] rounded bg-auto border-gray-200 border-2 m-2"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { ImageViewer, ImageEditor, ImageUploader };

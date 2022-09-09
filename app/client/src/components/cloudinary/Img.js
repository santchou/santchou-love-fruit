import React from "react";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

const Img = ({ public_id, handleImgClick, height, cursor }) => {
  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dzaj1c6fx",
    },
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(public_id);

  // Apply the transformation.
  myImage.resize(thumbnail().width(350).height(height));

  // Render the transformed image in a React component.
  return (
    <AdvancedImage
      className={`${cursor ? "cursor-pointer" : ""} rounded-lg`}
      onClick={handleImgClick}
      cldImg={myImage}
      plugins={[
        responsive({ steps: [800, 1000, 1400] }),
        lazyload({ rootMargin: "0px", threshold: 0.25 }),
      ]}
    />
  );
};

export default Img;

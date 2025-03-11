import React from 'react';
import ModalImage from 'react-modal-image';
const galleryData = [
  {
    src: 'images/gallery_1.jpeg',
    srcLg: 'images/gallery_1.jpeg',
  },
  {
    src: 'images/gallery_2.jpeg',
    srcLg: 'images/gallery_2.jpeg',
  },
  {
    src: 'images/gallery_3.jpeg',
    srcLg: 'images/gallery_3.jpeg',
  },
  {
    src: 'images/gallery_4.jpeg',
    srcLg: 'images/gallery_4.jpeg',
  },
  {
    src: 'images/gallery_5.jpeg',
    srcLg: 'images/gallery_5.jpeg',
  },
];

export default function GalleryStyle2() {
  return (
    <div className="cs-grid_gallery_5 cs-lightgallery">
      {galleryData?.map((item, index) => (
        <div className="cs-grid_gallery_item" key={index}>
          <div className="cs-portfolio cs-style1 cs-lightbox_item cs-type2 rounded-0">
            <div className="cs-portfolio_hover" />
            <span className="cs-plus" />
            <div
              className="cs-portfolio_bg cs-bg"
              style={{ backgroundImage: `url("${item.src}")` }}
            >
              <ModalImage small={item.src} large={item.srcLg} alt="Gallery" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

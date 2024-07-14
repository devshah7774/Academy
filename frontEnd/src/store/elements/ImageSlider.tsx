import { useState } from "react";
import { Larrow, Rarrow } from "./cart";

type ImageSliderProps = {
  imageUrls: string[];
};

export function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  function minus(){
    let y = imageIndex;
    if(y<=0){y=imageUrls.length};
    setImageIndex(y-1);
  }
  function plus(){
    let y = imageIndex;
    if(y>=imageUrls.length-1){y=-1};
    setImageIndex(y+1);
  }
  
  return (
    <>
    <div className="lg:hidden z-0 overflow-visible relative">
      <div className="relative items-center bg-slate-400 w-screen overflow-hidden lg:w-auto lg:mx-24" style={{ minHeight: '150px', maxHeight: '380px', aspectRatio: '19/5' }}>
        <img
          src={`../../../../src/assets/${imageUrls[imageIndex]}.jpg`}
          alt="cards-images"
          className="w-screen h-full object-fill z-0 relative"
        />
        <div onClick={minus} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-500 cursor-pointer"><Larrow/></div>
        <div onClick={plus} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-1 rounded-full hover:bg-gray-500 cursor-pointer"><Rarrow/></div>
      </div>
    </div>

    <div className="hidden lg:flex lg:justify-between items-center z-0 relative">
      <div onClick={minus} className="bg-gray-700 text-white p-1 rounded-full hover:bg-gray-500 cursor-pointer ml-6"><Larrow/></div>
      <div className="relative items-center bg-slate-400 w-screen overflow-hidden lg:w-auto lg:mx-4" style={{ minHeight: '150px', maxHeight: '380px', aspectRatio: '19/5' }}>
        <img
          src={`../../../../src/assets/${imageUrls[imageIndex]}.jpg`}
          alt="cards-images"
          className="w-screen h-full object-fill z-0 relative" />
      </div>
      <div onClick={plus} className="bg-gray-700 text-white p-1 rounded-full hover:bg-gray-500 cursor-pointer mr-6"><Rarrow/></div>
    </div>
    </>
  );
}
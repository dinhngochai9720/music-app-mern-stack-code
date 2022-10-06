import React, { useEffect } from "react";
import Slider from "react-slick";
import { getAllArtists } from "../../api";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import ContentSliderCard from "./ContentSliderCard";

const ContentSlider = () => {
  const [{ allArtists }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allArtists) {
      // Call API trong backend tim kiem so luong nghe si
      getAllArtists().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artists,
        });
      });
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <Slider {...settings} className="h-full w-full ">
      {allArtists &&
        allArtists.map((data) => (
          <ContentSliderCard key={data._id} data={data} />
        ))}
    </Slider>
  );
};

export default ContentSlider;

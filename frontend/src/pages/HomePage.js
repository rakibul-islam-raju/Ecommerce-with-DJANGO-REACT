import React from "react";

import TopRatedProducts from "../components/Home/TopRatedProducts";
import LatestProducts from "../components/Home/LatestProducts";
import Slider from "../components/Home/Slider";

const HomePage = () => {
	return (
		<>
			<section id="sliderSection" className="mb-5">
				<Slider />
			</section>

			<section id="topRatedProducts" className="my-5">
				<TopRatedProducts />
			</section>

			<section id="latestProducts" className="my-5">
				<LatestProducts />
			</section>
		</>
	);
};

export default HomePage;

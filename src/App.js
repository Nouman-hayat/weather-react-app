import "./App.css";
import React, { useState} from "react";

import axios from "axios";
function App() {
	
	const [container, setcontainer] = useState("container");
	const [location, setlocation] = useState("");
	
	var [imageurl, setimageurl] = useState("");

	const [mydata, setmydata] = useState([]);


	const btnclick = () => {
		setmydata([])
		console.log(location);
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=88dd34dd82ba276afcaaac94d832a513`
			)
			.then((resp) => {
				
				setmydata(resp.data)
				switch (resp.data.weather[0].main) {
					case "Clear":
						setimageurl("./assets/images/clear.png");
						break;
					case "Mist":
						setimageurl("./assets/images/mist.png");
						break;
					case "Snow":
						setimageurl("./assets/images/snow.png");
						break;
					case "Clouds":
						setimageurl("./assets/images/cloud.png");
						break;
					case "Smoke":
						setimageurl("./assets/images/smoke.png");
						break;
					case "Haze":
						setimageurl("./assets/images/haze.png");
						break;
					default:
						setimageurl("");
				}
			});

		
		
		setcontainer("container h-590");
		
	};
	return (
		<>
			<div className={container}>
				<div className="search-box">
					<i className="fa-solid fa-location-dot"></i>
					<input
						type="text"
						placeholder="Type Your Location"
						onChange={(e) => setlocation(e.target.value)}
					/>
					<button
						className="fa-solid fa-magnifying-glass"
						onClick={btnclick}
					></button>
				</div>

				{mydata.name !== undefined ? (
					<div className="weather-wrapper">
						<div className="weather-box">
							<img src={imageurl} alt="..." />
							<p className="temperature">
								{parseInt(mydata?.main?.temp)}
								<span>°C</span>
							</p>
							<p className="description">{mydata.weather[0].description}</p>
						</div>

						<div className="weather-details">
							<div className="humidity-details">
								<i className="fa-solid fa-water"></i>
								<div className="text">
									<span>{mydata?.main?.humidity}%</span>
									<p>Humidity</p>
								</div>
							</div>
							<div className="wind-details">
								<i className="fa-solid fa-wind"></i>
								<div className="text">
									<span>{parseInt(mydata?.wind?.speed)}km/h</span>
									<p>Wind Speed</p>
								</div>
							</div>
							<div className="pressure-details">
								<i className="fa-solid fa-arrow-down-up-across-line"></i>
								<div className="text">
									<span>{mydata?.main?.pressure}mb</span>
									<p>Pressure</p>
								</div>
							</div>
							<div className="visiblity-details">
								<i className="fa-regular fa-eye"></i>
								<div className="text">
									<span>{mydata?.visibility / 1000}km</span>
									<p>Visiblity</p>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="not-found">
						<img src="./assets/images/404.jpg" alt="..." />
						<p>Oops! Invalid Location :/</p>
					</div>
				)}
			</div>
		</>
	);
}

export default App;

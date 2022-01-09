import React, {useRef, useEffect, useState} from "react";

function App() {
	const videoRef = useRef(null);
	const photoRef = useRef(null);

	const [hasPhoto, setHasPhoto] = useState(false);

	const getVideo = () => {
		let video = videoRef.current;
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia({ video: {facingMode: {exact: 'environment'}}})
			  .then(function (stream) {
				video.srcObject = stream;
				video.play();
				
			  })
			  .catch(function (err) {
				console.error(err);
			  });
		  }
		else
		  console.log("No Camera")
	}

	const takePhoto = () => {
		const width = 414;
		const height = width / (16/9);

		let video = videoRef.current;
		let photo = photoRef.current;

		photo.width = width;
		photo.height = height;

		let ctx = photo.getContext('2d');
		ctx.drawImage(video, 0, 0, width, height);
		setHasPhoto(true);
	}

	const closePhoto = () => {
		let photo = photoRef.current;
		let ctx = photo.getContext('2d');
		
		ctx.clearRect(0, 0, photo.width, photo.height);

		setHasPhoto(false);
	}

	useEffect(() => {
		getVideo();
	}, [videoRef]);

	return (
		<div className="App">
			<div className="camera">
				<video ref={videoRef}></video>
				<button onClick={takePhoto}>SNAP!</button>
			</div>
			<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
				<canvas ref={photoRef}></canvas>
				<button onClick={closePhoto}>CLOSE</button>
			</div>
		</div>
	);
		
}

export default App;

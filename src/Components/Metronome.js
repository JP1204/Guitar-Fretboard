import React, { useState, useEffect } from 'react'
// import click1 from "../Assets"
import click1 from "../Assets/grit3.mp3"
import click2 from "../Assets/kick2.mp3"

const beatOneClick = new Audio(click1)
const click = new Audio(click2)

function Metronome({tempo, setTempo, isPlaying, setIsPlaying, currCount, setCurrCount, setCurrMeasure}) {
	function tempoHandler(event) {
		setTempo(parseInt(event.target.value))
	}

	function decrementHandler(event) {
		setTempo((prevTempo) => prevTempo-1)
	}

	function incrementHandler(event) {
		setTempo((prevTempo) => prevTempo+1)
	}

	function startStopHandler() {
		setIsPlaying((prevIsPlaying => !prevIsPlaying))
	}

	function playClick() {
		let beatsPerMeasure = 4 // can be configured later potentially

		if(currCount % beatsPerMeasure === 0) {
			beatOneClick.play()
		} else {
			click.play()
		}
	}

	// sets up new interval timer when the start/stop button is set to start or when the tempo changes
	useEffect(() => {
		if (isPlaying) {
			setCurrCount(0)
			setCurrMeasure(0)
			let interval = setInterval(() => {
				setCurrCount(prevCount => (prevCount+1) % 4)
			}, (60 / tempo) * 1000)
			playClick()    // Plays the first beat immediately after the user clicks the start button
			return () => clearInterval(interval)
		}
	}, [isPlaying, tempo])

	// plays the click every time the count is updated
	useEffect(() => {
		playClick()
	}, [currCount])

	return (
		<div className='metronome'>
			<div className="bpm-slider">
				<div>
					<button className='change-tempo-button' onClick={decrementHandler}>-</button>
					{tempo} BPM
					<button className='change-tempo-button' onClick={incrementHandler}>+</button>
				</div>

				<input
					type="range"
					min={30}
					max={120}
					value={tempo}
					onChange={tempoHandler}
				/>
			</div>
			<button className='start-stop-button' onClick={startStopHandler}>
				{isPlaying ? 'Stop':'Start'}
			</button>
		</div>
	)
}

export default Metronome
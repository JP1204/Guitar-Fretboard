import React, { useState, useEffect } from 'react';
import Fretboard from '../Fretboard'
import NoteSetController from '../NoteSetController';
import Metronome from '../Metronome'
import {createFretboard, createAllActiveNoteSet, createAllInactiveNoteSet, createOpenStringActiveNoteSet} from '../../Helpers/FretboardHelpers'
import './App.css';


function App() {
	// fretboard state
	const [tuning, setTuning] = useState(['E','B','G','D','A','E'])
	const [numFrets, setNumFrets] = useState(12)
	const [fretboard, setFretboard] = useState(createFretboard(tuning, numFrets))

	// note preset state
	const [noteSetIdx, setNoteSetIdx] = useState(0)
	const [noteSets, setNoteSets] = useState(
		[
			createOpenStringActiveNoteSet("#333c83", numStrings(), numFrets, [0, 1]),
			createAllInactiveNoteSet("#F9A41B", numStrings(), numFrets, [1, 2]),
			createAllInactiveNoteSet("#79A9AB", numStrings(), numFrets, [2]),
			createAllInactiveNoteSet("#AB55A0", numStrings(), numFrets, [1,2,3])
		]
	)

	// metronome state
	const [tempo, setTempo] = useState(100) // in bpm
	const [isPlaying, setIsPlaying] = useState(false)
	const [currCount, setCurrCount] = useState(0)	// the current click count in 4/4
	const [currMeasure, setCurrMeasure] = useState(0)	// the current measure in 4/4

	function numStrings () {
	return tuning.length
	}

	const noteSetColors = noteSets.map((noteSet) => {
	return noteSet.color
	})
	
	// resets note set index back to 0 to start looping through them when the metronome starts playing
	// useEffect(() => {
	// 	if (isPlaying) {
	// 		setNoteSetIdx(0)
	// 	}
	// }, [isPlaying])

	// useEffect(() => {
	// 	if (isPlaying && currCount % 4 === 0) {

	// 		setNoteSetIdx(prevNoteSetIdx => (prevNoteSetIdx+1) % 4)
	// 	} 
	// }, [currCount])

	useEffect(() => {
		if (isPlaying && currCount % 4 === 0) {
			setCurrMeasure(prevMeasure => (prevMeasure+1) % 4)
		}
	}, [currCount])

	return (
		<div className="App">
			<div className='header-section container'>
				<h1 className='title'>Guitar Visualization Tool</h1>
			</div>
			
			<Fretboard 
				fretboard={fretboard} 
				noteSets={noteSets}
				noteSetIdx={noteSetIdx}
				setNoteSets={setNoteSets}
				isPlaying={isPlaying}
				currCount={currCount}
				currMeasure={currMeasure}
			/>

			<div className='container control-section'>
				<div className='row'>
					<div className='col-sm-12 col-md-4 note-presets-section'>
						<NoteSetController
							noteSetIdx={noteSetIdx}
							setNoteSetIdx={setNoteSetIdx}
							noteSetColors={noteSetColors}
						/>
					</div>
					<div className='col-sm-12 col-md-8 metronome-section'>
						<Metronome
							tempo={tempo}
							setTempo={setTempo}
							isPlaying={isPlaying}
							setIsPlaying={setIsPlaying}
							currCount={currCount}
							setCurrCount={setCurrCount}
							setCurrMeasure={setCurrMeasure}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'

function Fretboard({fretboard, noteSets, setNoteSets, noteSetIdx, isPlaying, currCount, currMeasure}) {
	const fretboardDisplay = fretboard.map((stringArray, i) => {
		const stringDisplay = stringArray.map((note, j) => {
			let noteSetsDisplay = []
			if (isPlaying) {
				noteSets.forEach((noteSet) => {
					if (noteSet.measuresActive.includes(currMeasure) && noteSet.noteMatrix[i][j]) {
						noteSetsDisplay.push(noteSet)
					}
				})
			} else {
				if (noteSets[noteSetIdx].noteMatrix[i][j]) {
					noteSetsDisplay.push(noteSets[noteSetIdx])
				}
			}

			if (noteSetsDisplay.length === 0) {
				note = ""
			} else {
				noteSetsDisplay = noteSetsDisplay.map((noteSet) => {
					return <div id='activeDotIcon' style={{backgroundColor:noteSet.color}}></div>
				})
			}

			return (
				<td className='col fret-cell'
					id={`${noteSetIdx}${i}${j}`}
					onClick={noteSetHandler}>
						{note}<br></br>
						{noteSetsDisplay}
						{/* {noteSet.noteMatrix[i][j] && <div id='activeDotIcon' style={{backgroundColor:noteSet.color}}></div>} */}
				</td>
			)
		})
		return <tr className='row'>{stringDisplay}</tr>
	})

	function noteSetHandler(event) {
		if (!isPlaying) { // can only update presets when the metronome is stopped (not playing)
			// currentTarget gets the fret (td) that is attached to this handler, instead of potential child nodes
			const presetIdx = parseInt(event.currentTarget.id[0])
			const stringIdx = parseInt(event.currentTarget.id[1])
			const fretIdx = parseInt(event.currentTarget.id.substring(2))

			setNoteSets((prevNoteSet) => {
				var updatedNoteSet = JSON.parse(JSON.stringify(prevNoteSet))
				updatedNoteSet[presetIdx].noteMatrix[stringIdx][fretIdx] = !updatedNoteSet[presetIdx].noteMatrix[stringIdx][fretIdx]
				return updatedNoteSet
			})
		}
	}

	return (
		<Table className='container' borderless>
			{fretboardDisplay}
		</Table>
	)
}

function String({stringArray}) {
	const stringDisplay = stringArray.map((note, fretNum) => {
		return <Fret note={note} fretNum={fretNum}/>
	})

	return <tr className='row'>{stringDisplay}</tr>
}

function Fret({note, fretNum}) {
	return <td className='col'>
		{note}
	</td>
}

export default Fretboard
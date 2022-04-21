/* Helper file to construct the fretboard (2d array of notes)
 * and note matrix (2d array of booleans) 
 */
const notes = ['A','A#/Bb','B','C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab']

function createFretboard(tuning, numFrets) {
    var numStrings = tuning.length
    var fretboard = new Array(numStrings)
    
    for (let i = 0; i < numStrings; i++) {
        fretboard[i] = getStringNotes(tuning[i], numFrets)
    }
    
    return fretboard
} 

// Gets n number of fret notes for a string starting at a specified note
// Will return n+1 notes (including starting note)
function getStringNotes(startingNote, numFrets) {
    var startIdx = notes.findIndex((note) => {
        return note === startingNote
    })
    var stringNotes = new Array()

    for(let i = startIdx; i < startIdx+numFrets+1; i++) {
        stringNotes.push(notes[i%notes.length])
    }

    return stringNotes
}

function NoteSet(color, noteMatrix, measuresActive) {
    this.color = color
    this.noteMatrix = noteMatrix
    this.measuresActive = measuresActive
}

function createAllActiveNoteSet(color, numStrings, numFrets, measuresActive) {
    return  new NoteSet(color, Array(numStrings).fill().map(() => Array(numFrets+1).fill(true)), measuresActive)
}

function createAllInactiveNoteSet(color, numStrings, numFrets, measuresActive) {
    return new NoteSet(color, Array(numStrings).fill().map(() => Array(numFrets+1).fill(false)), measuresActive)
}

function createOpenStringActiveNoteSet(color, numStrings, numFrets, measuresActive) {
    var noteSet = createAllInactiveNoteSet(color, numStrings, numFrets, measuresActive)
    for (let i = 0; i < numStrings; i++) {
        noteSet.noteMatrix[i][0] = true
    }
    return noteSet
}

export {notes, createFretboard, createAllActiveNoteSet, createAllInactiveNoteSet, createOpenStringActiveNoteSet}
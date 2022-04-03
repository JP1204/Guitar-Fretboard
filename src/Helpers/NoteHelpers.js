
const notes = ['A','A#/Bb','B','C','C#/Db','D','D#/Eb','E','F','F#/Gb','G','G#/Ab']

/* Gets n number of notes for a string starting at a specified note */
function getStringNotes(startingNote, n) {
    var startIdx = notes.findIndex((note) => {
        return note === startingNote
    })
    var stringNotes = new Array()

    for(let i = startIdx; i < n; i++) {
        stringNotes.push(notes[i%notes.length])
    }

    console.log(stringNotes)
    return stringNotes
}

export {notes, getStringNotes}
import React, { useState } from 'react'
import { getStringNotes } from '../Helpers/NoteHelpers'
import Fret from './Fret'

function String({openNote, numFrets}) {
    const [string, setString] = useState(Array(numFrets).fill().map(() => <Fret/>))
    console.log("open note: " + openNote)

    const stringNotes = getStringNotes(openNote, numFrets)
    const stringFrets = stringNotes.map((note, idx) => {
        return <Fret note={note} fretNum={idx} />        
    })

    return <React.Fragment>
        <tr>
            {string}
        </tr>
    </React.Fragment>
}


export default String
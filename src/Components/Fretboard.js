import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import String from './String'
import Fret from './Fret'

function Fretboard({tuning, numFrets}) {
    var numStrings = tuning.length
    const [fretboard, setFretboard] = useState(Array(numStrings).fill().map((_, index)=> <String openNote={tuning[index]} numFrets={numFrets}/>))

    useEffect(() => {
        numStrings = tuning.length
    },[tuning])
    
    return (
        <div className='Fretboard'>
            <Table>
                {fretboard}
            </Table>
        </div>
    )
}

export default Fretboard
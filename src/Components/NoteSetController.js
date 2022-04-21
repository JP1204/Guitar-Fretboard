import React, { useState, useEffect } from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

function NoteSetController({noteSetIdx, setNoteSetIdx, noteSetColors}) {

    function onPresetClick(event) {
        setNoteSetIdx(parseInt(event.target.value-1))
    }

    return (
        <div className='note-presets'>
            Current Note Preset: {noteSetIdx+1}<br/>
            <div class="btn-group mr-2" role="group" aria-label="First group" onClick={onPresetClick}>
                <button type="button" class="btn" style={{backgroundColor:noteSetColors[0], color:"white"}} value="1">1</button>
                <button type="button" class="btn" style={{backgroundColor:noteSetColors[1], color:"white"}} value="2">2</button>
                <button type="button" class="btn" style={{backgroundColor:noteSetColors[2], color:"white"}} value="3">3</button>
                <button type="button" class="btn" style={{backgroundColor:noteSetColors[3], color:"white"}} value="4">4</button>
            </div>
        </div>
    )
}

export default NoteSetController
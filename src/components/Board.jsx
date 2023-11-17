import React, { useEffect, useRef, useState } from 'react'
import boardBackground from '../assets/boardBackground.webp'
import SmallBoard, { gameWonOrNot } from './SmallBoard'
import x from '../assets/x.png'
import o from '../assets/o.png'

export default function board() {
    const [boardNo, setBoardNo] = useState(-1);
    const [whoseTurn, setWhoseTurn] = useState(x);
    const [anyWinner, setAnyWinner] = useState(false);
    const mainGameStatus = useRef([...Array(9)].map(() => 0))

    const style = {
        height: 350,
        width: 350,
        background: `url(${boardBackground})`,
        backgroundSize: "cover",
        display: "flex",
        flexWrap: "wrap",
        // transform: "scale(1.1)",
    }

    return (
        <>
            <p className="fs-3">{anyWinner === false ? (whoseTurn == x ? "X's Turn" : "O's Turn") : `${anyWinner} is the Winner`}</p>
            <div style={style}>
                {[...Array(9)].map((e, i) =>
                    <SmallBoard key={i} boardId={i} boardNo={boardNo} setBoardNo={setBoardNo} whoseTurn={whoseTurn} setWhoseTurn={setWhoseTurn} mainGameStatus={mainGameStatus} anyWinner={anyWinner} setAnyWinner={setAnyWinner} />
                )}
            </div>
        </>
    )
}

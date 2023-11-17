import React, { useRef } from 'react'
import x from '../assets/x.png'
import o from '../assets/o.png'
import boardBackground2 from '../assets/boardBackground2.webp'

export default function SmallBoard({ scaleFactor, boardNo, setBoardNo, id, whoseTurn, setWhoseTurn, boardId, mainGameStatus, anyWinner, setAnyWinner }) {
    const gameRunning = useRef(true)
    const gameStatus = useRef([...Array(9)].map(() => 0))


    const style1 = {
        backgroundSize: "cover",
        height: "33.33%",
        width: "33.33%",
        margin: "1 0",
        translate: "-9% 0",
        // border: "1px solid red"
    }

    const style2 = {
        height: "33.33%",
        width: "33.33%",
        backgroundImage: `url(${boardBackground2})`,
        backgroundSize: "cover",
        display: "flex",
        flexWrap: "wrap",
        padding: 0,
        transform: "scale(.8)",
        border: "2px solid #fc9de8",
        // translate: "-9% 0",
    }

    //seting background color for playable boards
    if (gameRunning.current && (boardNo == -1 || boardNo == boardId)) {
        style2.backgroundColor = "#fcdef6"
    }

    function turn(e) {

        //checking if move is allowed
        if (!anyWinner && (boardNo == -1 || boardId == boardNo) && gameRunning.current && gameStatus.current[e.target.id] === 0) {

            e.target.style.backgroundImage = `url(${whoseTurn})`;
            gameStatus.current[e.target.id] = whoseTurn == x ? 1 : -1
            gameRunning.current = !gameWonOrNot(gameStatus.current, gameStatus.current[e.target.id])

            

            //condition when a small board game is over
            if (!gameRunning.current) {
                mainGameStatus.current[boardId] = whoseTurn == x ? 1 : -1
                //checking if main game is over
                if (gameWonOrNot(mainGameStatus.current, mainGameStatus.current[boardId])) {
                    setAnyWinner(whoseTurn == x ? "X" : "O");
                }
                e.target.parentElement.style.translate = "-10% 0"
                e.target.parentElement.style.backgroundImage = `url(${whoseTurn})`
                e.target.parentElement.style.border = ""
                gameStatus.current[e.target.id] = whoseTurn == x ? 1 : -1
            }
            setWhoseTurn(whoseTurn == x ? o : x)

          //setting boardNo if board is not finished
          if (mainGameStatus.current[e.target.id] === 0) {

              //checking if all the blocks are filled or not
              let flag = 0;
              for (let i = 0; i < 9; i++)
                  if (completeGameStatus[e.target.id][i] === 0) {
                      flag = 1;
                      break;
                  }
              if (flag === 1)
                  setBoardNo(e.target.id)
              else
                  setBoardNo(-1)
          }

          else
              setBoardNo(-1)
        }

    }

    return (
        <div style={style2}>
            {gameRunning.current && [...Array(9)].map((e, i) =>
                <div style={style1} onClick={(e) => turn(e)} id={i} key={i}> </div>)}
        </div >
    )
}
export function gameWonOrNot(array, n) {
    if (array[0] + array[1] + array[2] === 3 * n ||
        array[3] + array[4] + array[5] === 3 * n ||
        array[6] + array[7] + array[8] === 3 * n ||
        array[0] + array[3] + array[6] === 3 * n ||
        array[1] + array[4] + array[7] === 3 * n ||
        array[2] + array[5] + array[8] === 3 * n ||
        array[0] + array[4] + array[8] === 3 * n ||
        array[2] + array[4] + array[6] === 3 * n)
        return true;
    return false;
}
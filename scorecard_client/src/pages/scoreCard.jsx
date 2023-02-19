//component for viewing and updating scorecards

import useHttp from "../hooks/use-http";
import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import uuid from "react-uuid";

const ScoreCard = () => {
    const {isLoading, error, sendRequest} = useHttp()
    const {id} = useParams()
    const navigate = useNavigate()

    const [course, setCourse] = useState({})
    const [players, setPlayers] = useState({players: []})

    useEffect(() => {
        sendRequest({url: `http://localhost:3000/score_cards/${id}`}, result => {
            setCourse(result.course)
            setPlayers({
                players: result.players.map(p => {
                    return {
                        ...p,
                        react_id: uuid()
                    }
                })
            })
        })

    }, [sendRequest])

    const saveScoreCard = (e) => {
        e.preventDefault()
        const request = {
            course_id: course.id,
            players_attributes: players.players.map(player => {
                return {
                    id: player.id,
                    name: player.name,
                    player_scores_attributes: player.player_scores.map(score => {
                        return {
                            id: score.id,
                            hole_number: score.hole_number,
                            score: score.score
                        }
                    })
                }
            })
        }
        console.log(JSON.stringify(request))

        sendRequest({
            url: `http://localhost:3000/score_cards/${id}`,
            method: "PUT",
            body: request,
            headers: {'Content-Type': 'application/json'}

        }, (result, err) => {
            if (!err) {
                navigate(0)
            }
        })
    }

    const addPlayer = (e) => {
        let player = {
            react_id: uuid(),
            name: '',
            player_scores: course?.par?.map(hole => {
                return {
                    hole_number: hole.hole_number,
                    score: ''
                }
            })
        }
        let temp = players.players;
        temp.push(player)
        setPlayers({players: temp})
    }

    const removePlayer = (e, player) => {
        let temp = players.players;
        let result = [];
        temp.forEach(p => {
            if (p.react_id !== player.react_id) {
                result.push(p);
            }
        })
        setPlayers({players: result})
    }

    const updatePlayerName = (e, id) => {
        let temp = players.players;
        let result = [];
        temp.forEach(p => {
            if (p.react_id === id) {
                p.name = e.target.value;
            }
            result.push(p)
        })
        setPlayers({players: result})
    }

    const getPlayerScore = (playerId, holeNumber) => {
        return players?.players?.filter(p => p.react_id === playerId)[0].player_scores
            .filter(s => s.hole_number === holeNumber)[0].score
    }

    const updatePlayerScore = (e, id, holeNumber) => {
        let tempPlayers = players?.players;
        let result = [];
        tempPlayers.forEach(player => {
            if (player.react_id === id) {
                player.player_scores.forEach(score => {
                    if (score.hole_number == holeNumber) {
                        score.score = e.target.value;
                    }
                })
            }
            result.push(player)
        })
        setPlayers({players: result})
    }

    const getPlayerOutScore = (player) => {
        return player.player_scores.reduce((acc, cur) => {
            if (cur.hole_number <= 9) {
                return acc + (parseInt(cur.score) || 0)
            }
            return acc
        }, 0)
    }

    const getPlayerInScore = (player) => {
        return player.player_scores.reduce((acc, cur) => {
            if (cur.hole_number > 9) {
                return acc + (parseInt(cur.score) || 0)
            }
            return acc
        }, 0)
    }

    const getPlayerTotal = (player) => {
        return player.player_scores.reduce((acc, cur) => {
            return acc + (parseInt(cur.score) || 0)
        }, 0)
    }

    return (
        <>
            <h1 className="main-heading">Score Card </h1>
            <form onSubmit={saveScoreCard} className="scorecard-form">
                <Link to="/" className="space-below">Back to home</Link>
                {error && <p className="error">There was a problem. Unable to perform request.</p>}
                <div className="grid-container">

                    <div className="row">
                        <input readOnly={true} value="Hole" className="row-header non-editable" key={"whole-header"}/>
                        {course?.par?.map((par, index) => {
                            if (index == 9) {
                                return (
                                    <>
                                        <input key={'out'} value={"OUT"} readOnly={true} className="non-editable out"/>
                                        <input key={index} value={par.hole_number} readOnly={true}
                                               className="non-editable"/>
                                    </>
                                )
                            }
                            if (index == 17) {
                                return (
                                    <>
                                        <input key={index} value={par.hole_number} readOnly={true}
                                               className="non-editable"/>
                                        <input key={'in'} value={"IN"} readOnly={true} className="non-editable in"/>
                                        <input key={'total'} value={"TOTAL"} readOnly={true}
                                               className="non-editable in"/>

                                    </>
                                )
                            }
                            return <input key={index} value={par.hole_number} readOnly={true} className="non-editable"/>
                        })}
                    </div>

                    {course?.tees?.map((tee, index) => {
                        return (
                            <div key={index}>
                                <div className="row">
                                    <input value={tee.name} className="row-header" readOnly/>
                                    {tee?.teeYardages?.map((yardage) => {
                                        if (yardage.hole_number == 9) {
                                            let outYardage = tee.teeYardages?.reduce((acc, current) => {
                                                if (current.hole_number <= 9) {
                                                    return acc + current.yardage;
                                                }
                                                return acc;
                                            }, 0);
                                            return (
                                                <>
                                                    <input key="out" type="number" value={yardage.yardage}
                                                           readOnly className="non-editable"/>
                                                    <input type="number" key={yardage.hole_number} value={outYardage}
                                                           readOnly className="non-editable out"/>

                                                </>
                                            )
                                        }
                                        if (yardage.hole_number == 18) {
                                            let inYardage = tee.teeYardages?.reduce((acc, current) => {
                                                if (current.hole_number > 9) {
                                                    return acc + current.yardage;
                                                }
                                                return acc;
                                            }, 0);

                                            let total = tee.teeYardages?.reduce((acc, current) => {
                                                return acc + current.yardage;
                                            }, 0);
                                            return (
                                                <>
                                                    <input key="in" type="number" value={yardage.yardage}
                                                           readOnly className="non-editable"/>
                                                    <input type="number" key={yardage.hole_number} value={inYardage}
                                                           readOnly className="non-editable in"/>
                                                    <input type="number" key="total" value={total}
                                                           readOnly className="non-editable in"/>

                                                </>
                                            )
                                        }
                                        return <input type="number" key={yardage.hole_number} value={yardage.yardage}
                                                      readOnly className="non-editable"/>
                                    })}
                                </div>
                            </div>)
                    })}

                    <div className="row">
                        <input readOnly={true} value="Par" className="non-editable row-header"/>
                        {course?.par?.map((par) => {
                            if (par.hole_number == 9) {
                                let outYardage = course.par?.reduce((acc, current) => {
                                    if (current.hole_number <= 9) {
                                        return acc + current.value;
                                    }
                                    return acc;
                                }, 0);
                                return (
                                    <>
                                        <input key={par.hole_number} type="number" value={par.value} readOnly
                                               className="non-editable"/>
                                        <input type="number" key="out" value={outYardage}
                                               readOnly className="non-editable out"/>

                                    </>
                                )
                            }
                            if (par.hole_number == 18) {
                                let inYardage = course.par?.reduce((acc, current) => {
                                    if (current.hole_number > 9) {
                                        return acc + current.value;
                                    }
                                    return acc;
                                }, 0);


                                let total = course.par?.reduce((acc, current) => {
                                    return acc + current.value;
                                }, 0);

                                return (
                                    <>
                                        <input key={par.hole_number} type="number" value={par.value} readOnly
                                               className="non-editable"/>
                                        <input type="number" key="in" value={inYardage}
                                               readOnly className="non-editable out"/>
                                        <input type="number" key="total" value={total}
                                               readOnly className="non-editable out"/>

                                    </>
                                )
                            }
                            return <input key={par.hole_number} type="number" value={par.value} readOnly
                                          className="non-editable"/>
                        })}
                    </div>


                    {players.players?.map((player, index) => {
                        return (
                            <div key={index}>
                                <button type="button" className="remove" onClick={(e) => {
                                    removePlayer(e, player)
                                }}>Remove
                                </button>
                                <div className="row">
                                    <input value={player.name} className="row-header" placeholder="Player Name" required
                                           onChange={(e) => {
                                               updatePlayerName(e, player.react_id)
                                           }}/>
                                    {course?.par?.map((hole) => {

                                        if (hole.hole_number == 9) {
                                            return (
                                                <>
                                                    <input type="number" key={hole.hole_number}
                                                           value={getPlayerScore(player.react_id, hole.hole_number)}
                                                           onChange={(e) => updatePlayerScore(e, player.react_id, hole.hole_number)}
                                                           required/>
                                                    <input type="number" key={"out"} value={getPlayerOutScore(player)}
                                                           readOnly className="non-editable out"/>

                                                </>
                                            )
                                        }
                                        if (hole.hole_number == 18) {
                                            let inYardage = 0;
                                            return (
                                                <>
                                                    <input type="number" key={hole.hole_number}
                                                           value={getPlayerScore(player.react_id, hole.hole_number)}
                                                           onChange={(e) => updatePlayerScore(e, player.react_id, hole.hole_number)}
                                                           required/>
                                                    <input type="number" key={"in"} value={getPlayerInScore(player)}
                                                           readOnly className="non-editable out"/>
                                                    <input type="number" key={"total"} value={getPlayerTotal(player)}
                                                           readOnly className="non-editable out"/>

                                                </>
                                            )
                                        }

                                        return <input type="number" key={hole.hole_number}
                                                      value={getPlayerScore(player.react_id, hole.hole_number)}
                                                      onChange={(e) => updatePlayerScore(e, player.react_id, hole.hole_number)}
                                                      required/>
                                    })}
                                </div>
                            </div>)
                    })
                    }
                </div>
                <div>
                    <span className="add-tee" onClick={addPlayer}><button type="button">+</button> Add Player</span>
                </div>
                <button className="button submit-button" type="submit" disabled={isLoading}>Save Scorecard</button>

            </form>
        </>
    )

}

export default ScoreCard
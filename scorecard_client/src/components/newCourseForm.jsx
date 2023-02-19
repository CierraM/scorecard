import {useRef, useState} from "react";
import uuid from 'react-uuid';
import useHttp from "../hooks/use-http";
import {useNavigate} from "react-router-dom";

const NewCourseForm = () => {
    const NUMBER_OF_HOLES = 18;
    const holes = Array.from({length: NUMBER_OF_HOLES}, (v, i) => i + 1)
    const {isLoading, error, sendRequest} = useHttp();
    const navigate = useNavigate()

    const nameInputRef = useRef()
    const [tees, setTees] = useState({tees: []})
    const [pars, setPars] = useState({
        pars: holes.map(hole => {
            return {
                hole_number: hole,
                value: ''
            }
        })
    })

    const createCourse = (e) => {
        e.preventDefault()
        const request = {
                name: nameInputRef.current.value,
                par_attributes: pars.pars,
                tees_attributes: tees.tees.map(tee => {
                    return {
                        name: tee.name,
                        teeYardages_attributes: tee.yardages.map(y => {
                            return {
                                hole_number: y.hole_number,
                                yardage: y.yardage
                            }
                        })
                    }
                })
            }

        sendRequest({
            url: 'http://localhost:3000/courses',
            method: 'POST',
            body: request,
            headers: {'Content-Type': 'application/json'}
        }, (result, err) => {
            console.log(result);
            if (!err) {
                navigate('/')
            }
        })

    }

    const updateTeeName = (e, id) => {
        let temp = tees.tees;
        let result = [];
        temp.forEach(i => {
            if (i.id == id) {
                i.name = e.target.value;
            }
            result.push(i)
        })
        setTees({tees: result})
    }

    const addTee = (e) => {
        let tee = {
            id: uuid(),
            name: '',
            yardages: holes.map(hole => {
                return {
                    hole_number: hole,
                    yardage: ''
                }
            })
        }
        let temp = tees.tees;
        temp.push(tee)
        setTees({tees: temp})
    }

    const removeTee = (e, tee) => {
        let temp = tees.tees;
        let result = [];
        temp.forEach(i => {
            if (i.id !== tee.id) {
                result.push(i)
            }
        })
        setTees({tees: result})
    }

    const getTeeYardage = (id, holeNumber) => {
        let result = tees.tees.filter(t => t.id == id)[0].yardages.filter(y => y.hole_number == holeNumber)[0].yardage
    }

    const getParValue = (holeNumber) => {
        return pars.pars.filter(p => p.hole_number == holeNumber)[0].value
    }

    const updateTeeYardage = (e, id, holeNumber) => {
        let tempTees = tees.tees;
        let result = [];
        tempTees.forEach(tee => {
            if (tee.id === id) {
                tee.yardages.forEach(yardage => {
                    if (yardage.hole_number == holeNumber) {
                        yardage.yardage = e.target.value;
                    }
                })
            }
            result.push(tee)
        })
        setTees({tees: result})
    }

    const updateParValue = (e, holeNumber) => {
        let tempPars = pars.pars
        let result = [];
        tempPars.forEach(par => {
            if (par.hole_number == holeNumber) {
                par.value = e.target.value;
            }
            result.push(par)
        })
        setPars({pars: result})
    }

    return (
        <form className="new-course-form" onSubmit={createCourse}>
            {error && <p className="error">There was a problem creating the course. Make sure you are using a unique name for this course.</p>}
            <div className="course-name">
                <label htmlFor="course-name">Course Name</label>
                <input type="text" name="course-name" required ref={nameInputRef}/>
            </div>
            <div className="grid-container">
                <div className="row">
                    <input readOnly={true} value="Hole" className="row-header non-editable"/>
                    {holes.map((hole) => {
                        return <input key={hole} value={hole} readOnly={true} className="non-editable"/>
                    })}

                </div>
                <div className="row">
                    <input readOnly={true} value="Par" className="row-header"/>
                    {holes.map((hole) => {
                        return <input key={hole} type="number" value={getParValue(hole)}
                                      onChange={(e) => updateParValue(e, hole)} required/>
                    })}
                </div>
                <label>Tees</label>
                {tees.tees.map((tee, index) => {
                    return (
                        <div key={index}>
                            <button type="button"  className="remove" onClick={(e) => {removeTee(e, tee)}}>Remove</button>
                            <div className="row" >
                                <input value={tee.name} className="row-header" placeholder="Tee Name" required
                                       value={tee.name} onChange={(e) => {
                                    updateTeeName(e, tee.id)
                                }}/>
                                {holes.map((hole) => {
                                    return <input type="number" key={hole} value={getTeeYardage(tee.id, hole)}
                                                  onChange={(e) => updateTeeYardage(e, tee.id, hole)} required/>
                                })}
                            </div>
                        </div>)
                })}
            </div>
            <div>
                <span className="add-tee" onClick={addTee}><button type="button">+</button> Add Tee</span>
            </div>

            <button className="button submit-button" type="submit" disabled={isLoading}>Save Course</button>
        </form>
    )
}

export default NewCourseForm
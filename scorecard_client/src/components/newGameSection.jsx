import {Link, useNavigate} from "react-router-dom";
import {useRef} from "react";
import useHttp from "../hooks/use-http";

const NewGameSection = ({courses}) => {
    const courseRef = useRef()
    const navigate = useNavigate();
    const {isLoading, error, sendRequest} = useHttp()

    const startNewGame = (event) => {
        event.preventDefault()
        //send create request to make an new scorecard, then redirect to the scorecard page.
        sendRequest({
            url: "http://localhost:3000/score_cards",
            method: "POST",
            body: {
                course_id: courseRef.current.value
            },
            headers: {'Content-Type': 'application/json'},
        }, result => {
            navigate(`/${result.id}`)
        })
    }

    return (
        <div className="new-game-section-wrapper">
            <div className="new-game-section new-scorecard-section">
                <h2>New Score Card</h2>
                <form onSubmit={startNewGame} className="new-scorecard-form">
                    <label htmlFor="courses">Choose a course:</label>
                    <select name="courses" id="courses" ref={courseRef}>
                        {courses.map((course, index) => {
                            return <option key={index} value={course.id}>{course.name}</option>
                        })}
                    </select>
                    <button className="button" type="submit">Go</button>
                </form>
            </div>
            <div className="new-game-section create-course-section">
                <p>Or ...</p>
                <Link className="button create-course" to="/create">Create a Course</Link>
            </div>
        </div>
    )
}

export default NewGameSection
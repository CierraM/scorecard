//component for browsing scorecards, with buttons for creating courses and scorecards

import NewGameSection from "../components/newGameSection";
import ScoreCardList from "../components/scoreCardList";
import {useEffect, useState} from "react";
import useHttp from "../hooks/use-http";

const Home = () => {
    const {isLoading, error, sendRequest} = useHttp()
    const [scoreCards, setScoreCards] = useState([])
    const [courses, setCourses] = useState([])

    useEffect(() => {
        sendRequest({url: "http://localhost:3000/score_cards"}, result => {
            setScoreCards(result)
        })

        sendRequest({url: "http://localhost:3000/courses"}, result => {
            setCourses(result)
        })
    }, [sendRequest])

    return (
        <div>
            <h1 className="main-heading">Golf Score Card App</h1>
            <NewGameSection courses={courses}/>
            <ScoreCardList scoreCards={scoreCards} isLoading={isLoading}/>
        </div>
    )
}

export default Home
import {Link} from "react-router-dom"

const ScoreCardList = ({scoreCards, isLoading}) => {

    return (
        <div className="scorecard-list-wrapper">
            <h2>Previous Score Cards</h2>
            {isLoading ? <p>loading...</p> :
                <ul className="card-list">
                    {scoreCards.map((scoreCard, index) => {
                        const date = new Date(scoreCard.course.updated_at).toLocaleDateString()
                        return (<li key={index}>
                            <Link to={`/${scoreCard.id}`}>
                                <span>{scoreCard.course.name}</span>
                                <span>{date}</span>
                            </Link>
                        </li>)
                    })}
                </ul>
            }

        </div>
    )
}

export default ScoreCardList
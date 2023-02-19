class ScoreCardsController < ApplicationController
  # return all scorecards
  def index
    scoreCards = ScoreCard.includes(players: [:player_scores])

    render json: scoreCards.to_json(
      { include:
          [
            course: { include: [:par, tees: { include: :teeYardages }] },
            players: { include: :player_scores },
          ],
      }
    ), status: 200
  end

  # create a scorecard
  def create
    scoreCard = ScoreCard.new(score_card_params)
    if scoreCard.save
      render json: scoreCard, status: 200
    else
      puts scoreCard.errors.full_messages
      render json: { message: "Unable to save scorecard" }, status: 400
    end
  end

  # return a scorecard
  def show
    scoreCard = ScoreCard.find_by(id: params[:id])
    if scoreCard
      render json: scoreCard.to_json(
        { include:
            [
              course: { include: [:par, tees: { include: :teeYardages }] },
              players: { include: :player_scores },
            ],
        }
      ), status: 200
    else
      render json: { error: "Score Card not found" }
    end
  end

  # update a scorecard
  def update
    scoreCard = ScoreCard.find_by(id: params[:id])
    if scoreCard.update(score_card_params)
      render json: { message: "Updated successfully" }, status: 200
    end
  end

  private

  def score_card_params
    params.require(:score_card).permit(
      :course_id,
      players_attributes: [
        :id,
        :name,
        player_scores_attributes: [
          :id,
          :hole_number,
          :score
        ]
      ]
    )
  end

end

class Player < ApplicationRecord
  belongs_to :score_card
  has_many :player_scores, dependent: :destroy

  accepts_nested_attributes_for :player_scores
end

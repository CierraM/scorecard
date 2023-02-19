class ScoreCard < ApplicationRecord
  has_many :players, dependent: :destroy
  # has_one :course
  belongs_to :course

  accepts_nested_attributes_for :players, :course
end

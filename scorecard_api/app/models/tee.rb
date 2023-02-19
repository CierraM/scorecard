class Tee < ApplicationRecord
  belongs_to :course
  has_many :teeYardages, dependent: :destroy

  accepts_nested_attributes_for :teeYardages
end

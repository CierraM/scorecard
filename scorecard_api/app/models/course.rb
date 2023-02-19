class Course < ApplicationRecord
  has_many :tees, dependent: :destroy
  has_many :par

  accepts_nested_attributes_for :tees, :par
end

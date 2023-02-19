class CoursesController < ApplicationController
  # return all courses
  def index
    courses = Course.includes(:par, tees: [:teeYardages])
    render json: courses.to_json( { include: [:par, tees: {include: :teeYardages}]}), status: 200
  end

  # create a course
  def create
    course = Course.new(course_params)
    if course.save()
      render json: course, status: 200
    end
  end

  # return a course
  def show
    course = Course.find_by(id: params[:id])
    if course
      render json: course.to_json( { include: [:par, tees: {include: :teeYardages}]}), status: 200
    else
      render json: { error: "Course not found" }
    end
  end

  # update a course
  def update
    course = Course.find_by(id: params[:id])
    if course.update(course_params)
      render json: { message: "Updated successfully" }, status: 200
    end
  end

  private

  def course_params
    params.require(:course).permit(
      :name,
      tees_attributes: [
        :name,
        teeYardages_attributes: [
          :hole_number,
          :yardage
        ]
      ],
      par_attributes: [
        :hole_number,
        :value
      ]
    )
  end
end

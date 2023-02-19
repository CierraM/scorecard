class AddCourseIdToPars < ActiveRecord::Migration[7.0]
  def change
    add_column :pars, :course_id, :integer
  end
end

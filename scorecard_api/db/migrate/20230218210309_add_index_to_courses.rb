class AddIndexToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :name, :string
    add_index :courses, :name, unique: true
  end
end

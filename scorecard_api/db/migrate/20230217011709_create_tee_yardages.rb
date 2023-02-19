class CreateTeeYardages < ActiveRecord::Migration[7.0]
  def change
    create_table :tee_yardages do |t|
      t.integer :hole_number
      t.integer :yardage
      t.references :tee, null: false, foreign_key: true

      t.timestamps
    end
  end
end

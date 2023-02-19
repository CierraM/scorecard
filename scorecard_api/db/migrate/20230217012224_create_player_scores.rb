class CreatePlayerScores < ActiveRecord::Migration[7.0]
  def change
    create_table :player_scores do |t|
      t.integer :hole_number
      t.integer :score
      t.references :player, null: false, foreign_key: true

      t.timestamps
    end
  end
end

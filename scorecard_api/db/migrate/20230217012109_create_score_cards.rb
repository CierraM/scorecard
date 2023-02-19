class CreateScoreCards < ActiveRecord::Migration[7.0]
  def change
    create_table :score_cards do |t|
      t.references :course, null: false, foreign_key: true

      t.timestamps
    end
  end
end

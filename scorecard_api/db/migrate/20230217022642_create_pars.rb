class CreatePars < ActiveRecord::Migration[7.0]
  def change
    create_table :pars do |t|
      t.integer :hole_number
      t.integer :value

      t.timestamps
    end
  end
end

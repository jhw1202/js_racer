class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |g|
      g.string :name
      g.integer :winner_id
      g.timestamps
    end
  end
end

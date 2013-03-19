class CreateGameplays < ActiveRecord::Migration
  def change 
    create_table :gameplays do |t|
      t.references :game, :user
      t.timestamps
    end
  end
end

class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |user|
      user.string :initial
      user.timestamps
    end
    add_index(:users, :initial, :unique => true)
  end
end

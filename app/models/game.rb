class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :gameplays
  has_many :users, :through => :gameplays
end

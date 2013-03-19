class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :gameplays
  has_many :games, :through => :gameplays
  validates :initial, :uniqueness => { :message => "noob you need to put in unique id. you dumb like julian"}
end

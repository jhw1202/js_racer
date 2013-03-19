get '/' do
  # Look in app/views/index.erb
  session.destroy
  @player = User.new
  erb :index
end

post '/start' do

  player_1 = User.new(params[:player1])
  player_2 =User.new(params[:player2])

  if player_1.save && player_2.save
    session[:player_1] = player_1.initial
    session[:player_2] = player_2.initial
    game = Game.create(params[:game])
    User.find_by_initial(session[:player_1]).games << game
    User.find_by_initial(session[:player_2]).games << game
    redirect '/game'
  else
    puts player_1.errors.full_messages + player_2.errors.full_messages
    @errors = player_1.errors.full_messages + player_2.errors.full_messages
    erb :index
  end
end


get '/game' do
  erb :game
end

post '/winner' do
  if params[:winner_session] == "player1"
    user = User.find_by_initial(session[:player_1])
  else
    user = User.find_by_initial(session[:player_2])
  end
  current_game = user.games.last
  current_game.winner_id = user.id
  current_game.save
  {:player_1 => User.find_by_initial(session[:player_1]).games,
   :player_2 => User.find_by_initial(session[:player_2]).games, 
   :result => User.find(Game.last.winner_id).initial }.to_json
end


get 'player/:id' do

end

$(document).ready(function() {
 
  var make_grid = function(length, id_name) {
    string = "";
    for(var i=0; i<length; i++) {
      if (i==0)
        string += "<p>"+id_name+"</p><td class='active'></td>";
      else
        string += "<td></td>";
    }
    $('#'+id_name).html(string);
  };
  make_grid(30, 'player1_strip');
  make_grid(30, 'player2_strip');
 
 
 
  var pos1 = 0;
  var pos2 = 0;
  var player1_ready = false;
  var player2_ready = false;
  var update_player_position = function(player, num) {
    var player_box = '#'+player+'_strip td'
    var player_position = player_box + ':nth-child('+num+')'
    $(player_box).removeClass('active');
    $(player_position).addClass('active');
  };
 
 
  var play = function() {
    $(document).on('keyup', function(event) {
 
      
      if(event.keyCode == 81) {
        player1_ready = true;
        if (player2_ready) {
          if(pos1 == 0 && pos2 == 0) {
            alert("Player 1 is slow like a julian");
            
          } 
            console.log("Q");
            pos1 += 1;
            update_player_position('player1', pos1);
         
        }
      } else if (event.keyCode == 80) {
        player2_ready = true;
        if (player1_ready) {
          if(pos1 == 0 && pos2 == 0) {
            alert("Player 2 is taking his time to ready");
         
          } 
            console.log("P");
            pos2 += 1;
            update_player_position('player2', pos2);
          
        }
      }
    
     // if(pos1==30)
     //    alert('player 1 wins');
     //  else if(pos2==30)
     //    alert('noob wins');
 
        if(pos1 == 30 || pos2 == 30){
          if(pos1 == 30)
            var num_string = "1"
          else
            var num_string = "2"
          var data = "winner_session=player" + num_string
          $.ajax({
            type: "POST",
            url: '/winner',
            data: data
          })
          .done(function(data_return) {
      
            // alert(results['player_1'][0].game);
            // alert(result['player_1'][0]['game']['name']);
            // $('.result').html(results.result);
            // var s = ""
            // for(var i=0; i<results.player_1.length; i++) {
            //   s += results.player_1[0].game
            // }
              console.log(data_return);
            var results = $.parseJSON(data_return);
            p_1 = "Player 1 Stats<br/>"
            for(var i=0; i<results['player_1'].length; i++) {
              p_1+= results['player_1'][i]['game']['name'] + " : "
              p_1+= results['player_1'][i]['game']['winner_id'] + "<br/>"
            }
            
            p_2 = "Player 2 Stats<br/>"
            for(var i=0; i<results['player_1'].length; i++) {
              p_2+= results['player_2'][i]['game']["name"] + " : "
              p_2+= results['player_2'][i]['game']["winner_id"] + "<br/>" 
            }
            $('.player1_results').html(p_1);
            $('.player2_results').html(p_2);
          });
        }
    });
  };
 
 
  play();
 });

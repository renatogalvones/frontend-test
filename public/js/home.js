'use strict';
var CHAT = (function(){
  var objs = {
    $chat: $('.chat'),
    $messagesList: $('.chat-messages ul'),
    historyJSON: null,
    lastMessage: null,
    lastMessageID: null
  }

  var loadHistory = function(){
    $.ajax({
      url: '/static/json/talk.json',
      type: 'GET',
      dataType: 'json',
      success: function(data){
        objs.historyJSON = data;
        console.log(objs.historyJSON)
        buildList(objs.historyJSON);
      },
      error: function(error){
        console.log(error);
      }
    });
  }

  var buildList = function(data){
    objs.$messagesList.html('');

    for (var i = 0; i < data.talkMessages.length; i++) {
      var newMessage = data.talkMessages[i];

      var messageType = typeof(newMessage.company) === 'object' ? 'support' : 'guest';
      var companyName = typeof(newMessage.company) === 'object' ? newMessage.company.name : '';
      var messageSent = new Date(newMessage.message.time);
      var timeSent = Date.now() - newMessage.message.time < 60000 ? 'enviado à poucos segundos' : 'enviado às '+ messageSent.getHours() + 'h' + messageSent.getMinutes();
      var isLastMessage = newMessage.user.id === objs.lastMessage ? 'no-profile' : '';
      var isChecked = newMessage.message.alreadyRead === true ? 'icon-checked' : 'icon-pending';


      var template = '<li class="'+ messageType +'">';
      template += '  <div class="message-box">';
      template += '    <div class="message">'+ newMessage.message.message +'</div>';
      template += '    <div class="arrow"></div>';
      template += '    <span class="is-read '+ isChecked +'"></span>';
      template += '    <div class="info">';
      template += '      <div class="username"><i>'+ newMessage.user.name +'</i></div>';
      template += '      <div class="employer"><strong>'+ companyName +'</strong></div>';
      template += '      <div class="timestamp"><i>'+ timeSent +'</i></div>';
      template += '    </div>';
      template += '  </div>';
      template += '  <div class="profile-picture '+ isLastMessage +'">';
      template += '    <img src="/static/images/users/'+ newMessage.user.id +'.jpg" alt="'+ newMessage.user.name +'">';
      template += '  </div>';
      template += '</li>';

      objs.lastMessageID = newMessage.id;
      objs.lastMessage = newMessage.user.id;
      objs.$messagesList.append(template);
    };
  }

  var controls = function(){
    $('.icon-close').on('click', function(){
      objs.$chat.hide();
    });

    $('.icon-minimize').on('click', function(){
      var _this = $(this);
      objs.$chat.toggleClass('closed');
      _this
        .toggleClass('icon-maximize')
        .toggleClass('icon-minimize');
    });

    $('.chat-write textarea').keydown(function(event) {
      var _this = $(this);
      if(event.keyCode === 13){
        var messageID = objs.historyJSON;

        objs.historyJSON.talkMessages.push({
          message:{
            alreadyRead: false,
            message: $(this).val(),
            time: Date.now()
          },
          user: {
            id: 9483484,
            name: 'Nome do candidato',
            perfilId: 1
          }
        });
        buildList(objs.historyJSON);
        var h = objs.$messagesList.height();
        $('.chat-messages').scrollTop(h);
        _this.val(null);
      }
    });
  }

  var init = function(){
    loadHistory();
    controls();
  }

  return init();
})();

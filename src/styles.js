import { mainBack, mainFront, specialBack, specialFront } from "./colors.js"

export const addCustomStyleTag = () => {
  const newStyle = document.createElement("style")
  newStyle.setAttribute('type', 'text/css')
  // classToColor background, color, padding, margin
  newStyle.innerHTML = `
    a {
      text-decoration:none;
      color:#032739;
    }

    body {
      background: ${mainBack};
      background-color: ${mainBack};
    }

    form input[type=text], form textarea {
      background: #000;
      color: #DDD;
    }

    .buttons {
      margin: 0;
      padding: 0;
      margin-top: -2px;
    }

    .active,
    .block,
    .center,
    .counter_label,
    .counter_label_green,
    .data,
    .data strong,
    .dark_blue,
    .dark_light_blue,
    .details,
    .details span,
    .details .title a,
    .details .subject,
    .details .sub-info,
    .footer-holder,
    .footer-con,
    .goal_display,
    .goal_display .counter_label_green,
    .goal_display_table,
    .goal_display_table tbody,
    .goal_display table th,
    .goal_display table .dark_blue,
    .info-user,
    .light_blue,
    .list .title a
    .nav-bar,
    .row,
    .section,
    .section #tooltip-subject,
    .sub-nav,
    .subject li a,
    .tip_shell,
    .title,
    .token_balance,
    .top-section,
    .top-section_small_gfx,
    .video-box,
    #chat_input,
    #main,
    #nav,
    #tooltip-subject,
    #user_information,
    #user_information .bottom,
    #user_information a.tokencountlink {
      background: ${mainBack};
      background-color: ${mainBack};
      color: ${mainFront};
      border: none;
    }

    form input[type=text] {
      width: 160px;
    }

    .row {
      max-width: 100%;
    }

    .token_balance {
      padding-top: 4px;
    }

    .chat-form {
      margin: 0px 2px 0;
      z-index: 4;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .goal_display table .dark_light_blue,
    .nav-bar {
      background: ${mainBack};
      background-color: ${mainBack};
      color: ${mainFront};
      border: none;
      border-top: 3px solid ${specialBack};
      border-bottom: 3px solid ${specialBack};
    }

    .goal_display img {
      display: none;
    }

    #header #user_information .bottom,
    #header #user_information .user_information_header {
      background-color: #000;
      background: #000;
    }

    #header #user_information a.tokencountlink {
      color: #DDD;
    }

    .token_options a {
      color: #DDD;
    }

    tbody {
      border-style: none;
    }

    .tip_shell{
      margin: 0;
      width: 100%;
      z-index: 1;
    }

    .bio,
    .chat-list,
    .chat-box,
    .leaderboard,
    .share_and_earn,
    #hashtag_ticker,
    #hashtag_ticker a,
    #tabs_content_container {
      background: ${specialBack};
      background-color: ${specialBack};
      color: ${specialFront};
    }
    #tabs_content_container {
      position: relative;
    }

    .bio dl dt {
      color: ${specialFront};
    }

    .ui-resizable-handle,
    .ui-resizable-e {
      margin: 0;
      padding: 0 1px;
      width: 2px;
    }

    .chat-box {
      padding: 5px 0 32px 0;
      position: relative;
    }

    .chat-list {
      padding: 0 5px 0px 2px;
      margin: -38px 0 0;
    }

    .ui-resizable-e {
      opacity: .5;
    }

    .nooverlay {
      font-size: 9px;
    }

    #player {
      z-index: 0;
    }

    #player:hover {
      z-index: 2;
    }

    .user_information {
      float: left;
    }

    .Xtipalert {
      color:#003;
      font-weight:bold;
      background-color:#ff3;
    }

    .chat-list .text,
    .chat-list .Xtext{
      margin:0 0 3px;
      line-height:122%;
      overflow-y:hidden;
    }

    .chat-list .text p,
    .chat-list .Xtext p {
      margin:0;
    }

    /*
    .chat-list .text p span,
    .chat-list .Xtext p span {
      background-color: ${specialBack};
      color: ${specialFront};
    }
    */

    .chat-list .text p a.thumbnail img,
    .chat-list .text a.thumbnail img,
    .chat-list .Xtext p a.thumbnail img,
    .chat-list .Xtext a.thumbnail img{
      border:2px solid;
    }

    .chat-list span.messagelabel{
      margin:0 3px 0 0;
      float:left;
      text-decoration:none;
      color:#444;
      font-weight:550;
    }

    .chat-list span.hastokensmessagelabel {
      color: #204d5c;
    }

    .chat-list span.tippedalotrecentlymessagelabel {
      color: #70359e;
    }

    .chat-list span.tippedtonsrecentlymessagelabel,
    emoticon_slug {
      color: #4d147b;
    }

    .chat-list span.fanclubmessagelabel{
      color:#060;
    }

    .chat-list span.hostmessagelabel{
      color:#9C3500;
    }

    .chat-list span.moderatormessagelabel{
      color:#9C0000;
    }

    .XXXroommessagelabel {
      display: none;
    }

    .overlay_popup .formborder {
      border: none;
      border-radius: 5px;
      background-color: #000B;
    }

    .overlay_popup .title {
      background-color: #000F;
      color: #DDD;
    }

    .dismissable_notice {
      white-space: nowrap;
    }

    #specialNoticeDiv {
      float: right;
      background: none;
      max-width: 35em;
      overflow: auto;
      font-size: 2em;
      line-height: 1em;
      position: absolute;
      top: 2em;
      right: 0;
      z-index: 100;
      transition: 300ms;
    }

    #specialNoticeDiv:hover {
      background: ${specialBack};
      transition: 700ms;
    }

    #specialNoticeDiv p {
      padding: 0;
      margin: 0;
    }

    .list .title .age {
      color: #DDD;
    }

    #trickle_inputs {
      display: inline-block;
      float: right;
    }

    .trickle_input_container {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
    }
    .trickle_input_container label {
      display: block;
      color: ${specialFront};
      text-align: center;
    }

    #trickle_value,
    #trickle_iterations,
    #trickle_seconds {
      color: #EEE;
      background: #000;
      width: 3em;
      border: none;
      padding-left: 4px;
    }

    #trickle_value[readonly="true"],
    #trickle_iterations[readonly="true"],
    #trickle_seconds[readonly="true"] {
      color: #CCC;
      background: #444;
    }

    #trickle_button_tip,
    #hide_show_button_notice_div {
      /*position: absolute;
      left: 410px;
      top: 60px;*/
      display: inline-block;
      float: right;
      overflow: hidden;
      height: 25px;
      width: auto;
      padding-left: 10px;
      margin-right: 10px;
      font-size: 12px;
      font-family: ubuntumedium,Arial,Helvetica,sans-serif;
      background: url(https://ssl-ccstatic.highwebmedia.com/images/btn-sprites2.gif?ac5eba7d5cf3) no-repeat 0 -84px;
      text-shadow: 1px 1px 0 #588d3d;
      cursor: pointer;
      border: none;
      border-radius: 15px;
      z-index: 1000;
    }

    #trickle_button_cancel {
      /*position: absolute;
      left: 410px;
      top: 60px;*/
      float: right;
      display: inline-block;
      overflow: hidden;
      height: 25px;
      width: auto;
      padding-left: 10px;
      margin-right: 10px;
      font-size: 12px;
      font-family: ubuntumedium,Arial,Helvetica,sans-serif;
      background: red;
      color: white;
      text-shadow: 1px 1px 0 #588d3d;
      cursor: pointer;
      border: none;
      border-radius: 15px;
      z-index: 1000;
    }

    .goal_display {
      background: #888;
    }

    .tip_list_number {
      display: inline-block;
      text-align: right;
      min-width: 2.5em;
    }

    .tip_list_item {
      display: block;
    }

    @keyframes bubble-new {
      from { font-size: 100%; }
      to   { font-size: 120%; }
    }

    .list .thumbnail_label_c_new {
      animation: .4s linear 1s infinite alternate bubble-new;
    }
  `
  document.head.appendChild(newStyle)
}

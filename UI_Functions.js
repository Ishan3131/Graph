//-------------------------------------------Graph log function--------------------------------------------------------//
function graph_log_appear() {
    graph_log = document.querySelector('#graph_log');
    function_log = document.querySelector("#function_log");
    arrow = document.querySelector('#arrow');
    clear_log = document.querySelector("#clear_log");
    if (function_log.style.display == "none") {
      arrow.classList.remove('arrow_down');
      graph_log.classList.remove('function_log_disappear');
      function_log.classList.remove('function_log_disappear');
      clear_log.classList.remove('button_disappear');
      graph_log.style.display = "grid";
      function_log.style.display = "grid";
      clear_log.style.display = "block";
      arrow.classList.add('arrow_up');
      graph_log.classList.add('function_log_appear');
      function_log.classList.add('function_log_appear');
      clear_log.classList.add('button_appear');
    }
    else {
      arrow.classList.remove('arrow_up');
      function_log.classList.remove('function_log_appear');
      graph_log.classList.remove('function_log_appear');
      function_log.classList.add('function_log_disappear');
      graph_log.classList.add('function_log_disappear');
      arrow.classList.add('arrow_down');
      clear_log.classList.remove('button_appear');
      clear_log.classList.add('button_disappear');
      setTimeout(() => {
        clear_log.style.display = "none";
        function_log.style.display = 'none';
        graph_log.style.display = 'none';
      }, 1000)
    }
}
//-------------------------------------Rate descriptive function-------------------------------------------------------------//
function rate_describe() {
  if (document.querySelector("#rate_descriptive_container").style.display == "none") {
    document.querySelector('#rate_descriptive_container').style.display = "block";
  }
  else {
    document.querySelector("#rate_descriptive_container").style.display = "none";
  }
}
//--------------------------------------More features (≡) function------------------------------------------------------------//
function more_option() {
  if (document.querySelector('#more_option_container').style.display == 'none') {
    document.querySelector('#more_option_container').classList.remove('more_option_disappear');
    document.querySelector('#more_option_container').style.display = 'block';
    document.querySelector('#more_option_container').classList.add('more_option_appear');
    document.querySelector('#more_option_symbol').style.color = '#ffffff';
  }
  else {
    document.querySelector('#more_option_container').classList.remove('more_option_appear');
    document.querySelector('#more_option_container').classList.add('more_option_disappear');
    setTimeout(() => {
      document.querySelector('#more_option_container').style.display = 'none';
      document.querySelector('#more_option_symbol').style.color = '#000000';
    }, 200)
  }
}
//----------------------------------------Theme function-------------------------------------------------------------------------//
function theme() {
  if (document.body.style.backgroundColor == 'white') {
    document.body.style.backgroundColor = 'black';
    graphpage('white');
    document.querySelector('#theme').style.backgroundColor = 'black';
    document.querySelector('#theme').style.borderColor = 'white';
  }
  else {
    document.body.style.backgroundColor = 'white';
    graphpage('black');
    document.querySelector('#theme').style.backgroundColor = 'white';
    document.querySelector('#theme').style.borderColor = 'black';
  }
}
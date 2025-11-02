//--------------------------------------------Creating a graph page function---------------------------------------------------
function graphpage(theme) {
    ctxPg.clearRect(0, 0, graphPage.width, graphPage.height);
    graph_detailed = false;
    scale = document.querySelector("#scale").value;
    //--------------------------------------------Creating X-axis and Y-axis----------------------------------------------------//
    ctxPg.fillStyle = theme;
    ctxPg.strokeStyle = theme;
    ctxPg.beginPath();
    ctxPg.moveTo(0, graphPage.height / 2);
    ctxPg.lineTo(graphPage.width, graphPage.height / 2);
    ctxPg.stroke();
    ctxPg.moveTo(graphPage.width / 2, 0);
    ctxPg.lineTo(graphPage.width / 2, graphPage.height);
    ctxPg.stroke();
    //--------------------------------------------Drawing '-' on Y axis to represent 1 unit-------------------------------------//
    let ih = 0;
    while (ih < graphPage.height / 2) {
      ih += 10;
      ctxPg.beginPath();
      ctxPg.moveTo(graphPage.width / 2 - 5, graphPage.height / 2 - ih);
      ctxPg.lineTo(graphPage.width / 2 + 5, graphPage.height / 2 - ih);
      ctxPg.stroke();
      ctxPg.moveTo(graphPage.width / 2 - 5, graphPage.height / 2 + ih);
      ctxPg.lineTo(graphPage.width / 2 + 5, graphPage.height / 2 + ih);
      ctxPg.stroke();
    }
    //---------------------------------------------Drawing '|' on x axis to represent 1 unit--------------------------------------//
    let iw = 0;
    while (iw < graphPage.width / 2) {
      iw += 10;
      ctxPg.beginPath();
      ctxPg.moveTo(graphPage.width / 2 + iw, graphPage.height / 2 - 5);
      ctxPg.lineTo(graphPage.width / 2 + iw, graphPage.height / 2 + 5);
      ctxPg.stroke();
      ctxPg.moveTo(graphPage.width / 2 - iw, graphPage.height / 2 - 5);
      ctxPg.lineTo(graphPage.width / 2 - iw, graphPage.height / 2 + 5);
      ctxPg.stroke();
    }
}
//---------------------------------------------------Function Plot-------------------------------------------//
let currentLocus;
let x;
let val;
let i = 0;
function plot() {
    plot_btn.disabled = true;
    if(i == 0){
    let func = document.querySelector('#function').value;                   // Mathematical function enterd by user [ eg- f(x) = x**2 + 5*x - 6 ]
    document.querySelector('#function_log').value += `f(x) = ${func} :\n`;  // Adding function name in function log.
    let domain = [Number(document.querySelector('#domain_start').value), Number(document.querySelector('#domain_end').value)]  // Range of x
    let rate = Number(document.querySelector('#rate').value);              // Rate of increase in value of x
    let locus_color = document.querySelector('#locus_color').value;        // Color of locus(graph of f(x))

    currentLocus = new Locus(func, domain, rate, scale, locus_color)      // Initiallizing new locus
    func = mathToJs(func);
    function f(x) {
      let exp = func.replaceAll('x', `${x}`);                  // Replacing 'x' in the function with value of x 
      return eval(exp);                                          // Calculating f(x) or value of y
    }
    if(selected){
      selected.unselect();
    }
    x = domain[0];                                           // Initializing x
    //-----------------------------------------Function animation-------------------------//
    function animation() {
      if (x >= Math.min(...domain) && x <= Math.max(...domain)) {
        val = f(x);
        val = isNaN(val)?undefined:val;
        if (val != "Infinity" && val != "-Infinity") {
          currentLocus.draw(currentLocus.canvas.width / 2 + 10 * x / scale, currentLocus.canvas.height / 2 - 10 * val / scale);
          i++;
        }
        currentLocus.log += `<p>f(${x}) = ${val}</p>`;
        currentLocus.writeLog()
        if(i==1){
          graphs[currentLocus.id] = currentLocus;
        }
        x = Number((x + currentLocus.rate).toFixed(5));
        r = requestAnimationFrame(animation);
      }
      else{
        cancelAnimationFrame(r)
        i = 0;
        requestAnimationFrame(()=>{
          requestAnimationFrame(()=>{
            console.log(i);
            currentLocus.logImg();  
            currentLocus.writeLog();
            plot_btn.disabled = false;
          });
        });
      }
    }
    r = requestAnimationFrame(animation)
  }
}
//---------------------------------------------Detailes graph function----------------------------------------------------------------//
function detailed_graph() {
    if (graph_detailed == false) {
      graph_detailed = true;
      let iw = -1 * Math.ceil(graphPage.width / 20) - 1;
      while (iw <= Math.ceil(graphPage.width / 20) - 1) {
        iw += 2 + Math.floor((String(scale).length + 1) / 4);
        ctxPg.fillStyle = document.querySelector('#theme').style.borderColor;
        ctxPg.font = '7px Arial'
        ctxPg.fillText(Number((iw * scale).toFixed(String(scale.length))), graphPage.width / 2 + iw * 10, graphPage.height / 2 + 10);
      }
      let ih = -1 * Math.ceil(graphPage.height / 20) - 1;
      while (ih <= Math.ceil(graphPage.height / 20) - 1) {
        ih += 2;
        ctxPg.fillStyle = document.querySelector('#theme').style.borderColor;
        ctxPg.font = '7px Arial'
        ctxPg.fillText(Number((ih * scale).toFixed(String(scale.length))), graphPage.width / 2 + 10, graphPage.height / 2 - ih * 10);
      }
    }
    else {
      graph_detailed = false;
      graphpage(document.querySelector('#theme').style.borderColor);
    }
  }
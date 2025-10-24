let graphPage = document.querySelector('#graph_bg');
let ctxPg = graphPage.getContext('2d');
graphPage.width = window.innerWidth * 3 / 4;
graphPage.height = window.innerHeight - 4.5;
let graph_detailed = false;
functionLog = document.querySelector('#function_log');
graphLog = document.querySelector('#graph_log');
laser_line = document.querySelector('.laser-line');
let plot_btn = document.querySelector('#plot');
//--------------------------------------------Graph scale : (value of 1 unit)-------------------------------------------//
let scale;
let ids;
graphpage('white');
let graphs = {}
let selected = null;
let state = true;
//------------------------------------------------LOCUS CLASS---------------------------------------------------------------------------//
class Locus {
  constructor(func, domain, rate, scale, color) {
    this.func = func;
    this.domain = domain;
    this.rate = rate;
    this.scale = scale;
    this.color = color;
    this.hidden = false;
    this.clone = {
    container : document.createElement('div'),
    combinedC : document.createElement('canvas'),
    Cctx : null,
    shrunkC : document.createElement('canvas'),
    Sctx : null,
    button : document.createElement('button'),
    hide_unhide_btn : document.createElement('button')
    }
    ids = Object.keys(graphs)
    this.id = ids.length?Math.max(...ids)+1:1;
    this.log = `<h2><u>f(x) = ${this.func} :</u></h2>`;
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = graphPage.width;
    this.canvas.height = graphPage.height;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.zIndex = this.id;
    document.querySelector('#graph_container').appendChild(this.canvas)
    this.clone.button.innerHTML = 'X';
    this.clone.button.classList.add('img_button');
    this.clone.button.style.display = 'none';
    this.clone.button.addEventListener('click', () => {
      laser_line.classList.remove('laser-line-hd');
      laser_line.style.display = 'block';
      this.removee()
      setTimeout(() => {
        laser_line.classList.add('laser-line-hd')
        setTimeout(() => {
          laser_line.style.display = 'none'
        }, 300);
      }, 2000);
      });
      this.clone.hide_unhide_btn.innerHTML = '&#128065;'
      this.clone.hide_unhide_btn.classList.add('img_hide_unhide_btn');
      this.clone.hide_unhide_btn.style.display = 'none';
      this.clone.hide_unhide_btn.addEventListener('click', () => {
        if(!this.hidden){
          this.canvas.style.opacity = '0%';
          this.clone.hide_unhide_btn.innerHTML = '&#x0336;';
          this.clone.container.style.backgroundColor = '#6680c2';
          this.hidden = true;
        }
        else{
          this.canvas.style.opacity = '100%';
          this.clone.hide_unhide_btn.innerHTML = '&#128065;';
          this.hidden = false;
          this.select();
        }
      })
    this.clone.shrunkC.style.cursor = 'pointer';
    this.clone.shrunkC.style.margin = '16px 0';
    this.clone.shrunkC.addEventListener('click', () =>  this.writeLog() );
    this.clone.container.addEventListener('mouseover', () => { 
      if(selected != this){
      this.select()
      }
     });
    this.clone.container.addEventListener('mouseleave', () => {
      if(selected != this) {
        this.unselect()
      }
    });
  }
  draw(x,y) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(x, y, 1, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();
  }
  logImg() {
    this.clone.container.classList.add('img_container');
    this.clone.combinedC.width = this.canvas.width;
    this.clone.combinedC.height = this.canvas.height;
    this.clone.Cctx = this.clone.combinedC.getContext('2d');
    this.clone.Cctx.fillStyle = document.body.style.backgroundColor;
    this.clone.Cctx.fillRect(0, 0, this.clone.combinedC.width, this.clone.combinedC.height);
    this.clone.Cctx.drawImage(graphPage, 0, 0, this.clone.combinedC.width, this.clone.combinedC.height);
    this.clone.Cctx.drawImage(this.canvas, 0, 0, this.clone.combinedC.width, this.clone.combinedC.height);

    this.clone.shrunkC.width = this.clone.combinedC.width * .15;
    this.clone.shrunkC.height = this.clone.combinedC.height * .15;
    this.clone.Sctx = this.clone.shrunkC.getContext('2d');
    this.clone.Sctx.imageSmoothingEnabled = true;
    this.clone.Sctx.imageSmoothingQuality = 'high';
    this.clone.Sctx.drawImage(this.clone.combinedC, 0, 0, this.clone.combinedC.width, this.clone.combinedC.height, 0, 0, this.clone.shrunkC.width, this.clone.shrunkC.height);
    this.clone.shrunkC.style.borderRadius = '20px';
    this.clone.container.appendChild(this.clone.shrunkC);
    this.clone.container.appendChild(this.clone.button);
    this.clone.container.appendChild(this.clone.hide_unhide_btn)
    graphLog.appendChild(this.clone.container);
  }
  writeLog() {
    functionLog.innerHTML = this.log;
    if(state){
     if(selected != this){
      if(selected){
        selected.unselect();
      }
      this.select();
      selected = this;
     }
    }
  }
  removee() {
   if(state){
    laser_line.style.display = 'block';
    this.canvas.classList.add('canvas_remove');
    this.clone.shrunkC.remove();
    this.clone.container.remove();
    delete graphs[this.id]
    if(selected == this){
      if(Object.keys(graphs).length){
        graphs[Object.keys(graphs)[0]].writeLog();
      }
      else{
        function_log.innerHTML = '';
        selected = null;
      }
    }
    setTimeout(() => {
      laser_line.style.display = 'none';
      this.canvas.remove();
    }, 2000)
  }
 }
 select() {
  if(!this.hidden) {
  this.clone.container.style.backgroundColor = '#ffffff3d';
  }
  this.clone.button.style.display = 'block';
  this.clone.hide_unhide_btn.style.display = 'block';
 }
 unselect() {
  if(this.hidden){
    this.clone.container.style.backgroundColor = '#6680c2';
  }
  else{
  this.clone.container.style.backgroundColor = 'transparent';
  }
  this.clone.button.style.display = 'none';
  this.clone.hide_unhide_btn.style.display = 'none';
 }
}

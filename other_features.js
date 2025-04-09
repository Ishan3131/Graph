//---------------------------------------------Cursor co-ordinates------------------------------------------------------------//
let X, Y;
document.addEventListener('mousemove', (e) => {
  if (e.clientX < graphPage.width) {
    X = (e.clientX - graphPage.width / 2) / 10;
    Y = (graphPage.height / 2 - e.clientY) / 10;
    document.querySelector('#cursor_x_cordinate').value = X;
    document.querySelector('#cursor_y_cordinate').value = Y;
  }
})
//-------------------------------------defaut input function---------------------------------------------------------------//
function default_input() {
    document.querySelector('#domain_start').value = -1 * Math.ceil(scale * graphPage.width / 20);
    document.querySelector('#domain_end').value = Math.ceil(scale * graphPage.width / 20);
    document.querySelector('#rate').value = scale / 10;
}
//----------------------------------------Clear log function-------------------------------------------------------------------------//
function clearLog() {
  keyss = Object.keys(graphs);
  keyss.forEach((key) => {
      graphs[key].removee()
  })
}
this.draw_fav=function(config, draw_fav_fn, replaceEl, extend_fav) {
  var e2,
  d = document.createElement('div'),
  e = d.appendChild(document.createElement('label'));
  (e2 = e.appendChild(document.createElement('input'))).type = "checkbox";
  e2.checked = config[1];
  v = e.appendChild(document.createElement('font'));
  v.color='red';
  v.appendChild(document.createTextNode(
  //heart
  "\u2764"
  ));
  e = d.appendChild(document.createElement('label'));
  (e2 = e.appendChild(document.createElement('input'))).type = "checkbox";
  //secret save RT flag, thru 1st flag history clear sequence by user
  e2.checked = config[1] && config[2];
  //hourglass
  e.appendChild(document.createTextNode("\u231B "));
  if (!config[1])
    e = "History off";
  else if (config.length == 3) {
    e = "No history yet";
  } else
    e = 0;
  if (e) {
    d.appendChild(document.createTextNode(e));
  } else {
    for (i = 3; i < 9 && (e = config[i]); i++) {
      (e2 = d.appendChild(document.createElement('a'))).href = (e[1].charAt() == 'r' ? "/rstop.htm#" : "/stop.htm#") + e[1].slice(1);
      e2.appendChild(document.createTextNode(e[0]));
      d.appendChild(document.createTextNode(" "));
    }
  }
  //todo copy checkbox FNs if possible
  //DO NOT USE this., this obj is sometimes a div b/c callers did divEl.draw_fav()
  window.favDiv = d;
  d.draw_fav = draw_fav_fn;
  if (replaceEl) {
    replaceEl.parentNode.replaceChild(d, replaceEl);
    extend_fav(d);
  } else {
    document.body.appendChild(d);
  }
}


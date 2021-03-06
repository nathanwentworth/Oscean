Ø("invoke").seal("about",(q) => 
{
  var projects = []
  for(id in q.tables.lexicon){
    var term = q.tables.lexicon[id]
    if(term.logs.length < 5){ continue; }
    var horaire = new Horaire(term.logs)
    projects.push([term.name,horaire.sum,horaire.span,horaire.attention])
  }

  var tasks = {}
  for(id in q.tables.horaire){
    var log = q.tables.horaire[id]
    tasks[log.task] = tasks[log.task] ? tasks[log.task]+log.value : log.value
  }
  var tasks_sortable = []
  for(id in tasks){
    tasks_sortable.push([id,tasks[id]])
  }

  var creation = q.tables.horaire[q.tables.horaire.length-1];
  var last = q.tables.horaire.find((log)=>{ if(log.time.offset() <= 0){ return log; } })

  var html = ""
  html += `<p>Created ${(creation.time.offset()/-365).toFixed(0)} years ago, or ${creation.time.offset_format(new Date().desamber(),true)}, XXIIVV is currently hosting {*${Object.keys(q.tables.lexicon).length} entries*}, {*${projects.length} projects*}, {*${q.tables.horaire.length} logs*}, recorded over {*${(new Horaire(q.tables.horaire).sum/1000).toFixed(3).replace(".","'")} hours*} — The {{last update|Journal}} was made {*${last.time.offset_format()}*}.</p>`.to_markup() 

  html += `
  <p>The {{Riven Engine|Riven}} is designed to run without a serving platform, using only {{front-end files|http://github.com/XXIIVV/Oscean}} written in an {{unobfuscated format|Oscean}} — With the hope that little or {{no migration|https://www.gwern.net/About#long-site}} will ever be required.</p>
  <p>So far, roughly {*${parseInt(new Horaire(q.tables.lexicon.OSCEAN.logs).sum)} hours*}(over ${q.tables.lexicon.OSCEAN.logs.length} days) were invested in the construction of {{Oscean}}, which is a considerable investment of time, enough that one might wonder if it is actually worth it. There is no singular project that had more {{impact|Aesthetics}} on my work than the usage and creation of this {{application|Nataniev}}.</p>
  <p>{{Desamber}} is the {{Time Format|Time}} used on this wiki, the current time is <b>{{$desamber}} {{$clock}}</b> , visit the {{Clock}} for more details. The reason for using an {{unconventional|https://en.wikipedia.org/wiki/Decimal_time#See_also}} time is the perdictable {{2-weeks long length|Desamber}} of each month, ideal for the {{sprint periods|https://en.wikipedia.org/wiki/Agile_software_development}}.</p>`.to_markup()

  for(id in q.result.children){
    var child = q.result.children[id];
    html += `
    ${child.featured_log ? `<a onclick='Ø("query").bang("${child.name}")'><img src="media/diary/${child.featured_log.photo}.jpg"/></a><hs>— ${child.bref().to_markup()}</hs>` : `<h2>${child.name.capitalize()}</h2><hs>${child.bref()}</hs>`.to_markup()}
    ${child.long(q.tables)}
    <quote>${!stop ? this.make_index(child,true) : ''}</quote>`
  }

  return html
});

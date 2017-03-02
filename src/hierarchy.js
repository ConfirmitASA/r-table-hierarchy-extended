let hierarchyCSS = require('./hierarchy.css');

class HierarchyExtended {
  constructor(options) {
    let {table, hier} = options;
    if (!table || !hier) {
      return;
    }
    this.table = table;
    table.parentNode.classList.add('reportal-table');
    const rows = table.getElementsByTagName('tr');
    let maxCellWidth = 0;

    for (let i = 0; i < hier.length; i++) {
      const div = document.createElement('div');
      div.classList.add('hier-button');
      hier[i].hasChildren ? div.classList.add('collapse-button') : div.classList.add('collapse-button-single');

      const tds = rows[i].getElementsByTagName('td');
      const td = tds[0];
      td.style.paddingLeft = 20 * hier[i].level + 'px';
      td.insertBefore(div, td.firstChild);

      const computedWidth = parseInt(window.getComputedStyle(td,null).getPropertyValue("width"));
      maxCellWidth = computedWidth  > maxCellWidth ? computedWidth : maxCellWidth;

      rows[i].className += ' id_' + hier[i].id + ' pid_' + hier[i].parent;
      if (hier[i].level) {
        rows[i].className += ' collapsed-row';
      }

    }
    table.addEventListener("click", (e) => this.clickRows(e));

    const cellWidth = (maxCellWidth + 20) + 'px';

    [].forEach.call(rows, row => row.getElementsByTagName('td')[0].style.width = cellWidth);

    [].forEach.call(table.parentNode.tHead.getElementsByTagName('tr'), row =>
      row.getElementsByTagName('td')[0].style.width = cellWidth
    );

    table.parentNode.classList.add('table-full-size');
  }

  clickRows(e) {
    if (e.target.classList.contains('collapse-button')) {
      e.target.classList.toggle('collapse-button-open');
      const expand = e.target.classList.contains('collapse-button-open');
      const row = e.target.parentElement.parentElement;
      this.collapse(row, expand);
    }
  }

  collapse(row, expand) {
    const rows = this.table.querySelectorAll('tr.p' + row.className.match(/id_\S*(?= pid_)/));
    for (let i = 0; i < rows.length; i++) {
      expand ? rows[i].classList.remove('collapsed-row') : rows[i].classList.add('collapsed-row');
      if (!expand && rows[i].firstElementChild.firstElementChild.classList.contains('collapse-button')) {
        rows[i].firstElementChild.firstElementChild.classList.remove('collapse-button-open');
        this.collapse(rows[i], expand);
      }
    }
  }
}


export default HierarchyExtended;

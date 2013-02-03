Flame.TableAutoWidthSupport = {
    tableData: [],
    headerData: [],

    getColumnContents: function(columnHeader) {
      return this.get("tableData").map(function(e) { return e[columnHeader.leafIndex].formattedValue(); }).concat(
           this._getHeaderLabelForPath(this.getPath("headerData.columnHeaders"), columnHeader.path)
      );
    },

    columnHeaderDoubleClicked: function(columnHeader, targetElement) {
        var columnDataAsString = this.getColumnContents(columnHeader).map(function(e) { return e }).join("<br/>");
        var columnDimensions = Flame.measureString(columnDataAsString, 'ember-view flame-table', 'label');
        this.set('resizedColumn', { index: columnHeader.leafIndex, width: columnDimensions.width + 25 });
    },

    _getHeaderLabelForPath: function(headers, path) {
        var label = "";
        while(path.length > 0) {
            var index = path[0];
            var header = headers[index];
            path = path.slice(1);
            label = header.get("headerLabel");
            headers = header.get("children");
        }
        return label;
    }
};


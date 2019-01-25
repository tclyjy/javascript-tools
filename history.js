class HistoryUtil {
  replace (path) {
    this.getReactRouterHistory().replace(path);
  }

  push (path) {
    this.getReactRouterHistory().push(path);
  }

  goBack (num) {
    if (num) {
      this.getReactRouterHistory().go(num);
    } else {
      this.getReactRouterHistory().go(-1);
    }
  }

  getReactRouterHistory () {
    return this.his;
  }
  setReactRouterHistory (his) {
    this.his = his;
  }
}

module.exports = new HistoryUtil();
/*判断一个元素是否在数组中*/
function contains (arr, val) {
  return arr.indexOf(val) != -1 ? true : false;
}

/**
* @param  {arr} 数组
* @param  {fn} 回调函数
* @return {undefined}
*/
function each (arr, fn) {
  fn = fn || Function;
  var a = [];
  var args = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < arr.length; i++) {
    var res = fn.apply(arr, [arr[i], i].concat(args));
    if (res != null) a.push(res);
  }
}

/**
* @param  {arr} 数组
* @param  {fn} 回调函数
* @param  {thisObj} this指向
* @return {Array} 
*/
function map (arr, fn, thisObj) {
  var scope = thisObj || window;
  var a = [];
  for (var i = 0, j = arr.length; i < j; ++i) {
    var res = fn.call(scope, arr[i], i, this);
    if (res != null) a.push(res);
  }
  return a;
}

/**
* @param  {arr} 数组
* @param  {type} 1：从小到大   2：从大到小   3：随机
* @return {Array}
*/
function sort (arr, type = 1) {
  return arr.sort((a, b) => {
    switch (type) {
      case 1:
        return a - b;
      case 2:
        return b - a;
      case 3:
        return Math.random() - 0.5;
      default:
        return arr;
    }
  })
}

/*删除其中一个元素*/
function remove (arr, ele) {
  var index = arr.indexOf(ele);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

/*将类数组转换为数组的方法*/
function formArray (ary) {
  var arr = [];
  if (Array.isArray(ary)) {
    arr = ary;
  } else {
    arr = Array.prototype.slice.call(ary);
  };
  return arr;
}

/*最大值*/
function max (arr) {
  return Math.max.apply(null, arr);
}

/*最小值*/
function min (arr) {
  return Math.min.apply(null, arr);
}

/*求和*/
function sum (arr) {
  return arr.reduce((pre, cur) => {
    return pre + cur
  })
}

/*平均值*/
function average (arr) {
  return sum(arr) / arr.length
}
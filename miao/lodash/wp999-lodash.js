var wp999 = new (function () {
  //根据num参数将数组分割成子数组
  this.chunk = (arr, num) => {
    if (arr.length <= num) return [arr.slice()]
    let count = Math.ceil(arr.length / num)
    let index = 0
    let returnVal = []
    while (count--) {
      returnVal.push(arr.slice(index, (index += num)))
    }
    return returnVal
  }
  //去除数组中无效值,包括: undefind ,null ,'',false ,empty
  this.compact = (arr) => {
    return arr.reduce((result, e) => (e ? result.concat(e) : result), [])
  }
  //给定两个数组,将第二个数组依次拼接到第一个数组中
  this.concat = (arr, ...arrays) => {
    return arr.concat(...arrays)
  }
  //返回第一个数组与第二个多参数数组的差集,数组内容必须是基本类型
  this.difference = (arr1, ...arr2) => {
    let set = new Set(this.concat([], ...arr2))
    return arr1.filter((e) => !set.has(e))
  }
  //指定深度展开多维数组
  this.flattenDeepth = (arr, i) => {
    if (i === 0) return arr
    return arr.reduce((pre, e) => {
      return pre.concat(Array.isArray(e) ? this.flattenDeepth(e, i - 1) : e)
    }, [])
  }
  //展开一次多维数组
  this.flatten = (arr) => this.flattenDeepth(arr, 1)
  //全部展开多维数组
  this.flattenDeep = (arr) => this.flattenDeepth(arr, Infinity)
  //根据函数调用结果对arr进行分组,如果arr是对象数组,还可以指定属性名进行分组
  this.groupBy = (arr, iteratee) => {
    return arr.reduce((res, e) => {
      let k = this.iter(iteratee)(e)
      if (!(k in res)) res[k] = []
      res[k].push(e)
      return res
    }, {})
  }
  //一个简单的迭代器
  this.iter = (e) => {
    if (typeof e === 'string') {
      return (a) => a[e]
    }
    if (typeof e === 'function') {
      return e
    }
  }
  //从数组左边删除指定数量的元素
  this.drop = function (arr, num = 1) {
    return arr.slice(num)
  }
  //从数组右边删除指定数量的元素
  this.dropRight = (arr, num = 1) => {
    if (arr.length <= num) return []
    return arr.slice(0, arr.length - num)
  }
})()

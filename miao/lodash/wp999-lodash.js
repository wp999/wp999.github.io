var wp999 = new (function () {
  this.chunk = function (arr, num) {
    let len = arr.length
    if (arr.length <= num) return arr.slice()
    let returnVal = Array(Math.ceil(len / num))
    returnVal[0] = Array(num)
    for (let i = 0, j = 0, k = 0; i < len; i++) {
      if (j === num) {
        j = 0
        let size = len - i - 1
        returnVal[++k] = Array(size >= num ? num : size)
      }
      returnVal[k][j] = arr[i]
      ++j
    }
    return returnVal
  }
  this.compact = function (arr) {
    return arr.reduce((result, e) => (e ? result.concat(e) : result), [])
  }
  this.concat = function (arr) {
    return arr.reduce(
      (res, e) => res.concat(Array.isArray(e) ? this.concat(e) : e),
      []
    )
  }
  this.difference = function (arr1, ...arr2) {
    let set = new Set(this.concat(arr2))
    return arr1.filter((e) => !set.has(e))
  }
  this.flattenDeepth = (arr, i) => {
    if (i === 0) return arr
    return arr.reduce((pre, e) => {
      return pre.concat(Array.isArray(e) ? this.flattenDeepth(e, i - 1) : e)
    }, [])
  }
  this.flatten = (arr) => this.flattenDeepth(arr, 1)
  this.flattenDeep = (arr) => this.flattenDeepth(arr, Infinity)
})()

console.log(wp999.flattenDeepth([[1, 2, 3, [[[[[4]]]]],[[3]], [[[5]]], 6, 7, 8], [1, 3], [4, 8], [6]]))

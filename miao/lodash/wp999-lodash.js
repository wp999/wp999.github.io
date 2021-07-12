var wp999 = function () {
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
  this.difference = function (arr1, arr2) {
    let set = new Set(arr2)
    return arr1.filter((e) => !set.has(e))
  }
  this.differenceBy = function (arr1, arr2, condition) {
    let flag = typeof condition === 'function'
    let tmp = new Set(arr2.map((e) => (flag ? condition(e) : e[condition])))
    return arr1.filter((e) => !tmp.has(flag ? condition(e) : e[condition]))
  }
  this.differenceWith = function (arr1, arr2, comparator) {
    return arr1.filter((e) => arr2.forEach((e2) => comparator(e, e2)))
  }
  this.drop = function (arr, num = 1) {
    return arr.slice(num)
  }
  this.dropRight = (arr, num = arr.length - 1) => arr.slice(0, arr.length - num)
  // this.dropRightWhile = function (arr, predicate) {
  //   let index = arr.length - 1
  //   let type = Array.isArray(arr) ? 'array' : typeof predicate
  //   for (let i = index; i >= 0; i--) {
  //     if (
  //       (type === 'array' && arr[i][predicate[0]] === predicate[1]) ||
  //       (type === 'string' && predicate in arr[i]) ||
  //       (type === 'function' && predicate(arr[i]))
  //     ) {
  //       index = i
  //       break
  //     }
  //   }
  //   return this.dropRight(arr, index)
  // }
  // this.iteratee = function (arr,){
  //
  // }
  return this
}

// console.log(new wp999().dropRight([1, 2, 3, 4], 3))

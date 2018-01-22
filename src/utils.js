/**
 * merge an array of objects to one
 * @param  {Object[]} arr An array of objects you want merged
 * @return {Object}     [description]
 */
export const merge = (arr) => Object.assign({}, ...arr)
merge.down = (a, b) => ({...a, ...b}) // for use in Array.reduce(merge.down, {})
/**
 * Pretty much the exact implementation of Python2/3's xrange/range
 * @param  {Number}    min The start of the range
 * @param  {Number}    max The number before which the range should end
 * @return {Generator} a generator that yields all #s from min up to max
 */
export function* range (min, max) {
  while (min < max) {
    yield min++
  }
}

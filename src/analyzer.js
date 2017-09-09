// @flow

/**
 * Represents on bin in a histogram
 */
export type DataPoint = {
  bin: number,
  count: number,
  label: string
}

/**
 * Split a string into an array of sentences
 * @param {string} text 
 */
export function splitSentences(text: string): Array<string> {
  return text.split('.').filter(sentence => sentence !== '')
}

/**
 * Count the letters in a string
 * @param {string} text 
 */
export function countLetters(text: string): number {
  return text
    .replace(/\W/g, '') // Remove all non alphanumeric characters
    .replace(/\n/g, '').length // Remove all line breaks
}

/**
 * Split a string into an array of words
 * @param {string} text 
 */
export function extractWords(text: string): Array<string> {
  return text
    .replace(/\n/g, ' ') // Swap out line breaks for spaces
    .split(' ')
    .filter(word => word !== '')
}

/**
 * Tabulate the length of the sentences in a block of text and
 * return an array of `DataPoint`s to be used in a histogram
 * @param {string} text 
 */
export function createSentenceLengthHistogram(text: string): Array<DataPoint> {
  const sentences = splitSentences(text)
  const wordCounts = sentences.map(sentence => extractWords(sentence).length)
  return makeHistogram(wordCounts)
}

/**
 * Tabulate the length of words in a block of text and return
 * an array of `DataPoint`s to be used in a histogram
 * @param {string} text 
 */
export function createWordLengthHistogram(text: string): Array<DataPoint> {
  const words = extractWords(text)
  const letterCounts = words.map(word => countLetters(word))
  return makeHistogram(letterCounts)
}

/**
 * Tabulate a set of `DataPoint`s to be used in a histogram
 * @param {number []} counts 
 */
function makeHistogram(counts: Array<number>): Array<DataPoint> {
  const min = Math.min.apply(null, counts)
  const max = Math.max.apply(null, counts)

  const datapoints: Array<DataPoint> = []
  for (let k = min; k <= max; k++) {
    datapoints.push({
      bin: k,
      count: 0,
      label: '0'
    })
  }

  for (let count of counts) {
    const datapoint = datapoints.find(point => point.bin === count)
    if (datapoint) {
      datapoint.count++
    } else {
      console.warn('no bin was found for data point', datapoint, datapoints)
    }
  }

  for (let point of datapoints) {
    point.label = `${point.count}`
  }
  return datapoints
}

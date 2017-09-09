import * as analyzer from './analyzer'

const text = `Welcome. My name is moppy.
Sometimes I make mistakes, because I'm 
only human. That's why I write unit tests.
To make sure that I don't screw myself up.`

describe('analyzer', () => {
  it('Splits sentences', () => {
    const sentences = analyzer.splitSentences(text)
    expect(sentences.length).toBe(5)
  })

  it('Removes non alphanumeric characters from letter counts', () => {
    const words = "Aww!! He's in trouble now!"
    expect(analyzer.countLetters(words)).toBe(18)
  })

  it('Counts words properly', () => {
    expect(analyzer.extractWords(text).length).toBe(28)
  })

  it('Makes sentence histograms properly', () => {
    const histogram = analyzer.createSentenceLengthHistogram(text)
    expect(histogram).toEqual([
      { bin: 1, count: 1 },
      { bin: 2, count: 0 },
      { bin: 3, count: 0 },
      { bin: 4, count: 1 },
      { bin: 5, count: 0 },
      { bin: 6, count: 1 },
      { bin: 7, count: 0 },
      { bin: 8, count: 1 },
      { bin: 9, count: 1 }
    ])
  })

  it('Makes word histograms properly', () => {
    const histogram = analyzer.createWordLengthHistogram(text)
    expect(histogram).toEqual([
      { bin: 1, count: 3 },
      { bin: 2, count: 5 },
      { bin: 3, count: 1 },
      { bin: 4, count: 8 },
      { bin: 5, count: 6 },
      { bin: 6, count: 1 },
      { bin: 7, count: 2 },
      { bin: 8, count: 1 },
      { bin: 9, count: 1 }
    ])
  })
})

// @flow
import React, { Component } from 'react'
import './App.css'

import { BarChart, TextEntry } from './components'
import {
  createWordLengthHistogram,
  createSentenceLengthHistogram
} from './analyzer'
import type { DataPoint } from './analyzer'

type Props = {
  setState: any => void
}

class App extends Component<Props> {
  constructor() {
    super()
    this.state = {
      histogramData: null,
      histogramType: 'words'
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Composition Distribution</h1>
          <h3>
            Discover the hidden structure and characteristics of your writing
            style!
          </h3>
        </div>
        <div className="container padded">
          {this.state.histogramData ? (
            this.barChart()
          ) : (
            <TextEntry
              onSubmit={text => {
                this.setState({
                  histogramData: this.histogramData(text)
                })
              }}
              onChangeType={newType => {
                this.setState({
                  histogramType: newType
                })
              }}
            />
          )}
        </div>
        <div className="footer"> © 2017, Erik Hornberger</div>
      </div>
    )
  }

  barChart() {
    return (
      <div className="container">
        <button
          onClick={() => {
            this.setState({
              histogramData: null
            })
          }}
        >
          Go again
        </button>
        <BarChart
          data={this.state.histogramData}
          title={
            this.state.histogramType === 'words' ? (
              'Words Length'
            ) : (
              'Sentence Length'
            )
          }
        />
        <div className="plotlabel">
          {this.state.histogramType === 'words' ? (
            'Word Length'
          ) : (
            'Sentence Length'
          )}
        </div>
      </div>
    )
  }

  /**
   * Build histogram data from the text, using either words or
   * sentences based on the user's current selection
   * @param {string} text 
   */
  histogramData(text: string): Array<DataPoint> {
    switch (this.state.histogramType) {
      case 'words':
        return createWordLengthHistogram(text)

      case 'sentences':
        return createSentenceLengthHistogram(text)

      default:
        return []
    }
  }
}

export default App

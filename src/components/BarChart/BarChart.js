// @flow

import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip
} from 'victory'

import type { DataPoint } from '../../analyzer'

type Props = {
  data: Array<DataPoint>
}

const chartWidth = 500

export default class BarChart extends Component<Props> {
  render() {
    return (
      <VictoryChart
        domainPadding={20}
        animate={{ duration: 1000, easing: 'bounce' }}
        width={chartWidth}
      >
        <VictoryAxis />
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          data={this.props.data}
          x="bin"
          y="count"
          style={{
            data: {
              width: chartWidth / (this.props.data.length * 2),
              padding: 0
            }
          }}
        />
      </VictoryChart>
    )
  }

  /**
   * Compute the X axis values
   */
  tickValues(): Array<number> {
    const bins = this.props.data.map(point => point.bin)
    const min = Math.min.apply(null, bins)
    const max = Math.max.apply(null, bins)

    const ticks = []
    for (let k = min; k <= max; k++) {
      ticks.push(k)
    }
    return ticks
  }
}

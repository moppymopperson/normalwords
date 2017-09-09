// @flow
import React, { Component } from 'react'
import { SegmentedControl } from 'segmented-control'
import './styles.css'

type Props = {
  state: {
    userText: string
  },
  onSubmit: string => void,
  onChangeType: string => void,
  setState: any => void
}

export default class TextEntry extends Component<Props> {
  constructor(props: Props) {
    super(props)
    this.state = {
      userText: ''
    }
  }

  render() {
    return (
      <div className="container">
        <textarea
          className="rounded"
          defaultValue="Paste text here..."
          onChange={event => {
            this.setState({
              userText: event.target.value
            })
          }}
        />
        <SegmentedControl
          className="segmented-control"
          name="sorter"
          options={[
            { label: 'Words', value: 'words', default: true },
            { label: 'Setences', value: 'sentences' }
          ]}
          setValue={newValue => this.props.onChangeType(newValue)}
          style={{ width: 200 }}
        />
        <div className="container center">
          <button
            disabled={this.state.userText === ''}
            onClick={() => {
              this.props.onSubmit(this.state.userText)
            }}
          >
            <bf>Computify!</bf>
          </button>
        </div>
      </div>
    )
  }
}

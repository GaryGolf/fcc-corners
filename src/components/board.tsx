import * as React from 'react'
import * as styles from './board.css'

import Square from './square'

interface Props {}
interface State {}

export default class Board extends React.Component <Props, State> {
  private template: Array<JSX.Element>
  private names: Array<string>
  constructor(props:Props){
    super(props)
    this.names = ['A','B','C','D','E','F','G','H']
      .map(letter=>new Array(8).fill(letter).map((_,idx)=>letter+(idx+1)))
      .reduce((acc,item)=>[...acc,...item],[])
    
    this.template = this.names.map((name,idx) => (
      <Square
        key={name}
        id={name}
      />
    ))
  }
  render(){
    return (
      <div className={styles.container}>
        {this.template}
      </div>
    )
  }
}
import React, { Component } from "react";
interface Props {
  coin: string;
}
export default class Coin extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <div>Coin</div>;
  }
}

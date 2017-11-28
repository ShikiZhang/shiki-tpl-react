require('../css/main.scss')
import React from 'react'
import ReactDom from 'react-dom'
import Hello from '../components/hello'

class App extends React.Component {
    static defaultProps = {
        index: 10
    }
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)

        this.state = {
            count: 10
        }
    }
    handleClick(e) {
        e.preventDefault();

        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div>
                <Hello />
                <p>{this.state.count}</p>
                <p>{this.props.index}</p>
                <a href="#" onClick={this.handleClick}>更新</a>
            </div>
        )
    }
}
ReactDom.render(
    <App />,
    document.getElementById('app')
)
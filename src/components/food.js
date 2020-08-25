import React from 'react';

class Food extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const style = { left: `${this.props.pos[0]}%`, top: `${this.props.pos[1]}%`}

        return (
            <div>
                <div className='snake-food' style={style}></div>
            </div>
        );
    }
}

export default Food;
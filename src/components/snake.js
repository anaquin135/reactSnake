import React from 'react';

class Snake extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            direction: 'RIGHT',
            speed: 200,
            pos:[[0,0],[2,0]]
        }

        this.intervalID = setInterval(this.moveSnake, this.state.speed);
    }

    componentDidMount() { 
        this.updateSpeed();
        document.onkeydown = this.onKeyDown; 
    }

    onKeyDown = (e) => {
        e = e || window.event;

        switch (e.keyCode) {
            case 38:
              this.setState({direction: 'UP'});
              break;
            case 40:
              this.setState({direction: 'DOWN'});
              break;
            case 37:
              this.setState({direction: 'LEFT'});
              break;
            case 39:
              this.setState({direction: 'RIGHT'});
              break;
        }
    }

    updateSpeed = () => {
        clearInterval(this.intervalID);
        console.log(this.state.speed);
        this.intervalID = setInterval(this.moveSnake, this.state.speed);
    }

    moveSnake = () => {
        let dots = [...this.state.pos];
        let head = dots[dots.length -1];

        switch (this.state.direction) {
            case 'RIGHT':
              head = [head[0] + 2, head[1]];
              break;
            case 'LEFT':
              head = [head[0] - 2, head[1]];
              break;
            case 'DOWN':
              head = [head[0], head[1] + 2];
              break;
            case 'UP':
              head = [head[0], head[1] - 2];
              break;
        }
        dots.push(head);
        dots.shift();
        this.setState({pos: dots});
        this.checkOOB();
        this.checkIfCollapsed();

        let res = this.props.sendLoc(head);
        if (res == "grow") { this.growSnake(); }
    }

    growSnake = () => {
        let newSpeed = this.state.speed - 30;
        if (newSpeed < 10) { newSpeed = 10; }

        let newDots = [...this.state.pos];
        newDots.unshift([]);

        this.setState({speed: newSpeed, pos:newDots});
        this.updateSpeed();
    }

    checkIfCollapsed () {
        let dots = [...this.state.pos];
        let head = dots[dots.length -1];
        dots.pop();
        dots.forEach(thisDot => {
            if (head[0] == thisDot[0] && head[1] == thisDot[1]) {
                this.gameOver();
            }
        });
    }

    checkOOB () {
        let dots = [...this.state.pos];
        let head = dots[dots.length -1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.gameOver();
        }
    }

    gameOver () {
        this.setState({pos:[[0,0],[2,0]], direction:'RIGHT', speed:200});
        this.updateSpeed();
        this.props.gameOver();
    }

    render() {
        this.checkOOB();
        this.checkIfCollapsed();

        var arrPos = this.state.pos;
        var snakeItem = arrPos.map((val, inx) => {
            const style = {
                left: `${val[0]}%`,
                top: `${val[1]}%`
            }
            return (
                <div 
                    className='snake-dot'
                    style={style}
                ></div>
            )
        });

        return (
            <div>
                {snakeItem}
            </div>
        );
    }
}

export default Snake;
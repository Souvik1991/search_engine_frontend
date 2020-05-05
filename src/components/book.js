import React, {Component} from 'react';

class Book extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render(){
        return (
            <div className="flexbox one-third">
                <div className="book">
                    <div className="title">{this.state.data.title}</div>
                    <div className="author">{this.state.data.author}</div>
                    <div className="hr"></div>
                    <div className="summary">
                        {`${this.state.data.summary.substr(0, 250)}...`}
                    </div>
                </div>
            </div>
        )
    }
}

export default Book;
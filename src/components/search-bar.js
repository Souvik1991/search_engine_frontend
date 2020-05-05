import React, {Component} from 'react';
import {config} from "./constant";

class SearchBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            resCount: 3,
            timeoutID: undefined,
            loop: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            backendCall: false,
            controller: undefined,
            response: [],
            fetched: false,
            selected: undefined
        };
    }

    selectedBook(el){
        this.setState({
            selected: el,
            text: el.title,
            response: [],
            fetched: false
        })
    }

    addToBook(){
        if(this.state.selected && this.props.callback){
            this.props.callback([this.state.selected]);
            this.setState({
                selected: undefined,
                text: ''
            })
        }
    }

    apiCall(){
        if(this.state.text){
            if(this.state.backendCall && this.state.signal) this.state.controller.abort();

            var controller = new AbortController();
            this.setState({
                backendCall: true,
                controller: controller
            }, () => {
                fetch(`${config.API_URL}/search/`, {
                    signal: this.state.controller.signal,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quaries: [this.state.text], K: this.state.resCount})
                })
                .then((response) => {
                    if(response.status >= 200 && response.status < 300) return Promise.resolve(response);
                    else return Promise.reject(new Error(response.statusText));
                })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    this.setState({
                        backendCall: false,
                        fetched: true,
                        response: data.books[0]
                    }, () => {
                        console.log(this.state.response)
                        console.log(this.state.fetched);
                    })
                })
                .catch(error => {
                    alert(error);
                })
            })
        }
    }

    callBackEnd(text){
        if(this.state.timeoutID) window.clearInterval(this.state.timeoutID);
        // Delaying between 2 key stroke before call the backend
        var timeoutID = window.setTimeout(() => {
            this.apiCall();
        }, 500);

        this.setState({
            text: text,
            timeoutID: timeoutID,
            response: [],
            fetched: false,
            selected: undefined
        })
    }

    render(){
        return (
            <div className="flex-container">
                <div className="flexbox relative">
                    <input type="text" className="search-box" value={this.state.text} placeholder="Start typing to search books" onChange={(e) => this.callBackEnd(e.target.value)}/>
                    {this.state.backendCall && <span className="loading">Loading...</span>}
                    {this.state.fetched && 
                        <div className="option-cont">
                            {
                                this.state.response.map((el, index) => (
                                    <div className="options" key={index} onClick={() => this.selectedBook(el)}>{el.title}</div>
                                ))
                            }
                            {
                                this.state.fetched && this.state.response.length === 0 && 
                                <div className="options no-res">No result found, try using some other query</div>
                            }
                        </div>
                    }
                </div>
                <div className="flexbox select-cont">
                    <select className="select" name="result" value={this.state.resCount} onChange={(e) => this.setState({resCount: parseInt(e.target.value)})}>
                        {
                            this.state.loop.map((el, index) => (
                                <option value={el} key={index} default={el === this.state.resCount}>{el}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flexbox button-cont">
                    <button type="button" className="btn text-uppercase" disabled={this.state.selected === undefined} onClick={() => this.addToBook()}>Submit</button>
                </div>
            </div>
        )
    }
}

export default SearchBox;
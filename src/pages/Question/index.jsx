import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { url } from '../../config'
import axios from 'axios'
import './question.scss'

class index extends Component {
    state = {
        questions : [],
        loading: true,
        index: 0,
        selected : '',
        check: false,
        answer: null
    }

    componentDidMount(){
        this.fethQuestions()
    }

    fethQuestions = () => {
        const categoryId = this.props.location.state.categoryId
        axios.get( url + "/api/quiz/category/" + categoryId )
        .then(res=>{
            this.setState({ questions: res.data, loading: false })
        })
        .catch(err=>{
            this.setState({ loading: false })
        })
    }

    chooseAnswer(answer){
        this.setState({ selected:  answer })
    }

    checkAnswer = (answer) => {
        if(this.state.selected){
            if(answer === this.state.selected){
                this.setState({
                    check: true,
                    answer: true
                })
            } else {
                this.setState({
                    check: true,
                    answer: false
                })
            }
        }
    }

    nextQuestion = () => {
        const { questions, index } = this.state

        if(questions.length === index + 1){
            alert("soal habis")
        } else {
            this.setState({
                index: index + 1,
                check: false,
                answer: null,
                selected: ''
            })
        }
    }

    render() {
        const { questions, loading, index, answer, check, selected } = this.state
        return (
            <div className="question">
                <header>
                    <span className="logo">{this.props.match.params.category}</span>
                    <Link style={{textDecoration: 'none'}} to="/"><span className="close">tutup</span></Link>
                </header>
                <div className="wrapper">
                    <div>
                    {
                        loading ? <div>loading</div> :
                        <div>
                        {
                            questions.length === 0 ? '' :
                            <div>
                                <div className="quest">
                                    Pertanyaan : <span>{questions[index].question}</span>
                                </div>

                                <div className="answer">
                                    Jawabanmu : <span>{selected}</span>
                                </div>

                                <div className="selection">
                                    <div onClick={()=>this.chooseAnswer(questions[index].a)}>A. {questions[index].a}</div>
                                    <div onClick={()=>this.chooseAnswer(questions[index].b)}>B. {questions[index].b}</div>
                                    <div onClick={()=>this.chooseAnswer(questions[index].c)}>C. {questions[index].c}</div>
                                    <div onClick={()=>this.chooseAnswer(questions[index].d)}>D. {questions[index].d}</div>
                                </div>

                                <div className="check">
                                {
                                    check ?
                                    <div>
                                    {
                                        answer ?
                                        <div className="true">
                                            <span>Kamu benar</span>
                                            <button onClick={this.nextQuestion}>Lanjut</button>
                                        </div>
                                        :
                                        <div className="false">
                                            <span>Kamu salah</span>
                                            <button onClick={this.nextQuestion}>Lanjut</button>
                                        </div>
                                    }
                                    </div>
                                    :
                                    <div className="next">
                                        <button style={selected ? {backgroundColor: '#3498db'} : {backgroundColor: 'lightgray'}} onClick={()=>this.checkAnswer(questions[index].answer)}>Periksa</button>
                                        <button style={{backgroundColor: '#45CD6F'}} onClick={this.nextQuestion}>Lewati</button>
                                    </div>
                                }
                                </div>
                            </div>
                        }
                        </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
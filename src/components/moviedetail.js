import React, { Component } from 'react';
import { fetchMovie, setReview } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, Form, ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    constructor(props){
        super(props);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this);
        //this.state = {reviewReview: ''};
        //this.state = {reviewRating: '0'};
        this.state = {
            review: {
                username: '',
                review: ' ',
                rating: 0
            }
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null) {
            dispatch(fetchMovie(this.props.movieId));
            //console.log(this.props.movieId);
        }
    }
    handleReviewChange = (event) =>{
        this.setState({review: {...this.state.review, review: event.target.value}});
    }
    handleRatingChange = (event) => {
        this.setState({review:{...this.state.review, rating: event.target.value}});
    }
    handleReviewSubmit = (event) => {
        event.preventDefault();
        const {movieId} = this.props;
        const token = localStorage.getItem('token');
        const{review} = this.state;
        this.props.dispatch(setReview(movieId, review, token));
        /*this.setState({
            review:{
                username: localStorage.getItem("username"),
                review: '',
                rating: 0
            }
        })*/

    }






    render() {
            if (!this.props.selectedMovie) {
                console.log("waiting");
                return <div>Loading....</div>
            }
                return (
                    <Card>
                        <Card.Header>Movie Detail</Card.Header>
                        <Card.Body>
                            <Image className="image" src={this.props.selectedMovie.imageUrl} thumbnail/>
                        </Card.Body>
                        <ListGroup>
                            <ListGroupItem>{this.props.selectedMovie.title}</ListGroupItem>
                            <ListGroupItem>
                                {this.props.selectedMovie.actors && this.props.selectedMovie.actors.map((actor, i) => (
                                    <p key={i}>
                                        <b>{actor.actorName}</b> {actor.characterName}
                                    </p>))}
                            </ListGroupItem>
                            <ListGroupItem><h4><BsStarFill/> {this.props.selectedMovie.avgRating}</h4></ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            {this.props.selectedMovie.movieReviews &&this.props.selectedMovie.movieReviews.map((review, i) => (
                                <p key={i}>
                                    <b>{review.username}</b>&nbsp; {review.review}
                                    &nbsp;  <BsStarFill/> {review.rating}
                                </p>
                            ))}
                        </Card.Body>
                        <Card.Body>
                            <Form onSubmit={this.handleReviewSubmit}>
                            <Form.Group controlId="reviewRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control as ="select" name= "rating" value = {this.state.review.rating} onChange ={this.handleRatingChange}>
                                    <option value ="0">Select Rating </option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Control>
                            </Form.Group>
                                <Form.Group controlId = "review">
                                    <Form.Label>Reviews</Form.Label>
                                    <Form.Control as ="textarea" rows={3} name="review" placeholder="Enter Review"
                                    value={this.state.review.review} onChange = {this.handleReviewChange}/>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit Review
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedMovie: state.movie.selectedMovie,
    };
};

export default connect(mapStateToProps)(MovieDetail);


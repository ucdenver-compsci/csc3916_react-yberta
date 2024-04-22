import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import {connect} from 'react-redux';
import {Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs'
import { Image } from 'react-bootstrap';

class MovieDetail extends Component {

    componentDidMount() {
        const {dispatch, movieId} = this.props;
        //if (this.props.selectedMovie == null) {
        dispatch(fetchMovie(movieId));
        //}
    }

    render() {
        const DetailInfo = () => {
            const{selectedMovie} = this.props;
            if (!selectedMovie) {
                return <div>Loading....</div>
            }

                return (
                    <Card>
                        <Card.Header>Movie Detail</Card.Header>
                        <Card.Body>
                            <Image className="image" src={selectedMovie.imageUrl} thumbnail/>
                        </Card.Body>
                        <ListGroup>
                            <ListGroupItem>{selectedMovie.title}</ListGroupItem>
                            <ListGroupItem>
                                {selectedMovie.actors.map((actor, i) =>
                                    <p key={i}>
                                        <b>{actor.actorName}</b> {actor.characterName}
                                    </p>)}
                            </ListGroupItem>
                            <ListGroupItem><h4><BsStarFill/> {selectedMovie.avgRating}</h4></ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            {selectedMovie.movieReviews.map((review, i) =>
                                <p key={i}>
                                    <b>{review.username}</b>&nbsp; {review.review}
                                    &nbsp;  <BsStarFill/> {review.rating}
                                </p>
                            )}
                        </Card.Body>
                    </Card>
                )

        }
        return (
            <DetailInfo selectedMovie={this.props.movies} />
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedMovie: state.movie.selectedMovie
    }
}

export default connect(mapStateToProps)(MovieDetail);


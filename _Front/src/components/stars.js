import StarRatings from 'react-star-ratings';
import React , {Component} from 'react';

export default class Rate extends Component {
    
    constructor(props)
    {
        super(props);

            this.state = {Average:1}
            this.state = {Rate : 1}

        this.changeRating = this.changeRating.bind(this)
        this.changeNormalRating = this.changeNormalRating.bind(this)
    }

    changeRating( newRating, name ) {
        this.setState({
            Average : newRating
        });

    }

    changeNormalRating( NormalRating, name ) {
        this.setState({
            Average : NormalRating
        });

    }



    render() {
        return (
            <>
            <StarRatings
                rating={this.state.Average}
                starRatedColor="blue"
                changeRating={this.changeRating}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="5px"
                name='Average'
            />
                </>
        );
    }
}


import React, {Component} from 'react'
import '../App.css'

class LeftSideData extends Component{

    render() {
        return(
               <>
                    <div className='col-lg-6'>
                    <div className='col-lg-2'>
                        <div className='popularAuthors'>
                            <div className='Head'>
                                <h4>Popular Author</h4>
                            </div>
                            <div className='Content'>
                                <h3>Those are the most popular authors</h3>
                            </div>
                        </div>
                    </div>
                          <div className='col-lg-2'>
                                <div className='popularCategories move'>
                                    <div className='Head'>
                                        <h4>Categories</h4>
                                    </div>
                                    <div className='Content'>
                                        <h3>Those are the most popular Categories</h3>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className='col-lg-2'>
                        <div className='popularBooks move'>
                            <div className='Head'>
                                <h4>Popular Book</h4>
                            </div>
                            <div className='Content'>
                                <h3>Those are the most popular books</h3>
                            </div>
                        </div>
                    </div>
</>
        );
    }
}

export default LeftSideData;
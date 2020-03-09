import React, { Fragment } from 'react';
import "./Portfolio.scss";
import * as jribbble from 'jribbble';
import dribbble from './dribbble.svg';

class Portfolio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        this.dribbbleShots = React.createRef();
    }
    componentDidMount() {
        this.getDribbbleShots();
    }
    getDribbbleShots = () => {
        var dribbbleShots = this.dribbbleShots.current;
        jribbble.shots({ token: "1d4677141b29098b931d5390f027a4cc8ea1d2679817092400d9a17ce6fa2294" },
            (shots) => {
                dribbbleShots.innerHTML = shots.reduce((html, shot) => {
                    return html + '<div data="' + shot.title + '" onClick="location.href =\'' + shot.html_url + '\'" class="col-md-6 shot" style="background-image : url(' + shot.images.two_x + ')"></div>';
                }, "");
            });
    }
    render() {
        return (
            <Fragment>
                <div className="container" id="dribbble-shots">
                    <h1 className="animated fadeInDown">My last shots on <img src={dribbble} alt="Dribbble" /> </h1>
                    <div ref={this.dribbbleShots} className="row justify-content-between animated bounceInUp fast">
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default Portfolio
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import FaIcon from '../Icon/Icon'
import '../../../utils/fonts/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css';
import './backButton.css'

class BackTo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.back.title,
            to: this.props.back.path
        };

    }
    static contextTypes = {
        router: () => true, // replace with PropTypes.object if you use them
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProp, prevState) {

    }
    render() {

        return (
            !this.props.browserBack ?
                <Link to={{ pathname: this.state.to, state: this.props.backParams }} className="push-left"  >
                    <h6 className={classNames(this.props.add==null ||  this.props.add===undefined?"back-button":"back-button-with-add-button")}>
                        <span className="back-title">
                            {this.state.title}
                            <FaIcon name="fa fa-arrow-left back-title" size={30} />
                        </span>
                    </h6>
                </Link>
                
                :
                <a onClick={this.context.router.history.goBack} className="push-left" >
                    <h6 className={classNames("back-button")}>
                        <span className="back-title">
                            {this.state.title}
                            <FaIcon name="fa fa-arrow-left back-title" size={30} />
                        </span>
                    </h6>
                </a>

        )
    }

};
BackTo.defaultProps = {
    browserBack: false,
    params: {}
}
export default BackTo
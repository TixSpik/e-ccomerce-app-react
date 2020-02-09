import React from 'react'
import './Menu-item.scss'
import { withRouter } from 'react-router-dom';

function MenuItem(props) {
    const { title, imageUrl, size, history, linkUrl, match } = props
    return (
        <div
            className={`${size} menu-item`}
            onClick={() => history.push(`${match.url}${linkUrl}`)}
        >
            <div className='background-image' style={{ backgroundImage: `url('${imageUrl}')` }} />
            <div className='content'>
                <div className='title'>{title.toUpperCase()}</div>
                <span className='subtitle'>SHOP NOW</span>
            </div>
        </div>
    )
}

export default withRouter(MenuItem)
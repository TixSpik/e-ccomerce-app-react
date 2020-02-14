import React from 'react'
import './Directory.scss'
import MenuItem from '../menu-item/Menu-item'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectSections } from '../../redux/directory/directorySelector'

function Directory(props) {
    const { sections } = props
    return (
        <div className='directory-menu'>
            {sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem key={id} {...otherSectionProps} />
            ))}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    sections: selectSections
})
export default connect(mapStateToProps)(Directory)



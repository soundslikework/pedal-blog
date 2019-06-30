import React from 'react'
import PropTypes from 'prop-types'
import { graphql, StaticQuery } from 'gatsby'

class TagCloud extends React.Component {
  render() {
    const { data } = this.props
    const { group } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        { group && group.map(tag => (
            <p>{tag.fieldValue}</p>
        ))}
      </div>
    )
  }
}

TagCloud.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query TagCloudQuery {
        allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___tags) {
              fieldValue
              totalCount
            }
        }
      }
    `}
    render={(data) => <TagCloud data={data} />}
  />
)
import React from 'react'
import { kebabCase } from 'lodash'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class TagCloud extends React.Component {
  render() {
    const { data } = this.props
    const { group } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline tags are-large">
        { group && group.map( (tag, i) => (
            <Link className="tag is-primary is-rounded" key={i} to={`/tags/${kebabCase(tag.fieldValue)}/`} >{tag.fieldValue}</Link>
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
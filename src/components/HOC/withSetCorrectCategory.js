import React from 'react'

import Page404 from '../../pages/404/404';

import setContent from '../../utils/setContent';

import { connect } from 'react-redux';
import { activeCategoryChanged, selectAllCategories } from '../../slices/categoriesSlice';
import { Redirect } from 'react-router-dom';

const withSetCorrectCategory = (Component) => {
    class Wrapper extends React.Component {

        constructor(props) {
            super(props)
            this.state = {
                activeContent: null,
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            const {activeCategory} = this.props;
            const {activeContent} = this.state;

            return (activeCategory !== nextProps.categoryPath ||
                nextState.activeContent?.type !== activeContent?.type);
        }

        componentDidMount() {
            this.setState({
                activeContent: this.setActiveContent(),
            })
        }

        componentDidUpdate(prevProps) {
            if (this.props !== prevProps) {
                this.setState({
                    activeContent: this.setActiveContent(),
                })
            }
        }

        setActiveContent = () => {
            const {
                categories, 
                categoryPath, 
                activeCategoryChanged, 
                categoriesLoadingStatus, 
                activeCategory, 
                ...props
            } = this.props;

            const currentCategoryIndex = categories?.findIndex((category) => {
                return category.name === categoryPath;
            })
            
            if (activeCategory === categoryPath) {
                return <Component {...props}/>
            } else if (!categoryPath) {
                return setContent(
                    [categoriesLoadingStatus], 
                    () => <Redirect push to={`/${categories[0].name}`}/>,
                     null, 
                     null,
                     Page404,
                )
            } else if (currentCategoryIndex === -1) {
                return setContent(
                    [categoriesLoadingStatus], 
                    () => <Page404/>,
                     null, 
                     null,
                     Page404,
                )
            } else if (categories.length && currentCategoryIndex >= 0) {
                activeCategoryChanged(categoryPath);
                
                return <Component {...props}/>
            }
        }

        render() {
            const {activeContent} = this.state;
          return (
            <>
                {activeContent}
            </>
          )
        }
      }

    const mapStateToProps = (state) => ({
        activeCategory: state.categories.activeCategory,
        categories: selectAllCategories(state),
        categoriesLoadingStatus: state.categories.categoriesLoadingStatus,
    })

    return connect(mapStateToProps, {activeCategoryChanged})(Wrapper)
}

export default withSetCorrectCategory;


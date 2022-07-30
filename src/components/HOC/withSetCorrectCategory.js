import React from 'react'

import { Redirect } from 'react-router-dom';

import { string, func } from 'prop-types';
import { categoriesType } from '../../types/categoriesTypes';

import setContent from '../../utils/setContent';

import { connect } from 'react-redux';
import { activeCategoryChanged } from '../../slices/categoriesSlice';

import Page404 from '../../pages/404/404';


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
                return <Component 
                            activeCategory={activeCategory}
                            {...props}
                        />
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
            } else if (currentCategoryIndex >= 0) {
                activeCategoryChanged(categoryPath);
                
                return <Component 
                            activeCategory={categoryPath} 
                            {...props}
                        />
            }
        }

        render() {
            return (
                <>
                    {this.state.activeContent}
                </>
            )
        }
    }

    Wrapper.propTypes = {
        activeCategory: string,
        categories: categoriesType,
        categoryPath: string,
        activeCategoryChanged: func.isRequired,
        categoriesLoadingStatus: string.isRequired,
        
    }

    const mapStateToProps = (state) => ({
        activeCategory: state.categories.activeCategory,
        categories: state.categories.categories,
        categoriesLoadingStatus: state.categories.categoriesLoadingStatus,
    })

    return connect(mapStateToProps, {activeCategoryChanged})(Wrapper)
}

export default withSetCorrectCategory;


import { createSelector } from '@reduxjs/toolkit';



const combineLoadingsSelector = (state, ...loadingSelectors) => {
    return createSelector(
        loadingSelectors,
        (...loadingState) => {
          if (loadingState.includes('idle')) {
            return 'idle'
          } else if (loadingState.includes('loading')) {
            return 'loading'
          }  else if (loadingState.includes('error')) {
            return 'error'
          } else return 'confirmed'
        }
      )(state)
}

export default combineLoadingsSelector;
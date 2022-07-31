import client from '../services/opusClientConfig';


export const fetchMiddleware = () => next => action => {
    if (action?.payload?.type === 'query') {
        next({
            type: `${action.type}/pending`,
            payload: null,
        });

        return (async function fetchData() {
            try {
                const result = await client.post(action.payload);

                if (
                    result?.errors?.length || 
                    Object.values(result).every(elem => elem === null)
                ) {
                    throw new Error(result?.errors)
                }

                return next({
                    type: `${action.type}/fulfilled`, 
                    payload: result,
                });
            } catch(error) {
                console.error(error)

                return next({
                    type: `${action.type}/rejected`,
                    payload: error,
                })
            }
        })()
    }
    return next(action)
}
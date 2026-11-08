import { useEffect, useReducer } from "react";

const initialState={
  loading: true,
  error: null,
  data: null,
};

function fetchReducer(state, action){
  switch (action.type){
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
        data: null,
      };

    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case "FETCH_ERROR":
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
}

function useFetch(fetchFunction, dependencies){
  const [state, dispatch] = useReducer(
    fetchReducer,
    initialState
  );

  useEffect(()=>{
    const controller=new AbortController();

    dispatch({ type: "FETCH_START" });

    async function loadData() {
      try {
        const result = await fetchFunction(controller.signal);

        if (!controller.signal.aborted){
          dispatch({
            type: "FETCH_SUCCESS",
            payload: result,
          });
        }
      } catch (error){
        if (!controller.signal.aborted){
          dispatch({
            type: "FETCH_ERROR",
            payload: error,
          });
        }
      }
    }

    loadData();

    return ()=>{
      controller.abort();
    };
  }, [fetchFunction, dependencies]);

  return state;
}
export default useFetch;
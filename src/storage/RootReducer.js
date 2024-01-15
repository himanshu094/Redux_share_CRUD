const initialState={
  companyStockData:{}
}

export default function RootReducer(state=initialState,action){
  switch(action.type){
    case "ADD_STOCK":
      state.companyStockData[action.payload[0]]=action.payload[1];
      console.log(state.companyStockData);
      return{companyStockData:state.companyStockData}
    break

    case "DEL_STOCK":
      delete state.companyStockData[action.payload[0]];
      console.log(state.companyStockData);
      return{companyStockData:state.companyStockData}
    break

    case "EDIT_STOCK":
      state.companyStockData[action.payload[0]]=action.payload[1];
      console.log(state.companyStockData);
      return{companyStockData:state.companyStockData}
    break
  
    default:
      return{companyStockData:state.companyStockData}  
  }
}
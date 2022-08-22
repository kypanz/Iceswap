import React from 'react'

const CurrencyField = props => {

  const getPrice = (value) => {
    props.getSwapPrice(value)
  }

  return(
    <div style={{marginTop:'35px'}}>
      <span className="tokenName">{props.tokenName}</span>
      <div className="row currencyInput">
        {props.loading ? (
            <div className="spinnerContainer">
              <props.spinner />
            </div>
          ) : (
            <input
              className="currencyInputField"
              placeholder="0.0"
              value={props.value}
              onBlur={e => (props.field === 'input' ? getPrice(e.target.value) : null)}
            />
          )}
      </div>
    </div>
  )
}

export default CurrencyField
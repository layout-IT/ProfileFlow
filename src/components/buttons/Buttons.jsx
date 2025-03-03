import React from 'react'
import Button from './button/Button'

const Buttons = ({ array, isAuth }) => {
  return (
    <>
      {array.map(
        ({ buttonValue, urlValue, isAuthorized }) =>
          isAuthorized === isAuth && (
            <li key={urlValue}>
              <Button name={buttonValue} path={urlValue} />
            </li>
          )
      )}
    </>
  )
}

export default Buttons

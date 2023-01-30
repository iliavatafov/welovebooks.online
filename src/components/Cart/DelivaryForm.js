export const DelivaryForm = ({
  inputValues,
  onChange,
  purchaseDataValidations,
}) => {
  const changeHandler = (e) => {
    onChange({
      ...inputValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form">
      <div className="instructions">
        <h1>Delivery</h1>
        <p>Write your address data here</p>
      </div>
      <div className="input-data">
        <div className="input-container">
          <div className="input-elements">
            <label htmlFor="city">City: </label>
            <input
              onChange={changeHandler}
              value={inputValues.city}
              placeholder="city name"
              type="text"
              name="city"
              id="city"
            />
          </div>
          {purchaseDataValidations.city &&
            !purchaseDataValidations.city.isValid && (
              <span className="invalid-message">
                * {purchaseDataValidations.city.message}
              </span>
            )}
        </div>
        <div className="input-container">
          <div className="input-elements">
            <label htmlFor="postalCode">Postal code: </label>
            <input
              onChange={changeHandler}
              value={inputValues.postalCode}
              placeholder="XXXX"
              type="number"
              name="postalCode"
              id="postalCode"
            />
          </div>
          {purchaseDataValidations.postalCode &&
            !purchaseDataValidations.postalCode?.isValid && (
              <span className="invalid-message">
                * {purchaseDataValidations.postalCode.message}
              </span>
            )}
        </div>
        <div className="input-container">
          <div className="input-elements">
            <label htmlFor="address">Address: </label>
            <input
              onChange={changeHandler}
              value={inputValues.address}
              placeholder="Str., Str. Number, Ent., Fl., Ap. "
              type="text"
              name="address"
              id="address"
            />
          </div>
          {purchaseDataValidations.address &&
            !purchaseDataValidations.address?.isValid && (
              <span className="invalid-message">
                * {purchaseDataValidations.address.message}
              </span>
            )}
        </div>
        <hr />
        <h2>
          Delivery fee: <span>3.00 BGN</span>
        </h2>
      </div>
    </form>
  );
};

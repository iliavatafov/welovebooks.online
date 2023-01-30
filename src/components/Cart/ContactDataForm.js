export const ContactDataForm = ({
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
    <>
      <hr />
      <form className="form">
        <div className="instructions">
          <h1>Contacts</h1>
          <p>Please provide your contact data</p>
        </div>
        <div className="input-data">
          <div className="input-container">
            <div className="input-elements">
              <label htmlFor="email">Email: </label>
              <input
                value={inputValues.email}
                onChange={changeHandler}
                placeholder="xxxx@gmail.com"
                type="email"
                name="email"
                id="email"
              />
            </div>
            {purchaseDataValidations.email &&
              !purchaseDataValidations.email.isValid && (
                <span className="invalid-message">
                  * {purchaseDataValidations.email.message}
                </span>
              )}
          </div>
          <div className="input-container">
            <div className="input-elements">
              <label htmlFor="name">Name: </label>
              <input
                value={inputValues.name}
                onChange={changeHandler}
                placeholder="your name..."
                type="text"
                name="name"
                id="name"
              />
            </div>
            {purchaseDataValidations.name &&
              !purchaseDataValidations.name.isValid && (
                <span className="invalid-message">
                  * {purchaseDataValidations.name?.message}
                </span>
              )}
          </div>
          <div className="input-container">
            <div className="input-elements">
              <label htmlFor="phoneNumber">Phone number: </label>
              <input
                value={inputValues.phoneNumber}
                onChange={changeHandler}
                placeholder="XXX XXX XXX"
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
              />
            </div>
            {purchaseDataValidations.phoneNumber &&
              !purchaseDataValidations.phoneNumber.isValid && (
                <span className="invalid-message">
                  * {purchaseDataValidations.phoneNumber.message}
                </span>
              )}
          </div>
        </div>
      </form>
    </>
  );
};

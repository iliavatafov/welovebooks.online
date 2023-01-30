import { useContext } from "react";
import { useState } from "react";

import { CartContext } from "../../context/CartContext";

import { validatePurchaseData } from "../../utils/validationService";

import { ContactDataForm } from "./ContactDataForm";
import { DelivaryForm } from "./DelivaryForm";
import { Recap } from "./Recap";

import "../Cart/PurchaseDataFrom.css";

export const PurchaseDataForm = () => {
  const [purchaseDataValidations, setPurchaseDataValidations] = useState({});
  const [inputValues, setInputValues] = useState({
    city: "",
    postalCode: "",
    address: "",
    email: "",
    name: "",
    phoneNumber: "",
  });

  const { totalAmount, showRecapLayout, renderRecapLayout } =
    useContext(CartContext);

  const onChange = (data) => {
    setInputValues(data);
  };

  const onSubmit = () => {
    const validatedData = validatePurchaseData(inputValues);
    setPurchaseDataValidations(validatedData);

    const isInvalidData =
      Object.values(validatedData).length > 0
        ? Object.values(validatedData).some((el) => el.isValid === false)
        : true;

    if (!isInvalidData) {
      renderRecapLayout(true);
    }
  };

  const clearInputValues = () => {
    setInputValues({
      city: "",
      postalCode: "",
      address: "",
      email: "",
      name: "",
      phoneNumber: "",
    });
  };

  return showRecapLayout ? (
    <Recap inputValues={inputValues} clearInputValues={clearInputValues} />
  ) : (
    <>
      <div className="purchase-form-container">
        <h2 className="form-title">Complete your order</h2>
        <hr />
        <DelivaryForm
          inputValues={inputValues}
          onChange={onChange}
          purchaseDataValidations={purchaseDataValidations}
        />
        <ContactDataForm
          inputValues={inputValues}
          onChange={onChange}
          purchaseDataValidations={purchaseDataValidations}
        />
        <hr />
      </div>
      <div className="check-container">
        <h2>
          Total amount: <span>{(totalAmount + 3).toFixed(2)} BGN</span>
        </h2>
        <button onClick={onSubmit} className="next-btn">
          Next
        </button>
      </div>
    </>
  );
};

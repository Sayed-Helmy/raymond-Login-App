import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../store/userSlice";
import classes from "./OtpForm.module.scss";
import Button from "./ui/Button";

const OtpForm = () => {
  const dispatch = useDispatch();
  const [arr, setArr] = useState([]);
  const navigator = useNavigate();
  const { user, errors } = useSelector((state) => state.user);
  const changeHandler = (e, i) => {
    setArr((prev) => {
      Boolean(e.target.value) ? (prev[i] = e.target.value) : (prev[i] = "");
      return prev;
    });
    if (!e.target.nextSibling || !e.target.value) return;
    e.target.nextSibling.focus();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const otp = arr.join("");
    if (otp.length !== 6) return;
    dispatch(getUser(otp));
  };
  useEffect(() => {
    if (user && !errors) {
      navigator("/welcome", { replace: true });
    }
  }, [user, errors, navigator]);

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h3>
        Please Enter the One Time Password(OTP) generated by your Microsoft
        Authenticator App.
      </h3>
      <div className={classes.digits}>
        {[1, 2, 3, 4, 5, 6].map((item, i) => (
          <input
            type="text"
            key={item + i + 37}
            maxLength={1}
            onChange={(e) => changeHandler(e, i)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !e.target.value) {
                e.target.previousSibling && e.target.previousSibling.focus();
              }
            }}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      <div>
        <Button text="Verify" />
      </div>
    </form>
  );
};

export default OtpForm;

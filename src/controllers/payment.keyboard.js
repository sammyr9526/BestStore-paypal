import axios from "axios";
import {
  PAYPAL_API_URL,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
  HOST,
} from "../config";

export const createOrder3 = async (req, res) => {
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "400",
          },
          desription: "keybpard for sale",
        },
      ],
      application_context: {
        brand_name: "Best Store",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${HOST}/capture-order`,
        cancel_url: `${HOST}/cancel-order`,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );
    console.log(access_token);

    const response = await axios.post(
      `${PAYPAL_API_URL}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    return res.status(500).send("something went wrong");
  }
};

"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require("stripe")(
  "sk_test_51MAHpEAs3Vosg44UasWxPahAz4L3hFQiahjFZcZNsRjpkXXMYfM76MRVJvTjQgDuD3crmSQYBfvQeQUMC143JL7400yDwB8lmI"
);

module.exports = {
  create: async (ctx) => {
    const { address, amount, dishes, token } = JSON.parse(ctx.request.body);

    // charge on stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: "jpy",
      source: token,
      description: `Order ${new Date()} by ${ctx.state.user._id}`,
    });

    //データベースに注文を登録する
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      charge_id: charge.id,
      amount: stripeAmount,
      address,
      dishes,
    });

    return order;
  },
};

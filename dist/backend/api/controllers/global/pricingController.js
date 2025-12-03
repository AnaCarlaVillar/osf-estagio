// pricingController.ts
const newPath = "pages/shop/pricing/index";
export const page = (req, res) => {
    const token = req.params.token;
    res.render(newPath, { page: "pricing", title: "Pricing", token });
};
//# sourceMappingURL=pricingController.js.map
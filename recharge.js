const AlipaySdk = require('alipay-sdk').default;
const AlipayFormData = require('alipay-sdk/lib/form').default;

const alipaySdk = new AlipaySdk({
    appId: 'your_app_id',
    privateKey: 'your_merchant_private_key',
    alipayPublicKey: 'alipay_public_key',
    gateway: 'https://openapi.alipay.com/gateway.do',
    timeout: 5000,
    camelcase: true
});

module.exports = async (req, res) => {
    const { outTradeNo, totalAmount, subject } = req.body;

    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('notifyUrl', 'https://yourdomain.com/notify');
    formData.addField('bizContent', {
        out_trade_no: outTradeNo,
        product_code: 'QUICK_MSECURITY_PAY',
        total_amount: totalAmount,
        subject: subject,
    });

    try {
        const result = await alipaySdk.exec('alipay.trade.app.pay', {}, { formData: formData });
        res.json({ success: true, url: result });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};
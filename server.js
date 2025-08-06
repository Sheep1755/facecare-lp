// ✅ 環境変数の読み込み
require('dotenv').config(); 

const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const path = require('path');

// ✅ 静的ファイルを配信（__dirname直下のHTML/CSS/JSなど）
app.use(express.static(__dirname));

// ✅ JSONリクエストの解析
app.use(express.json());

// ✅ Stripeの決済セッション作成
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'jpy',
          product_data: {
            name: 'フェイスケアセット',
          },
          unit_amount: 3000, // 単価（3,000円）
        },
        quantity: item.quantity,
      })),
      success_url: `${req.headers.origin}/thankyou.html`,
      cancel_url: `${req.headers.origin}/`,
    });

    // ✅ クライアントにセッションIDを返す
    res.json({ id: session.id });

  } catch (e) {
    console.error('Stripe セッション作成エラー:', e.message);
    res.status(500).json({ error: e.message });
  }
});

// ✅ サーバー起動
app.listen(4242, () => console.log('✅ サーバー起動中: http://localhost:4242'));
